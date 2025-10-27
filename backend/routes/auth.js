// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator'); // Import validator
const User = require('../models/User');
require('dotenv').config();

// --- Validation Rules ---
const loginValidation = [
  body('studentId', 'Mã sinh viên không được để trống').notEmpty(),
  body('password', 'Mật khẩu không được để trống').notEmpty(),
];

const activateValidation = [
    body('studentId', 'Mã sinh viên không được để trống').notEmpty(),
    body('dob', 'Ngày sinh không hợp lệ').isISO8601().toDate(), // Kiểm tra định dạng ngày
    body('idCard', 'Số CMND/CCCD không được để trống').notEmpty(),
    body('newPassword', 'Mật khẩu mới phải có ít nhất 6 ký tự').isLength({ min: 6 }),
    body('confirmPassword').custom((value, { req }) => { // Kiểm tra khớp mật khẩu
        if (value !== req.body.newPassword) {
            throw new Error('Xác nhận mật khẩu không khớp');
        }
        return true;
    }),
];

const forgotPasswordValidation = [
    body('emailOrStudentId', 'Vui lòng nhập MSSV hoặc Email').notEmpty(),
];

// --- API Endpoints ---

// POST /api/auth/login
router.post('/login', loginValidation, async (req, res) => {
  // Kiểm tra kết quả validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { studentId, password } = req.body;

  try {
    const user = await User.findOne({ username: studentId });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Mã sinh viên hoặc mật khẩu không đúng.' });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Mã sinh viên hoặc mật khẩu không đúng.' });
    }

     // Kiểm tra tài khoản đã kích hoạt chưa (nếu cần)
    // if (!user.isActivated) {
    //     return res.status(403).json({ success: false, message: 'Tài khoản chưa được kích hoạt.' });
    // }

    // Tạo JWT token
    const payload = { user: { id: user.id, username: user.username, role: user.role } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token hết hạn sau 1 giờ
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          message: 'Đăng nhập thành công!',
          token,
          user: { username: user.username, fullName: user.fullName } // Chỉ trả về thông tin cần thiết
        });
      }
    );
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ success: false, message: 'Lỗi server khi đăng nhập.' });
  }
});

// POST /api/auth/activate
router.post('/activate', activateValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { studentId, dob, idCard, newPassword } = req.body;

    try {
        // Tìm user dựa trên thông tin xác thực (ví dụ)
        const user = await User.findOne({
            username: studentId,
            idCardNumber: idCard
            // Có thể kiểm tra thêm ngày sinh nếu lưu trong DB ban đầu
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Thông tin không chính xác hoặc tài khoản không tồn tại.' });
        }
        if (user.isActivated) {
            return res.status(400).json({ success: false, message: 'Tài khoản đã được kích hoạt.' });
        }

        // Hash mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(newPassword, salt);
        user.isActivated = true;
        user.dateOfBirth = dob; // Lưu ngày sinh sau khi xác thực

        await user.save();
        res.json({ success: true, message: 'Kích hoạt tài khoản thành công!' });

    } catch (err) {
        console.error("Activation error:", err.message);
        res.status(500).json({ success: false, message: 'Lỗi server khi kích hoạt.' });
    }
});


// POST /api/auth/forgot-password
router.post('/forgot-password', forgotPasswordValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
  const { emailOrStudentId } = req.body;
  // TODO: Tìm user, tạo token reset, gửi email (dùng nodemailer)
  console.log('Forgot password request for:', emailOrStudentId);
  res.json({ success: true, message: 'Nếu tài khoản tồn tại, email khôi phục sẽ được gửi (Logic chưa hoàn thiện)' });
});

module.exports = router;