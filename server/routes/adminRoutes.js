import express from 'express';
import { createCourt, getAllCourts, getCourtById, updateCourt, deleteCourt, approveSubmission, declineSubmission, getPendingSubmissions } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';
import { adminOnly } from '../middleware/role.js';

const router = express.Router();

router.post('/courts', auth, adminOnly, createCourt);
router.get('/courts', auth, adminOnly, getAllCourts);
router.get('/courts/:id', auth, adminOnly, getCourtById);
router.put('/courts/:id', auth, adminOnly, updateCourt);
router.delete('/courts/:id', auth, adminOnly, deleteCourt);
router.get('/submissions', auth, adminOnly, getPendingSubmissions);
router.post('/submissions/:id/approve', auth, adminOnly, approveSubmission);
router.delete('/submissions/:id/decline', auth, adminOnly, declineSubmission);


export default router;