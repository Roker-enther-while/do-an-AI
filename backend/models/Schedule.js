// backend/models/Schedule.js
const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  studentUsername: { type: String, required: true, index: true },
  courseCode: { type: String, required: true },
  courseName: { type: String, required: true },
  dayOfWeek: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  room: { type: String, required: true },
  teacherId: { type: String }
});

module.exports = mongoose.model('Schedule', ScheduleSchema, 'schedules');