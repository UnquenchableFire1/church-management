const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
module.exports = sequelize.define('Ministry', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT
}, { tableName: 'ministries' });
