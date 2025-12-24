require('dotenv').config({ path: './app/config/.env' });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || 'localhost', // must be string
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: false,          // true for production with SSL
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS' // only if you are using a named instance
      }
    },
    logging: false
  },

  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: false,
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS'
      }
    },
    logging: false
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        encrypt: true,           // SSL required in production
        enableArithAbort: true,
        instanceName: 'SQLEXPRESS'
      }
    },
    logging: false
  }
};
