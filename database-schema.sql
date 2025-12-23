-- Database Schema for User Management System

-- Table: roles
-- Contains user roles (admin, user, etc.)
CREATE TABLE IF NOT EXISTS roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: status
-- Contains user status (actif, inactif)
CREATE TABLE IF NOT EXISTS status (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(20) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: corps
-- Contains corps/unit information (الهيكل)
CREATE TABLE IF NOT EXISTS corps (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: Categories_grade
-- Contains grade categories
CREATE TABLE IF NOT EXISTS Categories_grade (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    code VARCHAR(20) UNIQUE,
    niveau INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table: users
-- Main users table with all required fields
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    matricule VARCHAR(50) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    id_role INT NOT NULL,
    id_statut INT NOT NULL DEFAULT 1,
    id_corps INT,
    id_Categories_grade INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_role) REFERENCES roles(id),
    FOREIGN KEY (id_statut) REFERENCES status(id),
    FOREIGN KEY (id_corps) REFERENCES corps(id),
    FOREIGN KEY (id_Categories_grade) REFERENCES Categories_grade(id)
);

-- Table: history_user
-- Tracks user history and status changes
CREATE TABLE IF NOT EXISTS history_user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    date_debut TIMESTAMP NOT NULL,
    date_fin TIMESTAMP,
    id_statut INT NOT NULL,
    id_corps INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id),
    FOREIGN KEY (id_statut) REFERENCES status(id),
    FOREIGN KEY (id_corps) REFERENCES corps(id)
);

-- Insert default data for roles
INSERT INTO roles (nom, description) VALUES 
    ('admin', 'Administrator with full access'),
    ('user', 'Regular user with limited access')
ON DUPLICATE KEY UPDATE nom=nom;

-- Insert default data for status
INSERT INTO status (nom, description) VALUES 
    ('actif', 'Active user'),
    ('inactif', 'Inactive user')
ON DUPLICATE KEY UPDATE nom=nom;

-- Insert sample data for corps
INSERT INTO corps (nom, code, description) VALUES 
    ('Corps 1', 'C001', 'Premier corps'),
    ('Corps 2', 'C002', 'Deuxième corps'),
    ('Corps 3', 'C003', 'Troisième corps')
ON DUPLICATE KEY UPDATE nom=VALUES(nom);

-- Insert sample data for Categories_grade
INSERT INTO Categories_grade (nom, code, niveau, description) VALUES 
    ('Grade A', 'GA', 1, 'Grade niveau A'),
    ('Grade B', 'GB', 2, 'Grade niveau B'),
    ('Grade C', 'GC', 3, 'Grade niveau C')
ON DUPLICATE KEY UPDATE nom=VALUES(nom);
