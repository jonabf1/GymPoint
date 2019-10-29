const Yup = require('yup');
const User = require('../models/User');

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      name: Yup.string().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const AlredyExists = await User.findOne({ where: { email: req.body.email } });

    if (AlredyExists) {
      return res.status(400).json({ error: 'Email alredy used' });
    }

    const { email, name, password } = req.body;
    const user = await User.create({
      email,
      name,
      password,
      provider: true, // para admins
    });

    return res.json(user);
  }
}

module.exports = new UserController();
