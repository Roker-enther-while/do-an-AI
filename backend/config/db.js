// backend/config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // Load biến môi trường từ .env

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB đã kết nối thành công! ✨');
  } catch (err) {
    console.error('Lỗi kết nối MongoDB:', err.message);
    // Thoát tiến trình nếu không kết nối được DB
    process.exit(1);
  }
};

module.exports = connectDB;