// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Nên dùng studentId làm username
  passwordHash: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'student' }, // student, admin,...
  dateOfBirth: { type: Date }, // Thêm cho Kích hoạt tài khoản
  idCardNumber: { type: String }, // Thêm cho Kích hoạt tài khoản
  phone: { type: String },
  address: { type: String },
  isActivated: { type: Boolean, default: false }, // Trạng thái kích hoạt
  // Có thể thêm các field khác: registeredCourses, gpa,...
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);