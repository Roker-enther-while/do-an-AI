// backend/models/Notification.js
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, default: 'general' },
  isRead: { type: Boolean, default: false },
  timestamp: { type: Date, default: Date.now, index: true }
});

module.exports = mongoose.model('Notification', NotificationSchema, 'notifications');