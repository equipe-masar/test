# SimpleShop API - Express.js Backend

Backend API built with Express.js and SQL Server (mssql driver).

## Prerequisites

- Node.js 18+ and npm
- SQL Server (local or Docker)

## Configuration

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update `.env` with your database credentials:
   ```env
   DB_SERVER=localhost
   DB_PORT=1433
   DB_NAME=SimpleShopDB
   DB_USER=simpleshop_dev
   DB_PASSWORD=DevPassword123!
   PORT=3000
   ```

## Installation

Install dependencies:
```bash
npm install
```

## Running

Start the application:
```bash
npm start
# or for development
npm run dev
```

The API will be available at `http://localhost:3000`.

## Testing Database Connection

Once the application is running, test the database connection:

```bash
# General health check
curl http://localhost:3000/api/health

# Database connection test
curl http://localhost:3000/api/health/db

# List database tables
curl http://localhost:3000/api/health/tables
```

## API Endpoints

### Health Check
- `GET /` - API information
- `GET /api/health` - Health check
- `GET /api/health/db` - Database connection status
- `GET /api/health/tables` - List all tables in the database

## Project Structure

```
backend-express/
├── src/
│   ├── config/
│   │   └── database.js       # Database configuration and connection
│   ├── controllers/
│   │   └── healthController.js  # Health check endpoints
│   ├── routes/
│   │   └── health.js         # Health routes
│   └── index.js              # Application entry point
├── .env.example              # Example environment variables
├── .gitignore
├── package.json
└── README.md
```

## Troubleshooting

### Connection Issues

If you get connection errors:

1. Make sure SQL Server is running:
   ```bash
   docker ps | grep sqlserver
   ```

2. Test SQL Server connection manually:
   ```bash
   docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "SELECT 1"
   ```

3. Verify database exists:
   ```bash
   docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "SELECT name FROM sys.databases"
   ```

### Port Already in Use

If port 3000 is already in use, change it in `.env`:
```env
PORT=3001
```

## Development

The application automatically tests the database connection on startup. Check the console output for connection status.
