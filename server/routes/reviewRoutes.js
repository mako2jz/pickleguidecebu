import express from 'express';
import { createReview, getReviewsByVenue, getReviewById, deleteReview } from '../controllers/reviewController.js';
import auth from '../middleware/auth.js';
import { adminOnly } from '../middleware/role.js';
import { reviewLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/reviews', reviewLimiter, createReview);
router.get('/venues/:venueId/reviews', getReviewsByVenue);
router.get('/reviews/:id', getReviewById);
router.delete('/reviews/:id', auth, adminOnly, deleteReview);

export default router;
