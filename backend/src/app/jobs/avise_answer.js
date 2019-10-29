const pt = require('date-fns/locale/pt');
const { format, parseISO } = require('date-fns');

const Mail = require('../../lib/mail');


class AviseAnswer {
  get key() {
    return 'AviseAnswer';
  }

  async handle({ data }) {
    const { helpOrder, answer } = data;

    await Mail.sendMail({
      to: `${helpOrder.student.name}<${helpOrder.student.email}>`,
      subject: 'Você foi respondido',
      template: 'avise_answer',
      context: {
        user: helpOrder.student.name,
        question: helpOrder.question,
        answer,
        answer_at: format(new Date(),
          "dd'/'MM'/'yyyy, ''",
          {
            locale: pt,
          }),
      },
    });
  }
}

module.exports = new AviseAnswer();
