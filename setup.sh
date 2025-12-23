#!/bin/bash

# SimpleShop Development Environment Setup Script
# This script automates the complete environment setup

set -e  # Exit on any error

echo "=========================================="
echo "SimpleShop Development Environment Setup"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Docker is installed${NC}"

# Check Docker Compose (both old and new formats)
DOCKER_COMPOSE_CMD=""
if docker compose version &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker compose"
    echo -e "${GREEN}✓ Docker Compose (plugin) is installed${NC}"
elif command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE_CMD="docker-compose"
    echo -e "${GREEN}✓ Docker Compose (standalone) is installed${NC}"
else
    echo -e "${RED}❌ Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Check .NET
if ! command -v dotnet &> /dev/null; then
    echo -e "${RED}❌ .NET SDK is not installed. Please install .NET 8.0+ SDK.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ .NET SDK is installed ($(dotnet --version))${NC}"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js is installed ($(node --version))${NC}"

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm.${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm is installed ($(npm --version))${NC}"

echo ""

# Step 1: Start SQL Server
echo -e "${BLUE}Step 1: Starting SQL Server with Docker Compose...${NC}"
$DOCKER_COMPOSE_CMD up -d
echo -e "${GREEN}✓ SQL Server container started${NC}"
echo ""

# Wait for SQL Server to be ready
echo -e "${BLUE}Waiting for SQL Server to be ready...${NC}"
sleep 15

# Check if SQL Server is responding
MAX_RETRIES=30
RETRY_COUNT=0
while [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    if docker exec simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "SELECT 1" &> /dev/null; then
        echo -e "${GREEN}✓ SQL Server is ready${NC}"
        break
    fi
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo "Waiting for SQL Server... ($RETRY_COUNT/$MAX_RETRIES)"
    sleep 2
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo -e "${RED}❌ SQL Server failed to start. Check logs with: $DOCKER_COMPOSE_CMD logs sqlserver${NC}"
    exit 1
fi
echo ""

# Step 2: Setup Database
echo -e "${BLUE}Step 2: Setting up database...${NC}"

# Copy SQL scripts to container
docker cp ./database/scripts/01-create-database.sql simpleshop-sqlserver:/tmp/
docker cp ./database/scripts/02-create-user.sql simpleshop-sqlserver:/tmp/
docker cp ./database/scripts/03-create-tables.sql simpleshop-sqlserver:/tmp/
docker cp ./database/scripts/04-seed-data.sql simpleshop-sqlserver:/tmp/

# Execute scripts
echo "Creating database..."
docker exec simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/01-create-database.sql

echo "Creating user..."
docker exec simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/02-create-user.sql

echo "Creating tables..."
docker exec simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/03-create-tables.sql

echo "Seeding data..."
docker exec simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/04-seed-data.sql

echo -e "${GREEN}✓ Database setup complete${NC}"
echo ""

# Step 3: Setup .NET Backend
echo -e "${BLUE}Step 3: Setting up .NET Backend...${NC}"
cd backend-dotnet

echo "Restoring dependencies..."
dotnet restore

echo "Building project..."
dotnet build

echo -e "${GREEN}✓ .NET Backend setup complete${NC}"
cd ..
echo ""

# Step 4: Setup Express.js Backend
echo -e "${BLUE}Step 4: Setting up Express.js Backend...${NC}"
cd backend-express

if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

echo "Installing dependencies..."
npm install

echo -e "${GREEN}✓ Express.js Backend setup complete${NC}"
cd ..
echo ""

# Final verification
echo -e "${BLUE}Verifying setup...${NC}"
echo ""
echo "SQL Server Status:"
docker ps | grep simpleshop-sqlserver
echo ""

echo -e "${GREEN}=========================================="
echo "✅ Setup Complete!"
echo "==========================================${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. Start the .NET Backend:"
echo -e "   ${BLUE}cd backend-dotnet && dotnet run${NC}"
echo -e "   Then test: ${BLUE}curl http://localhost:5000/api/health/db${NC}"
echo ""
echo "2. Start the Express.js Backend (in a new terminal):"
echo -e "   ${BLUE}cd backend-express && npm start${NC}"
echo -e "   Then test: ${BLUE}curl http://localhost:3000/api/health/db${NC}"
echo ""
echo "3. Access Swagger UI (when .NET backend is running):"
echo -e "   ${BLUE}http://localhost:5000/swagger${NC}"
echo ""
echo "For more information, see README.md"
echo ""
