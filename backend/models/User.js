// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true }, // Stores plain text password (INSECURE)
  fullName: { type: String, trim: true },
  email: { type: String, unique: true, sparse: true, trim: true, lowercase: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  isActivated: { type: Boolean, default: false },
  idCardNumber: { type: String },
  dateOfBirth: { type: Date },
  phone: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema, 'users');