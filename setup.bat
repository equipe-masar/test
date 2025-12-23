@echo off
REM SimpleShop Development Environment Setup Script (Windows)
REM This script automates the complete environment setup

echo ==========================================
echo SimpleShop Development Environment Setup
echo ==========================================
echo.

REM Check Docker
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Docker is not installed. Please install Docker Desktop first.
    exit /b 1
)
echo [OK] Docker is installed

REM Check .NET
where dotnet >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] .NET SDK is not installed. Please install .NET 8.0+ SDK.
    exit /b 1
)
echo [OK] .NET SDK is installed

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] Node.js is not installed. Please install Node.js 18+.
    exit /b 1
)
echo [OK] Node.js is installed

REM Check npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [X] npm is not installed. Please install npm.
    exit /b 1
)
echo [OK] npm is installed

echo.

REM Step 1: Start SQL Server
echo Step 1: Starting SQL Server with Docker Compose...
docker-compose up -d
echo [OK] SQL Server container started
echo.

REM Wait for SQL Server
echo Waiting for SQL Server to be ready...
timeout /t 20 /nobreak >nul

REM Step 2: Setup Database
echo Step 2: Setting up database...

docker cp ./database/scripts/01-create-database.sql simpleshop-sqlserver:/tmp/
docker cp ./database/scripts/02-create-user.sql simpleshop-sqlserver:/tmp/
docker cp ./database/scripts/03-create-tables.sql simpleshop-sqlserver:/tmp/
docker cp ./database/scripts/04-seed-data.sql simpleshop-sqlserver:/tmp/

echo Creating database...
docker exec simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/01-create-database.sql

echo Creating user...
docker exec simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/02-create-user.sql

echo Creating tables...
docker exec simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/03-create-tables.sql

echo Seeding data...
docker exec simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/04-seed-data.sql

echo [OK] Database setup complete
echo.

REM Step 3: Setup .NET Backend
echo Step 3: Setting up .NET Backend...
cd backend-dotnet

echo Restoring dependencies...
dotnet restore

echo Building project...
dotnet build

echo [OK] .NET Backend setup complete
cd ..
echo.

REM Step 4: Setup Express.js Backend
echo Step 4: Setting up Express.js Backend...
cd backend-express

if not exist .env (
    echo Creating .env file...
    copy .env.example .env
)

echo Installing dependencies...
call npm install

echo [OK] Express.js Backend setup complete
cd ..
echo.

REM Final message
echo ==========================================
echo Setup Complete!
echo ==========================================
echo.
echo Next steps:
echo.
echo 1. Start the .NET Backend:
echo    cd backend-dotnet ^&^& dotnet run
echo    Then test: curl http://localhost:5000/api/health/db
echo.
echo 2. Start the Express.js Backend (in a new terminal):
echo    cd backend-express ^&^& npm start
echo    Then test: curl http://localhost:3000/api/health/db
echo.
echo 3. Access Swagger UI (when .NET backend is running):
echo    http://localhost:5000/swagger
echo.
echo For more information, see README.md
echo.

pause
