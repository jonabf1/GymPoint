const Yup = require('yup');
const Student = require('../models/Student');
const HelpOrder = require('../models/HelpOrder');

class StudentHelpOrderController {
  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { question } = req.body;
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const helpOrder = await HelpOrder.create({
      question,
      student_id: id,
    });

    return res.json(helpOrder);
  }

  async index(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }
    const helpOrders = await HelpOrder.findAll({
      where: {
        student_id: id,
      },
    });

    return res.json(helpOrders);
  }
}

module.exports = new StudentHelpOrderController();
