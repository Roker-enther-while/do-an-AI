// backend/models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  credits: { type: Number, required: true },
  description: { type: String },
  teacherId: { type: String },
  schedule: [{
    dayOfWeek: String, startTime: String, endTime: String, room: String, _id: false
  }],
  maxStudents: { type: Number, default: 50 },
  registeredStudents: [{ type: String }] // Array of usernames
});

module.exports = mongoose.model('Course', CourseSchema, 'courses');