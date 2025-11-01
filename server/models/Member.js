const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Member = sequelize.define('Member', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: DataTypes.STRING,
  firstName: { type: DataTypes.STRING, allowNull: false },
  middleName: DataTypes.STRING,
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  phone: DataTypes.STRING,
  address: DataTypes.STRING,
  dob: DataTypes.DATEONLY,
  age: DataTypes.INTEGER,
  gender: DataTypes.STRING,
  memberGroup: DataTypes.STRING,
  profilePic: DataTypes.STRING,
  ministryId: DataTypes.INTEGER,
  resetToken: DataTypes.STRING,
  resetExpires: DataTypes.DATE
}, { tableName: 'members' });
module.exports = Member;
