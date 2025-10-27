// backend/models/Schedule.js
const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  studentUsername: { type: String, required: true }, // studentId/username
  courseCode: { type: String, required: true },
  courseName: { type: String }, // Có thể không cần nếu đã có courseCode
  dayOfWeek: { type: String, required: true }, // Thứ 2, Thứ 3,...
  startTime: { type: String, required: true }, // "07:30"
  endTime: { type: String, required: true },   // "09:30"
  room: { type: String, required: true },
  type: { type: String } // Lý thuyết, Thực hành
});
// Thêm index để truy vấn nhanh hơn
ScheduleSchema.index({ studentUsername: 1, dayOfWeek: 1 });

module.exports = mongoose.model('Schedule', ScheduleSchema);