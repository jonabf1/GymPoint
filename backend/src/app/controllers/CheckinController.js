const { subDays } = require('date-fns');
const { Op } = require('sequelize');
const Student = require('../models/Student');
const Checkin = require('../models/Checkin');

class CheckinController {
  async store(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const limitOfCheckins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [subDays(new Date(), 7), new Date()],
        },
      },
    });

    if (limitOfCheckins >= 5) {
      return res.status(
        (400.0).json({ error: 'You can only do 5 checkins every 7 days' })
      );
    }

    return res.json(limitOfCheckins);
  }

  async index(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
      },
    });

    return res.json(checkins);
  }
}

module.exports = new CheckinController();
