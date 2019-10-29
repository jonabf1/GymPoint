const Yup = require('yup');
const Student = require('../models/Student');
const User = require('../models/User');

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      age: Yup.number().positive().integer().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(400).json({ error: 'Unauthorized user' });
    }

    const alredyExist = await Student.findOne({ where: { email: req.body.email } });

    if (alredyExist) {
      return res.status(400).json({ error: 'Student Alredy Exists' });
    }

    const student = await Student.create(req.body);

    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number().positive().integer(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findByPk(req.body.id);

    if (!studentExists) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const emailAlredyExists = await Student.findOne({ where: { email: req.body.email } });

    if (emailAlredyExists) {
      return res.status(400).json({ error: 'Email alredy exists' });
    }

    const student = await studentExists.update(req.body);

    return res.json(student);
  }
}

module.exports = new StudentController();
