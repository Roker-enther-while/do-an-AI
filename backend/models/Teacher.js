// backend/models/Teacher.js
const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  teacherId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, unique: true },
  phone: { type: String },
  department: { type: String }
});

module.exports = mongoose.model('Teacher', TeacherSchema);