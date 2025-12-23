const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER || 'localhost',
  port: parseInt(process.env.DB_PORT) || 1433,
  database: process.env.DB_NAME || 'SimpleShopDB',
  user: process.env.DB_USER || 'simpleshop_dev',
  password: process.env.DB_PASSWORD || 'DevPassword123!',
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool = null;

async function getPool() {
  if (!pool) {
    pool = await sql.connect(config);
    console.log('✅ Database pool created successfully');
  }
  return pool;
}

async function testConnection() {
  try {
    const poolConnection = await getPool();
    const result = await poolConnection.request().query('SELECT 1 as test');
    console.log('✅ Database connection test successful:', result.recordset);
    return true;
  } catch (error) {
    console.error('❌ Database connection test failed:', error.message);
    return false;
  }
}

async function closePool() {
  if (pool) {
    await pool.close();
    pool = null;
    console.log('Database pool closed');
  }
}

module.exports = {
  sql,
  config,
  getPool,
  testConnection,
  closePool,
};
