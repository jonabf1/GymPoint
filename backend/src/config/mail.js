require('dotenv/config');

module.exports = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe GymPoint <noreply@gympoint.com',
  },
};


// amazon SES
// mailgun
// sparkpost
// mailtrap (usaremos esse, só funciona sem o deploy)
