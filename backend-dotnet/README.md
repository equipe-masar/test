# SimpleShop.API - .NET Backend

Backend API built with ASP.NET Core 8.0 and Entity Framework Core.

## Prerequisites

- .NET 8.0 SDK or later
- SQL Server (local or Docker)

## Configuration

1. Copy `.env.example` to `.env` (optional, uses appsettings.json by default):
   ```bash
   cp .env.example .env
   ```

2. Update connection string in `appsettings.Development.json` if needed:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost,1433;Database=SimpleShopDB;User Id=simpleshop_dev;Password=DevPassword123!;TrustServerCertificate=True"
     }
   }
   ```

## Installation

1. Restore dependencies:
   ```bash
   dotnet restore
   ```

2. Build the project:
   ```bash
   dotnet build
   ```

## Running

Start the application:
```bash
dotnet run
```

The API will be available at `http://localhost:5000` (or the port specified in launchSettings.json).

## Testing Database Connection

Once the application is running, test the database connection:

```bash
# General health check
curl http://localhost:5000/api/health

# Database connection test
curl http://localhost:5000/api/health/db

# DbContext connection test
curl http://localhost:5000/api/health/dbcontext
```

## API Documentation

When running in Development mode, Swagger UI is available at:
- http://localhost:5000/swagger

## Project Structure

```
backend-dotnet/
├── Controllers/       # API Controllers
│   └── HealthController.cs
├── Data/             # Database Context
│   └── SimpleShopDbContext.cs
├── Models/           # Entity Models
│   ├── Category.cs
│   ├── Customer.cs
│   ├── Order.cs
│   ├── OrderItem.cs
│   └── Product.cs
├── appsettings.json           # Configuration
├── appsettings.Development.json
└── Program.cs        # Application entry point
```

## Troubleshooting

### Connection Issues

If you get connection errors:

1. Make sure SQL Server is running:
   ```bash
   docker ps | grep sqlserver
   ```

2. Test SQL Server connection:
   ```bash
   docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "SELECT 1"
   ```

3. Check if the database exists:
   ```bash
   docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -Q "SELECT name FROM sys.databases"
   ```

### Build Issues

If you get build errors, try:
```bash
dotnet clean
dotnet restore
dotnet build
```
