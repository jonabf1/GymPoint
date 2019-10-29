const pt = require('date-fns/locale/pt');
const { format, parseISO } = require('date-fns');

const Mail = require('../../lib/mail');


class AviseEnrollment {
  get key() {
    return 'AviseEnrollment';
  }

  async handle({ data }) {
    const {
      student, plan, dateFormatted, start_date,
    } = data;

    await Mail.sendMail({
      to: `${student.name}<${student.email}>`,
      subject: 'Hora de suar!!',
      template: 'avise_enrollment',
      context: {
        user: student.name,
        price: plan.price,
        plan: plan.title,
        end_date: format(parseISO(dateFormatted),
          "dd'/'MM'/'yyyy",
          {
            locale: pt,
          }),
        start_date: format(parseISO(start_date),
          "dd'/'MM'/'yyyy, 'ás 19:00'",
          {
            locale: pt,
          }),
      },
    });
  }
}

module.exports = new AviseEnrollment();
