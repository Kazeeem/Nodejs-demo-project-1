const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('test_node_db', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;