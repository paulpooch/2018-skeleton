const DataTypes = require('sequelize').DataTypes;
const SCHEMA = require('../models/User').SCHEMA;

module.exports = {
  up: (queryInterface, Sequelize) => {
    console.log('SCHEMA', SCHEMA);
    return queryInterface.createTable('Users', SCHEMA);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  },
};
