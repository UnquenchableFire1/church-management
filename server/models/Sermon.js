const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
module.exports = sequelize.define('Sermon', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: DataTypes.STRING,
  filename: DataTypes.STRING,
  originalName: DataTypes.STRING,
  mimeType: DataTypes.STRING,
  uploadedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: 'sermons' });
