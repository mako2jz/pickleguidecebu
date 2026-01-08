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

-- User-submitted courts (pending admin review)
CREATE TABLE court_submissions (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    venue_name VARCHAR(150) NOT NULL,
    location TEXT NOT NULL,
    number_of_courts INT UNSIGNED NOT NULL,

    price TEXT,

    facebook_page VARCHAR(255),
    instagram VARCHAR(255),
    viber VARCHAR(50),

    telephone_number VARCHAR(50),
    mobile_number VARCHAR(50),

    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',

    reviewed_by INT UNSIGNED NULL,
    reviewed_at TIMESTAMP NULL,

    admin_notes TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_submission_admin
        FOREIGN KEY (reviewed_by)
        REFERENCES admins(id)
        ON DELETE SET NULL
);

-- Sample data for courts table
INSERT INTO courts (
    venue_picture, 
    venue_name, 
    location, 
    number_of_courts, 
    price, 
    facebook_page, 
    instagram, 
    viber, 
    telephone_number, 
    mobile_number
) VALUES
(
    'https://placehold.co/600x400?text=Cebu+Pickleball+Club',
    'Cebu Pickleball Club',
    '123 Mango Avenue, Cebu City, 6000',
    4,
    '300 PHP per hour / court',
    'https://facebook.com/cebupickleball',
    'https://instagram.com/cebupickleball',
    '0917-111-2222',
    '(032) 255-1234',
    '0917-111-2222'
),
(
    'https://placehold.co/600x400?text=Mandaue+Sports+Complex',
    'Mandaue City Sports Complex',
    'Centro, Mandaue City, Cebu',
    6,
    '150 PHP per person (Walk-in)',
    'https://facebook.com/mandauesports',
    NULL,
    NULL,
    '(032) 344-5678',
    '0922-333-4444'
),
(
    'https://placehold.co/600x400?text=Smashville+Arena',
    'Smashville Pickleball Arena',
    '88 Banilad Road, Cebu City',
    8,
    '400 PHP per hour (Peak)',
    'https://facebook.com/smashvillecebu',
    'https://instagram.com/smashville',
    '0918-555-6666',
    NULL,
    '0918-555-6666'
),
(
    'https://placehold.co/600x400?text=Lapu-Lapu+Community+Courts',
    'Lapu-Lapu Community Courts',
    'Pajac, Lapu-Lapu City',
    2,
    'Free usage for residents',
    NULL,
    NULL,
    NULL,
    NULL,
    '0999-777-8888'
),
(
    'https://placehold.co/600x400?text=Metro+Sports+Center',
    'Metro Sports Center',
    'Salinas Drive, Lahug, Cebu City',
    5,
    '250 PHP per hour',
    'https://facebook.com/metrosportscebu',
    NULL,
    NULL,
    '(032) 233-9999',
    '0933-222-1111'
);