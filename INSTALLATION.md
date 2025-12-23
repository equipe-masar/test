# Installation Guide - SimpleShop Development Environment

This guide will help you set up the complete SimpleShop development environment in less than 30 minutes.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation Methods](#installation-methods)
3. [Manual Installation](#manual-installation)
4. [Verification](#verification)
5. [Troubleshooting](#troubleshooting)
6. [Next Steps](#next-steps)

## Prerequisites

Before starting, ensure you have the following installed:

### Required Software

- **Docker Desktop** (for Windows/Mac) or **Docker + Docker Compose** (for Linux)
  - Download: https://www.docker.com/products/docker-desktop
  - Version: 20.10+

- **.NET SDK 8.0 or later**
  - Download: https://dotnet.microsoft.com/download
  - Verify: `dotnet --version`

- **Node.js 18+ and npm**
  - Download: https://nodejs.org/
  - Verify: `node --version` and `npm --version`

- **Git**
  - Download: https://git-scm.com/downloads
  - Verify: `git --version`

### Optional (Recommended)

- **Visual Studio Code** or **Visual Studio 2022**
- **Postman** or **curl** for API testing
- **Azure Data Studio** or **SQL Server Management Studio** for database management

## Installation Methods

Choose one of the following methods:

### Method 1: Automated Setup (Recommended)

#### Linux/macOS

```bash
# Clone the repository
git clone <repository-url>
cd test

# Run the setup script
./setup.sh
```

#### Windows

```powershell
# Clone the repository
git clone <repository-url>
cd test

# Run the setup script
.\setup.bat
```

The script will:
1. Verify all prerequisites
2. Start SQL Server in Docker
3. Create the database and tables
4. Setup both backends
5. Verify the installation

### Method 2: Manual Installation

See [Manual Installation](#manual-installation) section below.

## Manual Installation

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd test
```

### Step 2: Start SQL Server

```bash
# Start SQL Server container
docker-compose up -d

# Wait for SQL Server to be ready (30 seconds)
# Check status
docker-compose logs -f sqlserver
```

Look for the message: "SQL Server is now ready for client connections"

### Step 3: Setup Database

```bash
# Copy SQL scripts to container
docker cp ./database/scripts/01-create-database.sql simpleshop-sqlserver:/tmp/
docker cp ./database/scripts/02-create-user.sql simpleshop-sqlserver:/tmp/
docker cp ./database/scripts/03-create-tables.sql simpleshop-sqlserver:/tmp/
docker cp ./database/scripts/04-seed-data.sql simpleshop-sqlserver:/tmp/

# Execute scripts in order
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/01-create-database.sql
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/02-create-user.sql
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/03-create-tables.sql
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/04-seed-data.sql
```

### Step 4: Setup .NET Backend

```bash
cd backend-dotnet

# Restore dependencies
dotnet restore

# Build the project
dotnet build

# (Optional) Run the application
dotnet run
```

The API will start on `http://localhost:5000`

### Step 5: Setup Express.js Backend

```bash
cd backend-express

# Create environment file
cp .env.example .env

# Install dependencies
npm install

# (Optional) Run the application
npm start
```

The API will start on `http://localhost:3000`

## Verification

After installation, verify that everything works:

### 1. Check SQL Server

```bash
# Check container is running
docker ps | grep sqlserver

# Test SQL connection
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "SELECT name FROM sys.databases WHERE name = 'SimpleShopDB'"
```

Expected output: Should show `SimpleShopDB`

### 2. Check .NET Backend

```bash
# Start if not already running
cd backend-dotnet
dotnet run
```

In another terminal:

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test database connection
curl http://localhost:5000/api/health/db

# Test DbContext
curl http://localhost:5000/api/health/dbcontext
```

Expected: All endpoints should return `status: "healthy"`

### 3. Check Express.js Backend

```bash
# Start if not already running
cd backend-express
npm start
```

In another terminal:

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test database connection
curl http://localhost:3000/api/health/db

# List tables
curl http://localhost:3000/api/health/tables
```

Expected: All endpoints should return `status: "healthy"`

### 4. Check Swagger UI

Open in browser: http://localhost:5000/swagger

You should see the API documentation with all health endpoints listed.

## Troubleshooting

### SQL Server Issues

#### Container won't start

```bash
# Check Docker is running
docker info

# Check logs
docker-compose logs sqlserver

# Remove and recreate
docker-compose down -v
docker-compose up -d
```

#### Connection refused

```bash
# Check if SQL Server is listening
docker exec simpleshop-sqlserver ss -tlnp | grep 1433

# Verify password
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "SELECT @@VERSION"
```

#### Database doesn't exist

```bash
# List all databases
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "SELECT name FROM sys.databases"

# Re-run creation script
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/01-create-database.sql
```

### .NET Backend Issues

#### Build errors

```bash
cd backend-dotnet
dotnet clean
dotnet restore
dotnet build --no-incremental
```

#### Connection string errors

Check `appsettings.Development.json`:
- Server: `localhost,1433`
- Database: `SimpleShopDB`
- User: `simpleshop_dev`
- Password: `DevPassword123!`

#### Port already in use

Edit `backend-dotnet/Properties/launchSettings.json` and change the port.

### Express.js Backend Issues

#### npm install fails

```bash
cd backend-express
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

#### Connection errors

Check `.env` file:
```env
DB_SERVER=localhost
DB_PORT=1433
DB_NAME=SimpleShopDB
DB_USER=simpleshop_dev
DB_PASSWORD=DevPassword123!
```

#### Port 3000 in use

Edit `.env` and change `PORT=3001` or another available port.

### General Issues

#### Firewall blocking connections

Make sure ports 1433, 3000, and 5000 are not blocked by your firewall.

#### Docker volume issues

```bash
# Remove all containers and volumes
docker-compose down -v

# Start fresh
docker-compose up -d
```

## Next Steps

After successful installation:

1. **Explore the APIs**
   - Open http://localhost:5000/swagger
   - Test endpoints with Postman or curl

2. **Connect to the Database**
   - Use Azure Data Studio or SQL Server Management Studio
   - Connection: `localhost,1433`
   - User: `sa` or `simpleshop_dev`

3. **Start Development**
   - Read the architecture documentation
   - Explore the codebase
   - Create your first feature

4. **Learn More**
   - [Database Schema](database/README.md)
   - [.NET Backend Documentation](backend-dotnet/README.md)
   - [Express.js Backend Documentation](backend-express/README.md)

## Support

If you encounter issues not covered in this guide:

1. Check the main [README.md](README.md)
2. Review the troubleshooting section
3. Check Docker and application logs
4. Open an issue on GitHub

## Estimated Time

- Automated setup: **10-15 minutes**
- Manual setup: **20-30 minutes**

This includes:
- Installing prerequisites (if needed)
- Running setup scripts
- Verifying installation
