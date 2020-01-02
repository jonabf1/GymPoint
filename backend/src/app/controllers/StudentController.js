const Yup = require('yup');
const { Op } = require('sequelize');
const Student = require('../models/Student');
const User = require('../models/User');

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number()
        .positive()
        .integer()
        .required(),
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

    const alredyExist = await Student.findOne({
      where: { email: req.body.email },
    });

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
      age: Yup.number().min(1),
      height: Yup.number(),
      weight: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { email } = req.body;

    const student = await Student.findByPk(id);

    if (email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });
      const userExists = await User.findOne({ where: { email } });

      if (studentExists || userExists) {
        return res.status(400).json({ error: 'Email already used' });
      }
    }

    const {
      name, height, weight, age,
    } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
      age,
      height,
      weight,
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student not found' });
    }

    await student.destroy();

    return res.send();
  }

  async index(req, res) {
    const { name, page = 1 } = req.query;

    let students;

    if (name) {
      students = await Student.findAll({
        order: ['name'],
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        limit: 10,
        offset: (page - 1) * 10,
      });
    } else {
      students = await Student.findAll({
        limit: 10,
        offset: (page - 1) * 10,
        order: ['name'],
      });
    }

    return res.json(students);
  }

  async show(req, res) {
    const { id } = req.params;

    const students = await Student.findByPk(id);

    return res.json(students);
  }
}

module.exports = new StudentController();
