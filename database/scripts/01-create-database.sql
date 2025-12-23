-- =============================================
-- Script: Create Database
-- Description: Creates the development database
-- =============================================

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'SimpleShopDB')
BEGIN
    CREATE DATABASE SimpleShopDB;
    PRINT 'Database SimpleShopDB created successfully.';
END
ELSE
BEGIN
    PRINT 'Database SimpleShopDB already exists.';
END
GO

USE SimpleShopDB;
GO

PRINT 'Database setup completed.';
GO
