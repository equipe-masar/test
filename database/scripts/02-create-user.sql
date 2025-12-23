-- =============================================
-- Script: Create Database User
-- Description: Creates a limited user for development
-- =============================================

USE master;
GO

-- Create login if it doesn't exist
IF NOT EXISTS (SELECT name FROM sys.server_principals WHERE name = 'simpleshop_dev')
BEGIN
    CREATE LOGIN simpleshop_dev WITH PASSWORD = 'DevPassword123!';
    PRINT 'Login simpleshop_dev created successfully.';
END
ELSE
BEGIN
    PRINT 'Login simpleshop_dev already exists.';
END
GO

USE SimpleShopDB;
GO

-- Create user if it doesn't exist
IF NOT EXISTS (SELECT name FROM sys.database_principals WHERE name = 'simpleshop_dev')
BEGIN
    CREATE USER simpleshop_dev FOR LOGIN simpleshop_dev;
    PRINT 'User simpleshop_dev created successfully.';
END
ELSE
BEGIN
    PRINT 'User simpleshop_dev already exists.';
END
GO

-- Grant permissions
ALTER ROLE db_datareader ADD MEMBER simpleshop_dev;
ALTER ROLE db_datawriter ADD MEMBER simpleshop_dev;
ALTER ROLE db_ddladmin ADD MEMBER simpleshop_dev;
GO

PRINT 'User permissions configured successfully.';
GO
