// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
  // Lấy token từ header 'x-auth-token' (hoặc 'Authorization: Bearer <token>')
  const token = req.header('x-auth-token');

  // Kiểm tra nếu không có token
  if (!token) {
    return res.status(401).json({ msg: 'Không có token, truy cập bị từ chối' });
  }

  // Xác thực token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Đảm bảo JWT_SECRET có trong .env
    req.user = decoded.user; // Gắn thông tin user (payload) vào request
    next(); // Chuyển sang xử lý tiếp theo
  } catch (err) {
    res.status(401).json({ msg: 'Token không hợp lệ' });
  }
};