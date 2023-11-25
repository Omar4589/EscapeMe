const sequelize = require("../config/connection");
const EscapeRoom = require("../models/EscapeRoom");
// const BusinessHours = require("../models/BusinessHours");

const escapeRoomData = require("./escapeRoomSeedData.json");
// const businessHoursData = require("./businessHoursSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await EscapeRoom.bulkCreate(escapeRoomData, {
    individualHooks: true,
    returning: true,
  });

  // await BusinessHours.bulkCreate(businessHoursData, {
  //   individualHooks: true,
  //   returning: true,
  // });

  process.exit(0);
};

seedDatabase();
