const express = require('express');
const cors = require('cors');
const path = require('path');
const UserSystem = require('./models/UserSystem');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize user system
const userSystem = new UserSystem();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Logging middleware for dashboard access
const logDashboardAccess = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Dashboard access attempt by user: ${req.headers['x-user-id'] || 'unknown'}`);
  next();
};

// Simple auth middleware - checks if user is admin
const requireAdmin = (req, res, next) => {
  const userRole = req.headers['x-user-role'];
  const userId = req.headers['x-user-id'];
  
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized - No user ID provided' });
  }
  
  if (userRole !== 'admin') {
    console.log(`[${new Date().toISOString()}] Access denied for non-admin user: ${userId}`);
    return res.status(403).json({ error: 'Forbidden - Admin access required' });
  }
  
  next();
};

// Helper function to calculate statistics
const calculateStatistics = (users) => {
  const stats = {
    totalUsers: users.length,
    activeUsers: 0,
    inactiveUsers: 0,
    roleDistribution: {},
    statusDistribution: {},
    corpsDistribution: {},
    rankDistribution: {},
    userTypeDistribution: {},
    recentActivities: [],
    alerts: []
  };

  users.forEach(user => {
    // Status counts
    if (user.status === 'active') {
      stats.activeUsers++;
    } else {
      stats.inactiveUsers++;
    }

    // Role/UserType distribution
    const userType = user.userType || 'unknown';
    stats.roleDistribution[userType] = (stats.roleDistribution[userType] || 0) + 1;
    stats.userTypeDistribution[userType] = (stats.userTypeDistribution[userType] || 0) + 1;

    // Status distribution
    const status = user.status || 'unknown';
    stats.statusDistribution[status] = (stats.statusDistribution[status] || 0) + 1;

    // Corps distribution
    if (user.unit && user.unit.corps) {
      const corps = user.unit.corps;
      stats.corpsDistribution[corps] = (stats.corpsDistribution[corps] || 0) + 1;
    }

    // Rank distribution
    if (user.rank) {
      stats.rankDistribution[user.rank] = (stats.rankDistribution[user.rank] || 0) + 1;
    }

    // Recent activities (created in last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    if (user.createdAt && new Date(user.createdAt) > sevenDaysAgo) {
      stats.recentActivities.push({
        type: 'user_created',
        userId: user.id,
        userName: user.fullName,
        timestamp: user.createdAt
      });
    }

    // Alerts for recent status changes or new users
    if (user.updatedAt && new Date(user.updatedAt) > sevenDaysAgo) {
      const daysSinceUpdate = Math.floor((Date.now() - new Date(user.updatedAt)) / (1000 * 60 * 60 * 24));
      if (daysSinceUpdate < 1) {
        stats.alerts.push({
          type: 'recent_change',
          message: `User ${user.fullName} (${user.id}) was recently updated`,
          userId: user.id,
          timestamp: user.updatedAt
        });
      }
    }

    // Alert for inactive users
    if (user.status === 'inactive') {
      stats.alerts.push({
        type: 'inactive_user',
        message: `User ${user.fullName} (${user.id}) is inactive`,
        userId: user.id,
        timestamp: user.updatedAt
      });
    }
  });

  // Sort recent activities by timestamp (most recent first)
  stats.recentActivities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  stats.recentActivities = stats.recentActivities.slice(0, 10); // Keep only last 10

  // Limit alerts to most recent 20
  stats.alerts = stats.alerts.slice(0, 20);

  return stats;
};

// API Routes

// Admin Dashboard - Main endpoint
app.get('/api/admin/dashboard', requireAdmin, logDashboardAccess, (req, res) => {
  try {
    const users = userSystem.listUsers();
    const stats = calculateStatistics(users);
    
    res.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch dashboard data',
      message: error.message 
    });
  }
});

// Get users by filter (for parametric filtering)
app.get('/api/admin/users', requireAdmin, (req, res) => {
  try {
    let users = userSystem.listUsers();
    
    // Apply filters
    const { status, userType, rank, corps } = req.query;
    
    if (status) {
      users = users.filter(u => u.status === status);
    }
    if (userType) {
      users = users.filter(u => u.userType === userType);
    }
    if (rank) {
      users = users.filter(u => u.rank === rank);
    }
    if (corps && users.length > 0) {
      users = users.filter(u => u.unit && u.unit.corps === corps);
    }
    
    res.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch users',
      message: error.message 
    });
  }
});

// Quick access - get recent user modifications
app.get('/api/admin/recent-changes', requireAdmin, (req, res) => {
  try {
    const users = userSystem.listUsers();
    const limit = parseInt(req.query.limit) || 10;
    
    // Sort by updatedAt
    const recentUsers = users
      .filter(u => u.updatedAt)
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, limit);
    
    res.json({
      success: true,
      data: recentUsers
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch recent changes'
    });
  }
});

// Serve the admin dashboard page
app.get('/admin/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-dashboard.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create some sample data for demonstration
const initializeSampleData = () => {
  // Sample users with different roles and statuses
  userSystem.createUser({
    militaryId: 'MIL001',
    nationalId: 'NAT001',
    fullName: 'Ahmed Ben Ali',
    rank: 'Colonel',
    unitId: 'U001',
    unit: { id: 'U001', name: 'Brigade Nord', corps: 'Infanterie' },
    userType: 'user_brigade',
    status: 'active',
    username: 'ahmed.benali',
    passwordHash: 'hash1'
  });

  userSystem.createUser({
    militaryId: 'MIL002',
    nationalId: 'NAT002',
    fullName: 'Mohamed Trabelsi',
    rank: 'Capitaine',
    unitId: 'U002',
    unit: { id: 'U002', name: 'Corps Sud', corps: 'Cavalerie' },
    userType: 'user_corps',
    status: 'active',
    username: 'mohamed.trabelsi',
    passwordHash: 'hash2'
  });

  userSystem.createUser({
    militaryId: 'MIL003',
    nationalId: 'NAT003',
    fullName: 'Fatima Gharbi',
    rank: 'Lieutenant',
    unitId: 'U001',
    unit: { id: 'U001', name: 'Brigade Nord', corps: 'Infanterie' },
    userType: 'daf_validation',
    status: 'active',
    username: 'fatima.gharbi',
    passwordHash: 'hash3'
  });

  userSystem.createUser({
    militaryId: 'MIL004',
    nationalId: 'NAT004',
    fullName: 'Karim Mansour',
    rank: 'Sergent',
    unitId: 'U003',
    unit: { id: 'U003', name: 'Unité Est', corps: 'Artillerie' },
    userType: 'operator',
    status: 'active',
    username: 'karim.mansour',
    passwordHash: 'hash4'
  });

  userSystem.createUser({
    militaryId: 'MIL005',
    nationalId: 'NAT005',
    fullName: 'Salah Hamdi',
    rank: 'Major',
    unitId: 'U002',
    unit: { id: 'U002', name: 'Corps Sud', corps: 'Cavalerie' },
    userType: 'user_brigade',
    status: 'inactive',
    username: 'salah.hamdi',
    passwordHash: 'hash5'
  });

  userSystem.createUser({
    militaryId: 'ADM001',
    nationalId: 'NATADM001',
    fullName: 'Admin Principal',
    rank: 'General',
    unitId: 'U000',
    unit: { id: 'U000', name: 'Commandement', corps: 'Administration' },
    userType: 'admin',
    status: 'active',
    username: 'admin',
    passwordHash: 'admin_hash'
  });

  console.log('Sample data initialized with', userSystem.listUsers().length, 'users');
};

// Initialize sample data on startup
initializeSampleData();

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Admin Dashboard available at http://localhost:${PORT}/admin/dashboard`);
  console.log(`API endpoint: http://localhost:${PORT}/api/admin/dashboard`);
  console.log('\nTo access the dashboard, include these headers:');
  console.log('  x-user-id: ADM001');
  console.log('  x-user-role: admin');
});

module.exports = app;
