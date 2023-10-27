// Importing the Sequelize module to create a connection to our MySQL database
const Sequelize = require('sequelize');
// The 'dotenv' module is used to load variables from a .env file into process.env
require('dotenv').config();

// Declare a variable to hold our database connection
let sequelize;

// If the JAWSDB_URL exists on the process.env object, it means the app is being executed on Heroku
// JAWSDB is a MySQL addon for Heroku, and it automatically provides a JAWSDB_URL environment variable
// This variable contains the connection details for the database

// The ternary operator '?' is used to shorten an 'if-else' statement
// If the JAWSDB_URL exists (truthy), the application will be connected to the JAWSDB database
// If the JAWSDB_URL does not exist (falsy), it means that the application is running locally
// The Sequelize instance will be created with local database details
sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );

// Export the connection for other files to use
module.exports = sequelize;
