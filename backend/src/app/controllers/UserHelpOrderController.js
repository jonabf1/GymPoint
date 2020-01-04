const Yup = require('yup');
const Student = require('../models/Student');
const AviseAnswer = require('../jobs/avise_answer');
const HelpOrder = require('../models/HelpOrder');
const Queue = require('../../lib/queue');

class HelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { answer } = req.body;
    const { id } = req.params;

    const helpOrder = await HelpOrder.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['email', 'name'],
        },
      ],
    });

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help order does not exist' });
    }

    const answering = helpOrder.update({
      answer,
      answer_at: new Date(),
    });

    await Queue.add(AviseAnswer.key, {
      helpOrder,
      answer,
    });

    return res.json(answering);
  }

  async index(req, res) {
    const helpOrders = await HelpOrder.findAll({
      where: {
        answer: null,
      },
    });

    return res.json(helpOrders);
  }

  async show(req, res) {
    const { id } = req.params;

    const helpOrder = await HelpOrder.findByPk(id);

    return res.json(helpOrder);
  }
}

module.exports = new HelpOrderController();
