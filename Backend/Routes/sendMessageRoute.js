import express from 'express';
import { sendSMS } from '../Controllers/sendMessageController.js';

const router = express.Router();

router.post('/sendMessage', sendSMS )

export default router;  