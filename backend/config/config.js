require('dotenv').config({ path: './app/config/.env' });

const DIALECT = process.env.DB_DIALECT || 'mysql';
const DEFAULT_PORT = DIALECT === 'mssql' ? 1433 : 3306;

const baseConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || DEFAULT_PORT,
  dialect: DIALECT,
  logging: false,
};

if (DIALECT === 'mssql') {
  baseConfig.dialectOptions = {
    options: {
      encrypt: false,
      enableArithAbort: true,
      trustServerCertificate: true,
      instanceName: process.env.DB_INSTANCE_NAME || 'SQLEXPRESS',
    },
  };
}

module.exports = {
  development: {
    ...baseConfig
  },

  test: {
    ...baseConfig
  },

  production: {
    ...baseConfig
  }
};
