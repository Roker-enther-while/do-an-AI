// backend/routes/schedule.js
const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware

// GET /api/schedule - Lấy lịch học của user đã đăng nhập (Protected)
router.get('/', authMiddleware, async (req, res) => {
  // Lấy username từ user đã được xác thực bởi middleware
  const username = req.user.username; 
  
  try {
    // Tìm tất cả lịch học thuộc về user này, sắp xếp theo ngày và giờ bắt đầu
    const userSchedule = await Schedule.find({ studentUsername: username }).sort('dayOfWeek startTime');
    
    // Trả về lịch học dưới dạng JSON
    res.json(userSchedule);
  } catch (err) {
    // Xử lý lỗi nếu có
    console.error("Lỗi khi lấy lịch học:", err.message);
    res.status(500).json({ msg: 'Lỗi server khi lấy lịch học' });
  }
});

module.exports = router;