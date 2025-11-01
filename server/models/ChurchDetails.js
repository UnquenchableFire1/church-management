const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ChurchDetails = sequelize.define('ChurchDetails', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PersonalDetails',
        key: 'id'
      }
    },
    holyGhostBaptism: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dateOfHolySpiritBaptism: {
      type: DataTypes.DATE,
      allowNull: true
    },
    waterBaptism: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dateOfBaptism: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dateOfConversion: {
      type: DataTypes.DATE,
      allowNull: true
    },
    formerChurch: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateOfJoining: {
      type: DataTypes.DATE,
      allowNull: true
    },
    placeOfBaptism: {
      type: DataTypes.STRING,
      allowNull: true
    },
    officiatingMinister: {
      type: DataTypes.STRING,
      allowNull: true
    },
    officiatingMinisterDistrict: {
      type: DataTypes.STRING,
      allowNull: true
    },
    communicant: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    positionInChurch: {
      type: DataTypes.STRING,
      allowNull: true
    },
    rolesPlayedInChurch: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    otherAppointments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ministry: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    humStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    levelOfEducation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    schoolOrganisation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    locationOfWork: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isEntrepreneur: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    isRetired: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dateOfRetirement: {
      type: DataTypes.DATE,
      allowNull: true
    },
    hasDisability: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    disabilityNature: {
      type: DataTypes.STRING,
      allowNull: true
    },
    assistiveDevice: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isRoyal: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    royalStatus: {
      type: DataTypes.STRING,
      allowNull: true
    },
    traditionalArea: {
      type: DataTypes.STRING,
      allowNull: true
    },
    yearAppointed: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    parentGuardianName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    parentGuardianContact: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isDedicated: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dedicationDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    dedicationMinister: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dedicationChurch: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  return ChurchDetails;
};