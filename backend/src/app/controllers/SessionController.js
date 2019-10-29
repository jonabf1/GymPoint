const jwt = require('jsonwebtoken');
const Yup = require('yup');
const User = require('../models/User');
const authConfig = require('../../config/auth');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required().min(5),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const user = await User.findOne({ where: { email } });
    const checkingPassword = await user.checkPassword(password);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!checkingPassword) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    return res.json({
      user: {
        id: user.id,
        email,
      },
      token: jwt.sign({
        id: user.id,
      }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
