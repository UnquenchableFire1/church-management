const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
module.exports = sequelize.define('Announcement', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: DataTypes.STRING,
  content: DataTypes.TEXT
}, { tableName: 'announcements' });
