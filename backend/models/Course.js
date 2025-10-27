// backend/models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  description: { type: String },
  credits: { type: Number, required: true },
  teacherId: { type: String }, // Nên dùng teacherId thay vì tên
  // teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // Hoặc dùng tham chiếu
  maxStudents: { type: Number, default: 50 },
  registeredStudents: [{ type: String }], // Mảng studentId đã đăng ký
  // prerequisites: [{ type: String }], // Môn tiên quyết (mã môn)
  // scheduleInfo: { type: String } // Thông tin lịch học chung (nếu có)
});

module.exports = mongoose.model('Course', CourseSchema);