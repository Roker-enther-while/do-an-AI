// backend/routes/profile.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');

// --- Validation Rules ---
const profileUpdateValidation = [
    body('fullName', 'Họ tên không được để trống').optional().notEmpty(),
    body('email', 'Email không hợp lệ').optional().isEmail(),
    body('phone', 'Số điện thoại không hợp lệ').optional().isMobilePhone('vi-VN'), // Ví dụ cho SĐT Việt Nam
];

const changePasswordValidation = [
    body('currentPassword', 'Mật khẩu hiện tại không được để trống').notEmpty(),
    body('newPassword', 'Mật khẩu mới phải có ít nhất 6 ký tự').isLength({ min: 6 }),
     body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.newPassword) {
            throw new Error('Xác nhận mật khẩu mới không khớp');
        }
        return true;
    }),
];

// --- API Endpoints ---

// GET /api/profile - Protected
router.get('/', authMiddleware, async (req, res) => { /* ... giữ nguyên logic lấy profile ... */
    const username = req.user.username;
    try {
        const userProfile = await User.findOne({ username: username }).select('-passwordHash');
        if (!userProfile) {
             return res.status(404).json({ message: 'Không tìm thấy người dùng.' });
        }
        // TODO: Lấy thêm thông tin học tập (GPA, tín chỉ)
        res.json(userProfile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT /api/profile - Protected
router.put('/', authMiddleware, profileUpdateValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const username = req.user.username;
    const { fullName, email, phone, address } = req.body;

    // Chỉ build object với các trường được phép cập nhật
    const profileUpdates = {};
    if (fullName !== undefined) profileUpdates.fullName = fullName; // Allow empty string if intended
    if (email !== undefined) profileUpdates.email = email;
    if (phone !== undefined) profileUpdates.phone = phone;
    if (address !== undefined) profileUpdates.address = address;

    // Ngăn chặn việc cập nhật các trường nhạy cảm khác qua body
    delete profileUpdates.username;
    delete profileUpdates.passwordHash;
    delete profileUpdates.role;
    delete profileUpdates.isActivated;

    if (Object.keys(profileUpdates).length === 0) {
        return res.status(400).json({ success: false, message: 'Không có thông tin nào để cập nhật.' });
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { username: username },
            { $set: profileUpdates },
            { new: true, runValidators: true } // Return updated doc, run schema validation
        ).select('-passwordHash'); // Không trả về password hash

        if (!updatedUser) {
             return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng.' });
        }
        res.json({ success: true, message: 'Cập nhật hồ sơ thành công!', user: updatedUser });
    } catch (err) {
        console.error("Profile update error:", err.message);
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
             return res.status(400).json({ success: false, message: 'Email này đã được sử dụng.' });
        }
        res.status(500).json({ success: false, message: 'Lỗi server khi cập nhật.' });
    }
});

// PUT /api/profile/change-password - Protected
router.put('/change-password', authMiddleware, changePasswordValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

     const username = req.user.username;
     const { currentPassword, newPassword } = req.body;

     try {
         const user = await User.findOne({ username: username });
         if (!user) return res.status(404).json({ success: false, message: 'Người dùng không tồn tại.' });

         // Kiểm tra mật khẩu hiện tại
         const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
         if (!isMatch) {
             return res.status(400).json({ success: false, message: 'Mật khẩu hiện tại không đúng.' });
         }

          // Kiểm tra mật khẩu mới có trùng mật khẩu cũ không
         if (await bcrypt.compare(newPassword, user.passwordHash)) {
             return res.status(400).json({ success: false, message: 'Mật khẩu mới không được trùng với mật khẩu cũ.' });
         }

         // Hash và lưu mật khẩu mới
         const salt = await bcrypt.genSalt(10);
         user.passwordHash = await bcrypt.hash(newPassword, salt);
         await user.save();

         res.json({ success: true, message: 'Đổi mật khẩu thành công!' });

     } catch (err) {
          console.error("Change password error:", err.message);
          res.status(500).json({ success: false, message: 'Lỗi server khi đổi mật khẩu.' });
     }
});

// TODO: API để cập nhật cài đặt thông báo

module.exports = router;