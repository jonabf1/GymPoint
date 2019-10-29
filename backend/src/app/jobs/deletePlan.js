const pt = require('date-fns/locale/pt');
const { format } = require('date-fns');

const Mail = require('../../lib/mail');

class DeletePlan {
  get key() {
    return 'DeletePlan';
  }

  // enviar email para todos os usuarios que ainda estão no plano
  async handle({ data }) {
    const { enrollment } = data;

    await Mail.sendMail({
      to: `${enrollment.student.name}<${enrollment.student.email}>`,
      subject: 'Hora de suar!!',
      template: 'deletePlan',
      context: {
        user: enrollment.student.name,
        plan: enrollment.plan.title,
        end_date: format(new Date(),
          "dd'/'MM'/'yyyy",
          {
            locale: pt,
          }),
      },
    });
  }
}

module.exports = new DeletePlan();
