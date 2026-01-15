import express from 'express';
import { createReview, getReviewsByVenue, getReviewById, deleteReview } from '../controllers/reviewController.js';
import auth from '../middleware/auth.js';
import { adminOnly } from '../middleware/role.js';
import { reviewLimiter, publicReadLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/reviews', reviewLimiter, createReview);
router.get('/venues/:venueId/reviews', publicReadLimiter, getReviewsByVenue);
router.get('/reviews/:id', publicReadLimiter, getReviewById);
router.delete('/reviews/:id', auth, adminOnly, deleteReview);

export default router;
