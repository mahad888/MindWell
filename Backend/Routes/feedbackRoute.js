import { submitFeedback} from '../Controllers/FeedbackController.js';
import express from 'express';
const router =  express.Router();


router.post('/api/feedback', submitFeedback);



export default router;
