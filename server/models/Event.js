const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
module.exports = sequelize.define('Event', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  date: DataTypes.DATE,
  location: DataTypes.STRING
}, { tableName: 'events' });
