const User = require("./User");
const EscapeRoom = require("./EscapeRoom");
const Booking = require("./Booking");

// Defining the relationships between the User, Booking and EscapeRoom models
User.hasMany(Booking, {
  foreignKey: "user_id",
  onDelete: "CASCADE", // Deleting all bookings when a user is deleted
});

EscapeRoom.hasMany(Booking, {
  foreignKey: "escape_room_id",
  onDelete: "CASCADE", // Deleting all bookings when an escape room is deleted
});

Booking.belongsTo(User, {
  foreignKey: "user_id",
});

Booking.belongsTo(EscapeRoom, {
  foreignKey: "escape_room_id",
});

module.exports = { User, EscapeRoom, Booking };
