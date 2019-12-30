const User = require('../models/User');

module.exports = async (req, res, next) => {
  const user = await User.findOne({
    where: {
      id: req.userId,
    },
  });

  if (!user) {
    return res.status(401).json({ error: 'Unauthorized user' });
  }

  return next();
};
