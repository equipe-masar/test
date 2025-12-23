const { getPool } = require('../config/database');

async function getHealth(req, res) {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'SimpleShop API (Express.js)',
    version: '1.0.0',
  });
}

async function checkDatabase(req, res) {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT 1 as test');

    res.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString(),
      result: result.recordset,
    });
  } catch (error) {
    console.error('Database check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}

async function checkTables(req, res) {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT 
        TABLE_NAME,
        TABLE_TYPE
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
      ORDER BY TABLE_NAME
    `);

    res.json({
      status: 'healthy',
      database: 'connected',
      tables: result.recordset,
      count: result.recordset.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Tables check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
}

module.exports = {
  getHealth,
  checkDatabase,
  checkTables,
};
