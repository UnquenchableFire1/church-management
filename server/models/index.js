const sequelize = require('../config/db');
const Member = require('./Member');
const Ministry = require('./Ministry');
const Event = require('./Event');
const Announcement = require('./Announcement');
const Sermon = require('./Sermon');
const PersonalDetails = require('./PersonalDetails')(sequelize);
const ChurchDetails = require('./ChurchDetails')(sequelize);

// Define associations
Member.belongsTo(Ministry, { foreignKey: 'ministryId' });
Ministry.hasMany(Member, { foreignKey: 'ministryId' });
PersonalDetails.hasOne(ChurchDetails, {
  foreignKey: 'memberId',
  as: 'churchDetails'
});
ChurchDetails.belongsTo(PersonalDetails, {
  foreignKey: 'memberId',
  as: 'personalDetails'
});

module.exports = {
  sequelize,
  Member,
  Ministry,
  Event,
  Announcement,
  Sermon,
  PersonalDetails,
  ChurchDetails
};
