import express from 'express';
import { chatbot } from '../Controllers/chatbotController.js';
const router =  express.Router();

router.post('/api/chatbot', chatbot);
export default router

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */
