import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const app = express();
const PORT = process.env.PORT || 5000;

// Global middleware
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { generalLimiter } from './middleware/rateLimit.js';

// Required middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true // Required for cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// General rate limiting for all routes
app.use('/api', generalLimiter);

// Mount Routes (Group by Responsibility)
import courtRoutes from './routes/courtRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Pickle Guide Cebu API' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Public routes
app.use('/api', courtRoutes);
app.use('/api', reviewRoutes);
app.use('/api', submissionRoutes);

// Auth routes
app.use('/api/auth', authRoutes);

// Admin routes (protected)
app.use('/api/admin', adminRoutes);

// Error Handler (LAST - catches all errors)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error'
  });
});

// Start the Server
import { testConnection } from './config/db.js';

testConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
