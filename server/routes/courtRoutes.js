import express from 'express';
import { getAllCourts, getCourtById, createCourt } from '../controllers/courtController.js';

const router = express.Router();

// Court routes
router.get('/courts', getAllCourts);
router.get('/courts/:id', getCourtById);
router.post('/courts', createCourt);

export default router;
