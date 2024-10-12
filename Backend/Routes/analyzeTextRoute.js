import express from 'express';
import { analyzeTextController } from '../Controllers/analyzeTextController.js';

const router = express.Router();

// Define the route for analyzing messages
router.post('/analyze-text', analyzeTextController);

export default router;
