const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PersonalDetails = sequelize.define('PersonalDetails', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.ENUM('Mr', 'Mrs', 'Miss'),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    placeOfBirth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    membershipType: {
      type: DataTypes.ENUM('By birth', 'Transfer', 'New Convert'),
      allowNull: false
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gpsAddress: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hometown: {
      type: DataTypes.STRING,
      allowNull: false
    },
    streetName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    apartmentNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    countryOfBirth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    familyMemberName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    relationship: {
      type: DataTypes.ENUM('Father', 'Mother', 'Sibling', 'Relative'),
      allowNull: false
    },
    residentialAddress: {
      type: DataTypes.STRING,
      allowNull: false
    },
    locality: {
      type: DataTypes.STRING,
      allowNull: false
    },
    landmark: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return PersonalDetails;
};