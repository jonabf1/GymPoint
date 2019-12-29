const { Model, Sequelize } = require('sequelize');
const { isBefore, isAfter } = require('date-fns');

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        price: Sequelize.FLOAT,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
            'start_date',
            'end_date',
          ]),
          get() {
            return (
              isBefore(this.get('start_date'), new Date()) &&
              isAfter(this.get('end_date'), new Date())
            );
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

module.exports = Enrollment;
