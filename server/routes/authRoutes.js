import express from 'express';
import { login, logout, checkAuth } from '../controllers/authController.js';
import auth from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimit.js';

const router = express.Router();

router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.get('/me', auth, checkAuth);

export default router;