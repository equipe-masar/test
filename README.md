# SimpleShop - Full Stack Development Environment

A complete e-commerce application with SQL Server database, .NET Web API backend, and Express.js backend.

## 🏗️ Architecture

```
SimpleShop/
├── database/              # SQL Server scripts
│   ├── scripts/
│   │   ├── 01-create-database.sql
│   │   ├── 02-create-user.sql
│   │   ├── 03-create-tables.sql
│   │   └── 04-seed-data.sql
│   └── README.md
├── backend-dotnet/        # .NET Web API
│   ├── Controllers/
│   ├── Data/
│   ├── Models/
│   └── README.md
├── backend-express/       # Express.js API
│   ├── src/
│   └── README.md
├── docker-compose.yml     # SQL Server container
└── README.md             # This file
```

## 📖 Documentation

- **[Installation Guide](INSTALLATION.md)** - Complete setup instructions (< 30 minutes)
- **[Quick Reference](QUICK_REFERENCE.md)** - Common commands and useful information
- **[Database Documentation](database/README.md)** - Database schema and scripts
- **[.NET Backend](backend-dotnet/README.md)** - .NET Web API documentation
- **[Express.js Backend](backend-express/README.md)** - Express.js API documentation

## 🚀 Quick Start

### Automated Setup (Recommended)

**Linux/macOS:**
```bash
git clone <repository-url>
cd test
./setup.sh
```

**Windows:**
```powershell
git clone <repository-url>
cd test
.\setup.bat
```

The setup script will install and configure everything automatically.

### Manual Setup

See the [Installation Guide](INSTALLATION.md) for detailed manual setup instructions.

### Prerequisites

- Docker & Docker Compose
- .NET 8.0 SDK or later
- Node.js 18+ and npm
- Git

### Verify Installation

```bash
# Test environment setup
./test-environment.sh

# Or manually test each component
curl http://localhost:5000/api/health/db  # .NET Backend
curl http://localhost:3000/api/health/db  # Express.js Backend
```


## ✅ Verification Checklist

After setup, verify everything works:

- [ ] SQL Server is running: `docker ps | grep sqlserver`
- [ ] Database exists: See [database/README.md](database/README.md)
- [ ] .NET API responds: `curl http://localhost:5000/api/health`
- [ ] .NET DB connection: `curl http://localhost:5000/api/health/db`
- [ ] Express API responds: `curl http://localhost:3000/api/health`
- [ ] Express DB connection: `curl http://localhost:3000/api/health/db`

Or simply run: `./test-environment.sh`


## 🔧 Configuration

### Environment Variables

Both backends use environment variables for configuration.

**Backend .NET** (appsettings.Development.json):
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost,1433;Database=SimpleShopDB;User Id=simpleshop_dev;Password=DevPassword123!;TrustServerCertificate=True"
  }
}
```

**Backend Express.js** (.env):
```env
DB_SERVER=localhost
DB_PORT=1433
DB_NAME=SimpleShopDB
DB_USER=simpleshop_dev
DB_PASSWORD=DevPassword123!
PORT=3000
```

### Database Credentials

**Development credentials** (change in production):
- SA Password: `YourStrong@Passw0rd`
- Dev User: `simpleshop_dev`
- Dev Password: `DevPassword123!`

## 🗄️ Database Schema

### Tables

- **Categories** - Product categories
- **Products** - Product catalog with prices and stock
- **Customers** - Customer information
- **Orders** - Order records
- **OrderItems** - Order line items

See [database/README.md](database/README.md) for detailed schema.

## 🧪 API Endpoints

### .NET Backend (Port 5000)

- `GET /api/health` - Health check
- `GET /api/health/db` - Database connection test
- `GET /api/health/dbcontext` - DbContext connection test
- `GET /swagger` - API documentation (Development mode)

### Express.js Backend (Port 3000)

- `GET /` - API information
- `GET /api/health` - Health check
- `GET /api/health/db` - Database connection test
- `GET /api/health/tables` - List all tables

## 🐳 Docker Commands

```bash
# Start SQL Server (use 'docker compose' or 'docker-compose' depending on your version)
docker compose up -d
# or
docker-compose up -d

# Stop SQL Server
docker compose down
# or
docker-compose down

# View logs
docker compose logs -f sqlserver
# or
docker-compose logs -f sqlserver

# Access SQL Server shell
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd

# Remove containers and volumes
docker compose down -v
# or
docker-compose down -v
```

> **Note**: Modern Docker installations use `docker compose` (with space), while older installations use `docker-compose` (with hyphen). Use the command that works with your Docker version.

## 🛠️ Troubleshooting

### SQL Server Connection Issues

1. Check if container is running:
   ```bash
   docker ps | grep sqlserver
   ```

2. Check container health:
   ```bash
   docker inspect simpleshop-sqlserver | grep Health -A 10
   ```

3. Test connection:
   ```bash
   docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "SELECT 1"
   ```

### Backend Issues

**.NET Backend:**
```bash
cd backend-dotnet
dotnet clean
dotnet restore
dotnet build
```

**Express.js Backend:**
```bash
cd backend-express
rm -rf node_modules
npm install
```

## 🏷️ Technologies

- **Database**: SQL Server 2022 (Docker)
- **Backend 1**: ASP.NET Core 8.0 Web API
- **Backend 2**: Express.js (Node.js)
- **ORM**: Entity Framework Core (.NET)
- **SQL Driver**: mssql (Express.js)

## 📝 Development Notes

- Both backends connect to the same SQL Server database
- Use the `simpleshop_dev` user for development (limited permissions)
- Never commit `.env` files or sensitive credentials
- See `.env.example` files for required environment variables

## 🔐 Security Notes

⚠️ **Important**: The credentials in this setup are for **development only**.

For production:
1. Use strong, unique passwords
2. Store credentials in a secure vault (Azure Key Vault, AWS Secrets Manager, etc.)
3. Use managed identities where possible
4. Enable SSL/TLS for all connections
5. Implement proper authentication and authorization

## 📄 License

ISC

## 👥 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
