const Yup = require('yup');
const { addMonths, startOfHour, parseISO } = require('date-fns');
const Student = require('../models/Student');
const Plan = require('../models/Plan');
const Enrollment = require('../models/Enrollment');
const AviseEnrollment = require('../jobs/avise_enrollment');
const Queue = require('../../lib/queue');

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { plan_id, start_date, student_id } = req.body;

    const plan = await Plan.findOne({
      where: {
        id: plan_id,
      },
    });

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const planForAnyUserExist = await Enrollment.findOne({
      where: {
        student_id,
      },
    });

    if (planForAnyUserExist) {
      return res.status(401).json({ error: 'User alredy has enrollment' });
    }
    const price = plan.price * plan.duration;

    const dateFormatted = addMonths(
      startOfHour(parseISO(start_date)),
      plan.duration
    );

    const enrollment = await Enrollment.create({
      start_date,
      end_date: dateFormatted,
      price,
      student_id,
      plan_id,
    });

    await Queue.add(AviseEnrollment.key, {
      student,
      plan,
      dateFormatted,
      start_date,
    });

    return res.json(enrollment);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      limit: 10,
      offset: (page - 1) * 10,
      order: ['id'],
    });

    return res.json(enrollments);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { plan_id, start_date } = req.body;
    const { student_id } = req.params;

    const plan = await Plan.findOne({
      where: {
        id: plan_id,
      },
    });

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const planForAnyUserExist = await Enrollment.findOne({
      where: {
        student_id,
      },
    });

    if (plan_id === planForAnyUserExist.plan_id) {
      return res.status(401).json({ error: 'User is already in this plan' });
    }

    const price = plan.price * plan.duration;

    const dateFormatted = addMonths(
      startOfHour(parseISO(start_date)),
      plan.duration
    );

    const enrollment = await Enrollment.update({
      start_date,
      end_date: dateFormatted,
      price,
      student_id,
      plan_id,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const { id } = req.params;

    const enrollmentExist = await Enrollment.findByPk(id);

    if (!enrollmentExist) {
      return res.status(400).json({ error: 'This enrollment does not exist' });
    }

    await Enrollment.destroy({
      where: {
        id,
      },
    });
    return res.json({ ok: true });
  }
}

module.exports = new EnrollmentController();
