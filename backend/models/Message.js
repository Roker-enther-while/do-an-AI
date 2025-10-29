// backend/models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true },
  messageFrom: { type: String, enum: ['user', 'bot'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now, index: true }
});

module.exports = mongoose.model('Message', MessageSchema, 'messages');