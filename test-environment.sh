#!/bin/bash

# Test script to verify all components are working

echo "=========================================="
echo "SimpleShop Environment Test Suite"
echo "=========================================="
echo ""

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

FAILED=0

# Test 1: Docker
echo -e "${BLUE}Test 1: Checking SQL Server container...${NC}"
if docker ps | grep simpleshop-sqlserver > /dev/null; then
    echo -e "${GREEN}✓ SQL Server container is running${NC}"
else
    echo -e "${RED}✗ SQL Server container is not running${NC}"
    FAILED=$((FAILED + 1))
fi
echo ""

# Test 2: SQL Server Connection
echo -e "${BLUE}Test 2: Testing SQL Server connection...${NC}"
if docker exec simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "SELECT 1" &> /dev/null; then
    echo -e "${GREEN}✓ SQL Server connection successful${NC}"
else
    echo -e "${RED}✗ SQL Server connection failed${NC}"
    FAILED=$((FAILED + 1))
fi
echo ""

# Test 3: Database exists
echo -e "${BLUE}Test 3: Checking if SimpleShopDB exists...${NC}"
if docker exec simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "SELECT name FROM sys.databases WHERE name = 'SimpleShopDB'" | grep SimpleShopDB > /dev/null; then
    echo -e "${GREEN}✓ SimpleShopDB exists${NC}"
else
    echo -e "${RED}✗ SimpleShopDB not found${NC}"
    FAILED=$((FAILED + 1))
fi
echo ""

# Test 4: Tables exist
echo -e "${BLUE}Test 4: Checking database tables...${NC}"
TABLES=$(docker exec simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -d SimpleShopDB -Q "SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'" -h -1)
if [ "$TABLES" -ge 5 ]; then
    echo -e "${GREEN}✓ Database tables exist ($TABLES tables found)${NC}"
else
    echo -e "${RED}✗ Expected at least 5 tables, found $TABLES${NC}"
    FAILED=$((FAILED + 1))
fi
echo ""

# Test 5: .NET Backend
echo -e "${BLUE}Test 5: Testing .NET Backend build...${NC}"
cd backend-dotnet
if dotnet build > /dev/null 2>&1; then
    echo -e "${GREEN}✓ .NET Backend builds successfully${NC}"
else
    echo -e "${RED}✗ .NET Backend build failed${NC}"
    FAILED=$((FAILED + 1))
fi
cd ..
echo ""

# Test 6: Express.js dependencies
echo -e "${BLUE}Test 6: Checking Express.js dependencies...${NC}"
if [ -d "backend-express/node_modules" ]; then
    echo -e "${GREEN}✓ Express.js dependencies installed${NC}"
else
    echo -e "${RED}✗ Express.js dependencies not installed${NC}"
    FAILED=$((FAILED + 1))
fi
echo ""

# Test 7: Configuration files
echo -e "${BLUE}Test 7: Checking configuration files...${NC}"
if [ -f "backend-dotnet/appsettings.Development.json" ]; then
    echo -e "${GREEN}✓ .NET configuration exists${NC}"
else
    echo -e "${RED}✗ .NET configuration missing${NC}"
    FAILED=$((FAILED + 1))
fi

if [ -f "backend-express/.env" ]; then
    echo -e "${GREEN}✓ Express.js configuration exists${NC}"
else
    echo -e "${BLUE}⚠ Express.js .env not found (optional, .env.example exists)${NC}"
fi
echo ""

# Summary
echo "=========================================="
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}All tests passed! ✓${NC}"
    echo "=========================================="
    echo ""
    echo "Your environment is ready to use."
    echo ""
    echo "To start the backends:"
    echo "  .NET:       cd backend-dotnet && dotnet run"
    echo "  Express.js: cd backend-express && npm start"
    exit 0
else
    echo -e "${RED}$FAILED test(s) failed ✗${NC}"
    echo "=========================================="
    echo ""
    echo "Please check the errors above and run ./setup.sh again if needed."
    exit 1
fi
