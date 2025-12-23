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

## 🚀 Quick Start (< 30 minutes)

### Prerequisites

- Docker & Docker Compose
- .NET 8.0 SDK or later
- Node.js 18+ and npm
- Git

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd test
```

### Step 2: Start SQL Server

```bash
docker-compose up -d
```

Wait for SQL Server to be ready (check with `docker-compose logs -f sqlserver`).

### Step 3: Setup Database

```bash
# Copy scripts into container
docker cp ./database/scripts/01-create-database.sql simpleshop-sqlserver:/tmp/
docker cp ./database/scripts/02-create-user.sql simpleshop-sqlserver:/tmp/
docker cp ./database/scripts/03-create-tables.sql simpleshop-sqlserver:/tmp/
docker cp ./database/scripts/04-seed-data.sql simpleshop-sqlserver:/tmp/

# Execute scripts
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/01-create-database.sql
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/02-create-user.sql
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/03-create-tables.sql
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/04-seed-data.sql
```

### Step 4: Start .NET Backend

```bash
cd backend-dotnet
dotnet restore
dotnet build
dotnet run
```

The .NET API will be available at `http://localhost:5000`

Test it:
```bash
curl http://localhost:5000/api/health/db
```

### Step 5: Start Express.js Backend

In a new terminal:

```bash
cd backend-express
cp .env.example .env
npm install
npm start
```

The Express.js API will be available at `http://localhost:3000`

Test it:
```bash
curl http://localhost:3000/api/health/db
```

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] SQL Server is running: `docker ps | grep sqlserver`
- [ ] Database exists: See [database/README.md](database/README.md)
- [ ] .NET API responds: `curl http://localhost:5000/api/health`
- [ ] .NET DB connection: `curl http://localhost:5000/api/health/db`
- [ ] Express API responds: `curl http://localhost:3000/api/health`
- [ ] Express DB connection: `curl http://localhost:3000/api/health/db`

## 📚 Documentation

- [Database Setup](database/README.md)
- [.NET Backend](backend-dotnet/README.md)
- [Express.js Backend](backend-express/README.md)

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
# Start SQL Server
docker-compose up -d

# Stop SQL Server
docker-compose down

# View logs
docker-compose logs -f sqlserver

# Access SQL Server shell
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd

# Remove containers and volumes
docker-compose down -v
```

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
