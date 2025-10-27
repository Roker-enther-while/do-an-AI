// backend/models/Notification.js
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Gửi tới user nào
  title: { type: String, required: true },
  content: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  type: { type: String }, // 'schedule_change', 'new_grade', 'deadline', 'system'
  link: { type: String }, // Link đến trang liên quan (nếu có)
  timestamp: { type: Date, default: Date.now }
});
NotificationSchema.index({ username: 1, timestamp: -1 });

module.exports = mongoose.model('Notification', NotificationSchema);