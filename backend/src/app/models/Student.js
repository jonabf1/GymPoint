const { Model, Sequelize } = require('sequelize');

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
      }, {
        sequelize,
      },
    );

    return this;
  }

  /* checkAdmin(token) {
    return bcrypt.compare(password, this.password_hash);
  } */
}

module.exports = Student;
