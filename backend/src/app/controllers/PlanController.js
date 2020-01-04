const Yup = require('yup');
const Student = require('../models/Student');
const Plan = require('../models/Plan');
const Enrollment = require('../models/Enrollment');
const DeletePlan = require('../jobs/deletePlan');
const Queue = require('../../lib/queue');

class PlanControler {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .integer(),
      price: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const plans = await Plan.findAll({
      limit: 10,
      offset: (page - 1) * 10,
      order: ['title'],
    });

    return res.json(plans);
  }

  async show(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    return res.json(plan);
  }

  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    // retornar email para os usuarios informando que a conta
    // vai ser cancelada (caso tenha usuarios cadastrados)
    const enrollmentEmailsUsers = await Enrollment.findAll({
      where: {
        plan_id: id,
      },
      attributes: [],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['email', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
      ],
    });

    // nao ta enviando todos os planos
    // eslint-disable-next-line array-callback-return
    enrollmentEmailsUsers.map((enrollment) => {
      Queue.add(DeletePlan.key, {
        enrollment,
      });
    });

    await Plan.destroy({
      where: {
        id,
      },
    });

    return res.json({ ok: true });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .integer(),
      price: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    const planUpdate = await plan.update(req.body);

    return res.json(planUpdate);
  }
}

module.exports = new PlanControler();
