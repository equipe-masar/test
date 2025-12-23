# Database Setup

This directory contains SQL scripts for setting up the SimpleShop database.

## Scripts Execution Order

1. **01-create-database.sql** - Creates the SimpleShopDB database
2. **02-create-user.sql** - Creates a limited user for development (simpleshop_dev)
3. **03-create-tables.sql** - Creates all tables with proper constraints
4. **04-seed-data.sql** - Inserts sample data for development

## Manual Execution

If you need to run scripts manually:

```bash
# Using sqlcmd (if SQL Server is installed locally)
sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i 01-create-database.sql
sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i 02-create-user.sql
sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i 03-create-tables.sql
sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i 04-seed-data.sql
```

## Docker Execution

When using Docker Compose, you can execute scripts inside the container:

```bash
# Copy scripts to container
docker cp ./scripts/01-create-database.sql simpleshop-sqlserver:/tmp/
docker cp ./scripts/02-create-user.sql simpleshop-sqlserver:/tmp/
docker cp ./scripts/03-create-tables.sql simpleshop-sqlserver:/tmp/
docker cp ./scripts/04-seed-data.sql simpleshop-sqlserver:/tmp/

# Execute scripts
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/01-create-database.sql
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/02-create-user.sql
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/03-create-tables.sql
docker exec -it simpleshop-sqlserver /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -i /tmp/04-seed-data.sql
```

## Database Schema

### Tables

- **Categories** - Product categories
- **Products** - Product catalog
- **Customers** - Customer information
- **Orders** - Order records
- **OrderItems** - Order line items

### Users

- **sa** (System Administrator) - Full access (for setup only)
- **simpleshop_dev** - Limited development user (read, write, DDL on SimpleShopDB)
  - Password: `DevPassword123!` (change in production)

## Notes

- The SA password in development is `YourStrong@Passw0rd`
- The dev user password is `DevPassword123!`
- **Never commit these passwords in production environments**
