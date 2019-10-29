const { Sequelize } = require('sequelize');
const databaseConfig = require('../config/database');
const User = require('../app/models/User');
const Student = require('../app/models/Student');
const Plan = require('../app/models/Plan');
const Enrollment = require('../app/models/Enrollment');
const Checkin = require('../app/models/Checkin');
const HelpOrder = require('../app/models/HelpOrder');

const models = [User, Student, Plan, Enrollment, Checkin, HelpOrder];

class Database {
  constructor() {
    this.init();
  }

  // Criar uma conexão com o sequelize
  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();
