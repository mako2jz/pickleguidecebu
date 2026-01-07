-- Create database
CREATE DATABASE pickleguidecebu;
USE pickleguidecebu;

-- Venues table
CREATE TABLE courts (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    venue_picture VARCHAR(255) NOT NULL,
    venue_name VARCHAR(150) NOT NULL,

    location TEXT NOT NULL,
    number_of_courts INT UNSIGNED NOT NULL,

    price TEXT,

    facebook_page VARCHAR(255),
    instagram VARCHAR(255),
    viber VARCHAR(50),

    telephone_number VARCHAR(50),
    mobile_number VARCHAR(50),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Reviews table
CREATE TABLE reviews (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    venue_id INT UNSIGNED NOT NULL,

    rating TINYINT UNSIGNED NOT NULL CHECK (rating BETWEEN 1 AND 5),
    reviewer_name VARCHAR(100) NOT NULL,
    review_description TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_reviews_venue
        FOREIGN KEY (venue_id)
        REFERENCES courts(id)
        ON DELETE CASCADE
);

-- Admins table
CREATE TABLE admins (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    role ENUM('super_admin', 'admin') DEFAULT 'admin',

    is_active BOOLEAN DEFAULT TRUE,

    last_login TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
