// Importing necessary modules
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Defining the Booking model class
class Booking extends Model {}

// Initializing the Booking model with its schema
Booking.init(
  {
    // Defining the fields for the Booking model
    //You can edit these fields to whatever you'd like/need
    //Every model NEEDS an id: field in MySQL/Sequelize
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // The foreign key representing the user who made the booking
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    // The foreign key representing the escape room that is booked
    escape_room_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "escaperooms",
        key: "id",
      },
    },
    // The date of the booking
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    // The time of the booking
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "escaperooms",
        key: "duration",
      },
    },
  },
  {
    sequelize,
    modelName: "booking",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Exporting the Booking model for use in other files
module.exports = Booking;
