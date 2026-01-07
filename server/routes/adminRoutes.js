import express from 'express';
import { createCourt } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
import { adminOnly } from '../middleware/role.js';

const router = express.Router();

router.post('/courts', auth, adminOnly, createCourt);

export default router;