import express from 'express';
import { submitCourt } from '../controllers/submissionController.js';
import { submissionLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/submissions', submissionLimiter, submitCourt);

export default router;