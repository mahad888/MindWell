import express from 'express'
import { createDoctorFeedback, getSingleDoctorFeedback } from '../Controllers/DoctorFeedbackController.js';

const router = express.Router()


router.get('/doctor/feedback/:doctorId', getSingleDoctorFeedback);
router.post('/doctor/feedback/:doctorId', createDoctorFeedback);

export default router;