const { Model, Sequelize } = require('sequelize');

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        price: Sequelize.FLOAT,
        duration: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

module.exports = Plan;
