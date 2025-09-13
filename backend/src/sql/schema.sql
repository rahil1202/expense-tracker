-- Create DB and switch to it
CREATE DATABASE IF NOT EXISTS expense_tracker;
USE expense_tracker;

-- ----------------
-- Users table
-- ----------------
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  status ENUM('ACTIVE','INACTIVE') DEFAULT 'ACTIVE'
) ENGINE=InnoDB;

-- ----------------
-- Categories table
-- ----------------
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- ----------------
-- Expenses table
-- ----------------
CREATE TABLE IF NOT EXISTS expenses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  category INT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  date DATETIME NOT NULL,
  description VARCHAR(255),
  CONSTRAINT fk_exp_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT fk_exp_cat FOREIGN KEY (category) REFERENCES categories(id)
) ENGINE=InnoDB;

-- Helpful indexes
CREATE INDEX idx_exp_user ON expenses(user_id);
CREATE INDEX idx_exp_cat ON expenses(category);
CREATE INDEX idx_exp_date ON expenses(date);
