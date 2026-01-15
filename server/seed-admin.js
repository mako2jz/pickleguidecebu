// Run this script to generate a bcrypt hash for your admin password
// Usage: node seed-admin.js

import bcrypt from 'bcryptjs';
import db from './config/db.js';

const seedAdmin = async () => {
    try {
        // Configure your admin credentials here
        const adminData = {
            username: 'admin',
            email: 'admin@pickleguidecebu.com',
            password: 'admin123', // Change this to your desired password
            role: 'super_admin'
        };

        // Hash the password with bcrypt (10 rounds)
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(adminData.password, salt);

        // Insert admin into database
        const [result] = await db.query(
            `INSERT INTO admins (username, email, password_hash, role) 
             VALUES (?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE 
             password_hash = VALUES(password_hash),
             email = VALUES(email)`,
            [adminData.username, adminData.email, passwordHash, adminData.role]
        );

        console.log('   Admin seeded successfully!');
        console.log(`   Username: ${adminData.username}`);
        console.log(`   Email: ${adminData.email}`);
        console.log(`   Password: ${adminData.password}`);
        console.log(`   Role: ${adminData.role}`);
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error.message);
        process.exit(1);
    }
};

seedAdmin();
