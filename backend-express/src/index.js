require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { testConnection } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
const healthRoutes = require('./routes/health');
app.use('/api/health', healthRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'SimpleShop API (Express.js)',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      dbCheck: '/api/health/db',
      tables: '/api/health/tables',
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    timestamp: new Date().toISOString(),
  });
});

// Start server
async function startServer() {
  try {
    // Test database connection on startup
    console.log('Testing database connection...');
    await testConnection();

    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
      console.log(`📚 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🗄️  DB check: http://localhost:${PORT}/api/health/db`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  const { closePool } = require('./config/database');
  await closePool();
  process.exit(0);
});

startServer();

module.exports = app;
