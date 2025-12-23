# Quick Reference Guide

## Common Commands

### Docker / SQL Server

```bash
# Start SQL Server (use 'docker compose' or 'docker-compose')
docker compose up -d

# Stop SQL Server
docker compose down

# View logs
docker compose logs -f sqlserver

# Access SQL shell
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd

# Check container status
docker ps | grep sqlserver

# Restart SQL Server
docker compose restart sqlserver

# Remove all (including data)
docker compose down -v
```

> **Note**: Use `docker-compose` (with hyphen) if you have an older Docker installation.

### .NET Backend

```bash
cd backend-dotnet

# Restore dependencies
dotnet restore

# Build
dotnet build

# Run
dotnet run

# Clean build artifacts
dotnet clean

# Watch mode (auto-restart on changes)
dotnet watch run
```

### Express.js Backend

```bash
cd backend-express

# Install dependencies
npm install

# Run
npm start

# Development mode
npm run dev
```

### Testing

```bash
# Test environment setup
./test-environment.sh

# Test .NET health endpoint
curl http://localhost:5000/api/health

# Test .NET DB connection
curl http://localhost:5000/api/health/db

# Test Express health endpoint
curl http://localhost:3000/api/health

# Test Express DB connection
curl http://localhost:3000/api/health/db
```

## Default Ports

| Service | Port | URL |
|---------|------|-----|
| SQL Server | 1433 | localhost:1433 |
| .NET API | 5000 | http://localhost:5000 |
| .NET Swagger | 5000 | http://localhost:5000/swagger |
| Express API | 3000 | http://localhost:3000 |

## Database Credentials

### Development (SA Account)
- **Server:** localhost,1433
- **User:** sa
- **Password:** YourStrong@Passw0rd
- **Database:** SimpleShopDB

### Development (Limited User)
- **Server:** localhost,1433
- **User:** simpleshop_dev
- **Password:** DevPassword123!
- **Database:** SimpleShopDB

⚠️ **Never use these credentials in production!**

## Connection Strings

### .NET (appsettings.Development.json)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=SimpleShopDB;User Id=simpleshop_dev;Password=DevPassword123!;TrustServerCertificate=True"
  }
}
```

### Express.js (.env)
```env
DB_SERVER=localhost
DB_PORT=1433
DB_NAME=SimpleShopDB
DB_USER=simpleshop_dev
DB_PASSWORD=DevPassword123!
```

## API Endpoints

### .NET Backend (Port 5000)

```bash
# Health check
GET /api/health

# Database connection test
GET /api/health/db

# DbContext connection test
GET /api/health/dbcontext

# API documentation
GET /swagger
```

### Express.js Backend (Port 3000)

```bash
# Root info
GET /

# Health check
GET /api/health

# Database connection test
GET /api/health/db

# List tables
GET /api/health/tables
```

## Database Schema

### Tables

1. **Categories**
   - CategoryId (PK)
   - Name
   - Description
   - CreatedAt, UpdatedAt

2. **Products**
   - ProductId (PK)
   - Name
   - Description
   - Price
   - CategoryId (FK)
   - ImageUrl
   - Stock
   - IsActive
   - CreatedAt, UpdatedAt

3. **Customers**
   - CustomerId (PK)
   - FirstName
   - LastName
   - Email (Unique)
   - Phone
   - CreatedAt, UpdatedAt

4. **Orders**
   - OrderId (PK)
   - CustomerId (FK)
   - OrderDate
   - TotalAmount
   - Status
   - CreatedAt, UpdatedAt

5. **OrderItems**
   - OrderItemId (PK)
   - OrderId (FK)
   - ProductId (FK)
   - Quantity
   - UnitPrice
   - CreatedAt

## Useful SQL Queries

```sql
-- List all tables
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_TYPE = 'BASE TABLE';

-- Count products
SELECT COUNT(*) FROM Products;

-- List categories with product count
SELECT c.Name, COUNT(p.ProductId) as ProductCount
FROM Categories c
LEFT JOIN Products p ON c.CategoryId = p.CategoryId
GROUP BY c.Name;

-- Check database size
EXEC sp_spaceused;
```

## Troubleshooting

### SQL Server not starting

```bash
# Check Docker
docker info

# Check logs
docker compose logs sqlserver

# Restart
docker compose restart sqlserver
```

### Cannot connect to SQL Server

```bash
# Test connection
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "SELECT 1"

# Check if port is exposed
docker port simpleshop-sqlserver
```

### .NET build errors

```bash
cd backend-dotnet
dotnet clean
dotnet restore
dotnet build
```

### Express.js errors

```bash
cd backend-express
rm -rf node_modules
npm cache clean --force
npm install
```

### Port conflicts

Edit the configuration:
- .NET: `backend-dotnet/Properties/launchSettings.json`
- Express: `backend-express/.env` (change PORT)

## File Locations

```
test/
├── database/                  # Database scripts
├── backend-dotnet/            # .NET backend
│   ├── appsettings.Development.json
│   └── README.md
├── backend-express/           # Express backend
│   ├── .env (create from .env.example)
│   └── README.md
├── docker-compose.yml         # SQL Server config
├── setup.sh                   # Linux/Mac setup
├── setup.bat                  # Windows setup
├── test-environment.sh        # Test script
├── INSTALLATION.md            # Installation guide
└── README.md                  # Main documentation
```

## Getting Help

1. Check logs: `docker-compose logs -f`
2. Run tests: `./test-environment.sh`
3. Review documentation in README files
4. Check INSTALLATION.md for detailed steps
