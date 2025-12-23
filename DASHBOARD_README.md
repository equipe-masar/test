# Admin Dashboard - User Management System

> **⚠️ SECURITY NOTICE**: This is a demo implementation with simplified authentication for demonstration purposes. For production use, implement proper JWT-based authentication, secure password hashing, session management, and HTTPS. See "Future Enhancements" section for details.

This is an admin dashboard for supervising users, roles, and system status.

## Features

### Backend (API)
- ✅ Express.js server with RESTful API
- ✅ GET `/api/admin/dashboard` - Main dashboard statistics endpoint
- ✅ GET `/api/admin/users` - Filtered user listing with parametric filters
- ✅ GET `/api/admin/recent-changes` - Recent user modifications
- ✅ Admin-only access control with role verification
- ✅ Request logging for dashboard accesses
- ✅ Sample data initialization

### Dashboard Statistics
- ✅ Total users count
- ✅ Active/Inactive users count
- ✅ Distribution by roles (user brigade, user corps, DAF, operator, admin)
- ✅ Distribution by status (active/inactive)
- ✅ Distribution by corps, ranks, and functions
- ✅ Recent activities (user creation/modification history)
- ✅ Alerts (new users, status changes, inactive users)

### Frontend (Dashboard UI)
- ✅ Modern, responsive admin dashboard interface
- ✅ KPI cards for key metrics (total, active, inactive users)
- ✅ Interactive charts with visual bars
- ✅ Distribution charts for roles, status, corps, and ranks
- ✅ Alerts and notifications section
- ✅ Recent activities timeline
- ✅ Quick access links to user management
- ✅ Auto-refresh every 30 seconds
- ✅ Loading, error, and empty states handling
- ✅ Responsive design (mobile-friendly)
- ✅ Performance indicator (< 3 seconds load time)

### Security & Access Control
- ✅ Admin role verification for all dashboard endpoints
- ✅ Non-admin users are blocked (403 Forbidden)
- ✅ Dashboard access logging with timestamps
- ✅ Unauthorized access returns 401 error

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## Usage

### Accessing the Dashboard

**Web Interface:**
Open your browser and navigate to: `http://localhost:3000/admin/dashboard`

The dashboard will automatically load with admin credentials (for demo purposes).

**API Endpoints:**

To access the API directly, include this header:
- `x-user-id: 1` (Admin user ID - the system validates this user exists and has admin role)

Example using curl:
```bash
curl -H "x-user-id: 1" http://localhost:3000/api/admin/dashboard
```

### API Endpoints

1. **Dashboard Statistics** - `GET /api/admin/dashboard`
   - Returns comprehensive dashboard statistics
   - Requires admin role

2. **Filtered Users** - `GET /api/admin/users?status=active&userType=user_brigade`
   - Returns filtered user list
   - Query parameters: `status`, `userType`, `rank`, `corps`
   - Requires admin role

3. **Recent Changes** - `GET /api/admin/recent-changes?limit=10`
   - Returns recently modified users
   - Query parameter: `limit` (default: 10)
   - Requires admin role

4. **Health Check** - `GET /health`
   - Returns server status
   - No authentication required

## Dashboard Features

### KPI Cards
- **Total Users**: Shows the total number of users in the system
- **Active Users**: Number of users with active status
- **Inactive Users**: Number of users with inactive status

### Distribution Charts
- **By Role**: Shows distribution across user types (brigade, corps, DAF, operator, admin)
- **By Status**: Shows active vs inactive users
- **By Corps**: Shows distribution across military corps
- **By Rank**: Shows distribution across military ranks

### Alerts & Notifications
- Recent user updates (last 24 hours)
- Inactive user alerts
- Status change notifications

### Recent Activities
- Timeline of user creation/modification
- Shows last 10 activities
- Displays timestamp and user details

### Quick Links
- Direct access to user management
- Recent modifications view
- Settings (coming soon)

## Security

### Access Control
- All dashboard endpoints require admin role
- User ID is validated against the UserSystem database
- User role is verified from the database (not from headers)
- Non-admin users receive 403 Forbidden error
- Invalid user IDs receive 401 Unauthorized error
- All access attempts are logged

### Testing Security

**Admin Access (Should succeed):**
```bash
curl -H "x-user-id: 1" http://localhost:3000/api/admin/dashboard
```

**Non-Admin Access (Should fail with 403):**
```bash
curl -H "x-user-id: 2" http://localhost:3000/api/admin/dashboard
# Returns: {"error":"Forbidden - Admin access required"}
```

**Invalid User ID (Should fail with 401):**
```bash
curl -H "x-user-id: 999" http://localhost:3000/api/admin/dashboard
# Returns: {"error":"Unauthorized - Invalid user ID"}
```

**No Authentication (Should fail with 401):**
```bash
curl http://localhost:3000/api/admin/dashboard
# Returns: {"error":"Unauthorized - No user ID provided"}
```

## Performance

- Dashboard loads in < 3 seconds (typically < 1 second)
- Load time is displayed at the bottom of the dashboard
- Auto-refresh every 30 seconds for real-time updates
- Optimized queries and data aggregation

## Sample Data

The system initializes with 6 sample users:
1. **Admin Principal** - General, Commandement, admin (active) - User ID: 1
2. Ahmed Ben Ali - Colonel, Brigade Nord, user_brigade (active)
3. Mohamed Trabelsi - Capitaine, Corps Sud, user_corps (active)
4. Fatima Gharbi - Lieutenant, Brigade Nord, daf_validation (active)
5. Karim Mansour - Sergent, Unité Est, operator (active)
6. Salah Hamdi - Major, Corps Sud, user_brigade (inactive)

## Screenshot

![Admin Dashboard](https://github.com/user-attachments/assets/705ee73e-d63c-4b7b-b152-7823643b667c)

## Technical Stack

- **Backend**: Node.js, Express.js
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Data Storage**: In-memory (UserSystem model)
- **Authentication**: Header-based (simple implementation)

## Future Enhancements

### Security (Production-Ready)
- Replace header-based auth with JWT-based authentication
- Implement proper password hashing (bcrypt/argon2)
- Add session management
- Implement HTTPS/TLS
- Add rate limiting
- Add CSRF protection

### Features
- Database integration (PostgreSQL/MongoDB)
- Real-time updates with WebSockets
- Export reports (PDF/Excel)
- Advanced filtering and search
- User management CRUD operations
- Role-based access control (RBAC) refinement
- Email notifications for alerts

## Contributing

This dashboard fulfills the requirements of User Story 0 (US-0) for the admin dashboard feature.

## License

MIT
