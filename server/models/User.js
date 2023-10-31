const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

// Defining the User model class
class User extends Model {
  // Method to compare a given password with the hashed password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }

  // Method to return a safe version of the user object without password field
  toSafeObject() {
    const { id, name, email } = this.dataValues;
    return { id, name, email };
  }
}

// Initializing the User model with its schema
User.init(
  {
    // Defining the fields for the User model
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Checking if the input is a valid email
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Password should be at least 8 characters long
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default value for isAdmin is false
    },
  },
  {
    hooks: {
      //Here we create a 'beforeCreate' hook that takes in user data during signup and hash the password using
      //Bcrypts hash() method that takes in a password and hashing salt rounds as a second parameter
      beforeCreate: async (newUserData) => {
        //Here we return the hashed password, we hash it by 10 salt rounds
        newUserData.password = await bcrypt.hash(newUserData.password, 10); //You can edit the salt rounds to as many as you want, consider speed if you increase the number of salt rounds
        return newUserData;
      },
    },
    sequelize,
    underscored: true,
    modelName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Exporting the User model for use in other files
module.exports = User;
