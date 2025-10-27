// backend/models/Message.js
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  messageFrom: { type: String, required: true, enum: ['user', 'bot'] },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});
MessageSchema.index({ username: 1, timestamp: 1 });

module.exports = mongoose.model('Message', MessageSchema);