// backend/routes/chat.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { getBotResponse } = require('../services/chatbotService'); // Service chatbot (hiện là placeholder)
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware

// GET /api/chat/history - Lấy lịch sử chat (Protected)
router.get('/history', authMiddleware, async (req, res) => {
  const username = req.user.username; // Lấy username từ user đã xác thực
  try {
    // Tìm 50 tin nhắn gần nhất của user, sắp xếp theo thời gian
    const messages = await Message.find({ username: username }).sort({ timestamp: 1 }).limit(50);
    res.json(messages);
  } catch (err) {
    console.error("Lỗi khi lấy lịch sử chat:", err.message);
    res.status(500).json({ msg: 'Lỗi server khi lấy lịch sử chat' });
  }
});

// POST /api/chat/message - Gửi tin nhắn mới (Protected)
router.post('/message', authMiddleware, async (req, res) => {
    const username = req.user.username; // Lấy username
    const { userMessage } = req.body;

    // Validate input
    if (!userMessage || typeof userMessage !== 'string' || userMessage.trim() === '') {
        return res.status(400).json({ msg: 'Nội dung tin nhắn không hợp lệ.' });
    }

    const trimmedMessage = userMessage.trim();

    try {
        // 1. Lưu tin nhắn của người dùng
        const userMsgDoc = new Message({ username, messageFrom: 'user', content: trimmedMessage });
        await userMsgDoc.save();

        // 2. Lấy phản hồi từ Chatbot Service
        const botMessageContent = await getBotResponse(trimmedMessage, username);

        // 3. Lưu tin nhắn của bot
        const botMsgDoc = new Message({ username, messageFrom: 'bot', content: botMessageContent });
        await botMsgDoc.save();

        // 4. Trả về phản hồi của bot cho frontend
        res.status(201).json(botMsgDoc); // Dùng status 201 Created

    } catch (err) {
        console.error('Lỗi khi xử lý tin nhắn chat:', err.message);
        res.status(500).json({ msg: 'Lỗi server khi xử lý tin nhắn' });
    }
});

module.exports = router;