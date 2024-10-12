import express from 'express';
const router = express.Router();
import { mood, moodHistory, suggestions } from '../Controllers/MoodManagementController.js';

router.post('/moods', mood);
router.get('/mood/history/:userId', moodHistory);
router.get('/suggestions', suggestions);

export default router;
