// backend/models/Teacher.js
const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
  teacherId: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  department: { type: String },
  email: { type: String },
  phone: { type: String }
});

module.exports = mongoose.model('Teacher', TeacherSchema, 'teachers');