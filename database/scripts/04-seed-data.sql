-- =============================================
-- Script: Seed Data
-- Description: Inserts sample data for development
-- =============================================

USE SimpleShopDB;
GO

-- Seed Categories
IF NOT EXISTS (SELECT * FROM Categories)
BEGIN
    INSERT INTO Categories (Name, Description) VALUES
    ('Electronics', 'Electronic devices and accessories'),
    ('Clothing', 'Apparel and fashion items'),
    ('Books', 'Books and magazines'),
    ('Home & Garden', 'Home improvement and garden supplies');
    PRINT 'Categories seeded successfully.';
END
GO

-- Seed Products
IF NOT EXISTS (SELECT * FROM Products)
BEGIN
    INSERT INTO Products (Name, Description, Price, CategoryId, Stock) VALUES
    ('Laptop', 'High performance laptop', 999.99, 1, 10),
    ('Smartphone', 'Latest model smartphone', 699.99, 1, 15),
    ('T-Shirt', 'Cotton t-shirt', 19.99, 2, 50),
    ('Jeans', 'Denim jeans', 49.99, 2, 30),
    ('Programming Book', 'Learn to code', 39.99, 3, 20),
    ('Garden Tools Set', 'Complete gardening kit', 79.99, 4, 12);
    PRINT 'Products seeded successfully.';
END
GO

PRINT 'Seed data inserted successfully.';
GO
