// config/connection.js
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.NODE_ENV === 'production') {
  // Production Config
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,  // Disable logging in production
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,  // Allow self-signed certificates
      },
    },
  });
} else {
  // Local Config
  sequelize = new Sequelize(
    process.env.DB_NAME,      // Your new env variable for database name
    process.env.DB_USER,      // Your new env variable for user
    process.env.DB_PASSWORD,  // Your new env variable for password
    {
      host: process.env.DB_HOST || 'localhost', // Default to localhost for development
      dialect: 'postgres',
      port: process.env.DB_PORT || 5432,        // Default port if not specified
      logging: console.log,  // Enable logging for development
    }
  );
}

module.exports = sequelize;
