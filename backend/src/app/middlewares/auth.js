const jwt = require('jsonwebtoken');
const util = require('util');

// Token criado feito com base no MD5 do authConfig abaixo
const authConfig = require('../../config/auth');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await util.promisify(jwt.verify)(token, authConfig.secret);

    // criando um item para acessar nas rotas, sendo userId um novo item
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
