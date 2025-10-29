// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Needed for activate/password change
require('dotenv').config();

// --- REGISTER ---
const registerValidation = [
  body('username', 'Tên đăng nhập không được để trống').trim().notEmpty(),
  body('password', 'Mật khẩu phải có ít nhất 6 ký tự').isLength({ min: 6 }),
  body('fullName', 'Họ tên không được để trống').optional().trim().notEmpty(),
  body('email', 'Email không hợp lệ').optional({ checkFalsy: true }).isEmail().normalizeEmail(),
];
router.post('/register', registerValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  const { username, password, fullName, email } = req.body;
  try {
    let user = await User.findOne({ $or: [{ username }, { email: email ? email.toLowerCase() : undefined }] });
    if (user) {
        const field = user.username === username ? 'Tên đăng nhập' : 'Email';
        return res.status(400).json({ success: false, errors: [{ msg: `${field} này đã tồn tại` }] });
    }
    user = new User({ username, passwordHash: password, fullName, email }); // SAVE PLAIN TEXT
    await user.save();
    console.log('Registration successful for:', username);
    const payload = { user: { id: user.id, username: user.username, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        res.status(201).json({ success: true, message: 'Đăng ký thành công!', token, user: { username: user.username, fullName: user.fullName } });
    });
  } catch (err) {
    console.error("Registration server error:", err.message);
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ success: false, errors: messages.map(msg => ({ msg })) });
     }
    res.status(500).json({ success: false, message: 'Lỗi server khi đăng ký.' });
  }
});

// --- LOGIN (Plain Text Compare) ---
const loginValidation = [
  body('username', 'Tên đăng nhập không được để trống').notEmpty(),
  body('password', 'Mật khẩu không được để trống').notEmpty(),
];
router.post('/login', loginValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
  const { username, password } = req.body;
  try {
    console.log("Login attempt - Searching for username:", username);
    const user = await User.findOne({ username: username });
    if (!user) {
      console.log('Login failed: User not found -', username);
      return res.status(401).json({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
    }
    const isMatch = (password === user.passwordHash); // PLAIN TEXT COMPARE
    if (!isMatch) {
      console.log('Login failed: Password mismatch for user -', username);
      return res.status(401).json({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng.' });
    }
    const payload = { user: { id: user.id, username: user.username, role: user.role } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
        if (err) throw err;
        console.log('Login successful for:', username);
        res.json({ success: true, message: 'Đăng nhập thành công!', token, user: { username: user.username, fullName: user.fullName } });
    });
  } catch (err) {
    console.error("Login server error:", err.message);
    res.status(500).json({ success: false, message: 'Lỗi server khi đăng nhập.' });
  }
});

// --- ACTIVATE (Hashes NEW password) ---
const activateValidation = [
    body('username', 'Tên đăng nhập không được để trống').notEmpty(),
    body('dob', 'Ngày sinh không hợp lệ').isISO8601().toDate(),
    body('idCard', 'Số CMND/CCCD không được để trống').notEmpty(),
    body('newPassword', 'Mật khẩu mới phải có ít nhất 6 ký tự').isLength({ min: 6 }),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.newPassword) { throw new Error('Xác nhận mật khẩu không khớp'); }
        return true;
    }),
];
router.post('/activate', activateValidation, async (req, res) => {
     const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    const { username, dob, idCard, newPassword } = req.body;
    try {
        const user = await User.findOne({ username: username, idCardNumber: idCard });
        if (!user) return res.status(404).json({ success: false, message: 'Thông tin không chính xác.' });
        if (user.isActivated) return res.status(400).json({ success: false, message: 'Tài khoản đã được kích hoạt.' });

        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(newPassword, salt); // Hash NEW password
        user.isActivated = true; user.dateOfBirth = dob;
        await user.save();
        res.json({ success: true, message: 'Kích hoạt thành công! Mật khẩu mới đã được lưu an toàn.' });
    } catch (err) {
        console.error("Activation error:", err.message);
        res.status(500).json({ success: false, message: 'Lỗi server khi kích hoạt.' });
    }
});

// --- FORGOT PASSWORD (Placeholder) ---
const forgotPasswordValidation = [ body('emailOrUsername', 'Vui lòng nhập tên đăng nhập hoặc Email').notEmpty() ];
router.post('/forgot-password', forgotPasswordValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    const { emailOrUsername } = req.body;
    console.log('Forgot password request for:', emailOrUsername);
    // In a real app: generate reset token, save it with expiry, send email
    res.json({ success: true, message: 'Nếu tài khoản tồn tại, hướng dẫn khôi phục sẽ được gửi (Logic chưa hoàn thiện)' });
});

module.exports = router;