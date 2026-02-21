// This folder will contain all the routes related to chatbot functionalities
import express from 'express';
import { message } from '../controllers/chatbot.message.js';
import { geminiMessage } from '../controllers/gemini.message.js';
import { deleteConversation, getConversationById, getConversations } from '../controllers/conversations.js';

const router = express.Router();

router.post('/message', message);

router.post("/gemini", geminiMessage);

// routes for conversations
router.get("/conversations", getConversations);
router.get("/conversations/:id", getConversationById);
router.delete("/conversations/:id", deleteConversation);


export default router;