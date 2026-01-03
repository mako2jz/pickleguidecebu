-- Example database schema for Pickle Guide Cebu

CREATE DATABASE IF NOT EXISTS pickleguidecebu;

USE pickleguidecebu;

-- Courts table
CREATE TABLE IF NOT EXISTS courts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO courts (name, location, description, price) VALUES
  ('Cebu Sports Complex', 'Sudlon, Lahug, Cebu City', 'Indoor pickleball court with modern facilities', 500.00),
  ('Active Zone Sports Center', 'Mabolo, Cebu City', 'Outdoor courts with excellent lighting', 400.00);
