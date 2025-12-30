const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const DIALECT = process.env.DB_DIALECT || 'mysql';
const DEFAULT_PORT = DIALECT === 'mssql' ? 1433 : 3306;

const sequelizeOptions = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || DEFAULT_PORT,
  dialect: DIALECT,
  logging: false,
};

// Add mssql specific options only when using mssql
if (DIALECT === 'mssql') {
  sequelizeOptions.dialectOptions = {
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  };
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  sequelizeOptions
);

module.exports = sequelize;
