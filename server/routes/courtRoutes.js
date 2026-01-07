import express from 'express';
import { getAllCourts, getCourtById } from '../controllers/courtController.js';

const router = express.Router();

router.get('/courts', getAllCourts);
router.get('/courts/:id', getCourtById);

export default router;