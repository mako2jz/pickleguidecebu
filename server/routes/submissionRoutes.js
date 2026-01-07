import express from 'express';
import { submitCourt } from '../controllers/submissionController.js';

const router = express.Router();

router.post('/submissions', submitCourt);

export default router;