import express from 'express';
import { getAllCourts, getCourtById } from '../controllers/courtController.js';
import { publicReadLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

// Public routes with lenient rate limiting
router.get('/courts', publicReadLimiter, getAllCourts);
router.get('/courts/:id', publicReadLimiter, getCourtById);

export default router;