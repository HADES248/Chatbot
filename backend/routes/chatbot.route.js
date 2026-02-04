// This folder will contain all the routes related to chatbot functionalities
import express from 'express';
import { message } from '../controllers/chatbot.message.js';

const router = express.Router();

router.post('/message', message);

export default router;