// backend/routes/chat.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { getBotResponse } = require('../services/chatbotService');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/chat/history (Protected)
router.get('/history', authMiddleware, async (req, res) => { /* ... code unchanged ... */
    const username = req.user.username;
    try {
        const messages = await Message.find({ username: username }).sort({ timestamp: 1 }).limit(100);
        res.json(messages);
    } catch (err) {
        console.error("Error fetching chat history:", err.message);
        res.status(500).json({ message: 'Server Error fetching chat history' });
    }
});

// POST /api/chat/message (Protected)
router.post('/message', authMiddleware, async (req, res) => { /* ... code unchanged ... */
    const username = req.user.username;
    const { userMessage } = req.body;
    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
        return res.status(400).json({ message: 'Invalid message content.' });
    }
    const trimmedMessage = userMessage.trim();
    try {
        const userMsgDoc = new Message({ username, messageFrom: 'user', content: trimmedMessage });
        await userMsgDoc.save();
        const botMessageContent = await getBotResponse(trimmedMessage, username);
        const botMsgDoc = new Message({ username, messageFrom: 'bot', content: botMessageContent });
        await botMsgDoc.save();
        res.status(201).json(botMsgDoc);
    } catch (err) {
        console.error('Error processing chat message:', err.message);
        res.status(500).json({ message: 'Server Error processing message' });
    }
});

module.exports = router;