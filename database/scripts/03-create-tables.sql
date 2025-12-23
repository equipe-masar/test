-- =============================================
-- Script: Create Tables
-- Description: Creates all tables for SimpleShop
-- =============================================

USE SimpleShopDB;
GO

-- Categories Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Categories]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Categories] (
        [CategoryId] INT IDENTITY(1,1) PRIMARY KEY,
        [Name] NVARCHAR(100) NOT NULL,
        [Description] NVARCHAR(500),
        [CreatedAt] DATETIME2 DEFAULT GETDATE(),
        [UpdatedAt] DATETIME2 DEFAULT GETDATE()
    );
    PRINT 'Table Categories created successfully.';
END
GO

-- Products Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Products]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Products] (
        [ProductId] INT IDENTITY(1,1) PRIMARY KEY,
        [Name] NVARCHAR(200) NOT NULL,
        [Description] NVARCHAR(MAX),
        [Price] DECIMAL(10,2) NOT NULL,
        [CategoryId] INT,
        [ImageUrl] NVARCHAR(500),
        [Stock] INT DEFAULT 0,
        [IsActive] BIT DEFAULT 1,
        [CreatedAt] DATETIME2 DEFAULT GETDATE(),
        [UpdatedAt] DATETIME2 DEFAULT GETDATE(),
        CONSTRAINT FK_Products_Categories FOREIGN KEY ([CategoryId]) 
            REFERENCES [dbo].[Categories]([CategoryId]) ON DELETE SET NULL
    );
    PRINT 'Table Products created successfully.';
END
GO

-- Customers Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Customers]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Customers] (
        [CustomerId] INT IDENTITY(1,1) PRIMARY KEY,
        [FirstName] NVARCHAR(100) NOT NULL,
        [LastName] NVARCHAR(100) NOT NULL,
        [Email] NVARCHAR(255) NOT NULL UNIQUE,
        [Phone] NVARCHAR(20),
        [CreatedAt] DATETIME2 DEFAULT GETDATE(),
        [UpdatedAt] DATETIME2 DEFAULT GETDATE()
    );
    PRINT 'Table Customers created successfully.';
END
GO

-- Orders Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Orders]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Orders] (
        [OrderId] INT IDENTITY(1,1) PRIMARY KEY,
        [CustomerId] INT NOT NULL,
        [OrderDate] DATETIME2 DEFAULT GETDATE(),
        [TotalAmount] DECIMAL(10,2) NOT NULL,
        [Status] NVARCHAR(50) DEFAULT 'Pending',
        [CreatedAt] DATETIME2 DEFAULT GETDATE(),
        [UpdatedAt] DATETIME2 DEFAULT GETDATE(),
        CONSTRAINT FK_Orders_Customers FOREIGN KEY ([CustomerId]) 
            REFERENCES [dbo].[Customers]([CustomerId]) ON DELETE CASCADE
    );
    PRINT 'Table Orders created successfully.';
END
GO

-- OrderItems Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[OrderItems]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[OrderItems] (
        [OrderItemId] INT IDENTITY(1,1) PRIMARY KEY,
        [OrderId] INT NOT NULL,
        [ProductId] INT NOT NULL,
        [Quantity] INT NOT NULL,
        [UnitPrice] DECIMAL(10,2) NOT NULL,
        [CreatedAt] DATETIME2 DEFAULT GETDATE(),
        CONSTRAINT FK_OrderItems_Orders FOREIGN KEY ([OrderId]) 
            REFERENCES [dbo].[Orders]([OrderId]) ON DELETE CASCADE,
        CONSTRAINT FK_OrderItems_Products FOREIGN KEY ([ProductId]) 
            REFERENCES [dbo].[Products]([ProductId])
    );
    PRINT 'Table OrderItems created successfully.';
END
GO

PRINT 'All tables created successfully.';
GO
