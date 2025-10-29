// backend/routes/profile.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // Still needed for NEW password

// GET /api/profile (Protected)
router.get('/', authMiddleware, async (req, res) => { /* ... code unchanged ... */
    try {
        const user = await User.findById(req.user.id).select('-passwordHash');
        if (!user) return res.status(404).json({ message: 'User not found.' });
        res.json(user);
    } catch (err) {
        console.error("Error fetching profile:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// PUT /api/profile (Protected)
const profileUpdateValidation = [ /* ... validation ... */ ];
router.put('/', authMiddleware, profileUpdateValidation, async (req, res) => { /* ... code unchanged ... */
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    const { fullName, email, phone, address } = req.body;
    const profileFields = {};
    if (fullName !== undefined) profileFields.fullName = fullName;
    if (email !== undefined) profileFields.email = email.toLowerCase(); // Ensure lowercase email
    if (phone !== undefined) profileFields.phone = phone;
    if (address !== undefined) profileFields.address = address;
    try {
        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
        if (email && email.toLowerCase() !== user.email) {
            const existingUser = await User.findOne({ email: email.toLowerCase() });
            if (existingUser && existingUser.id !== user.id) {
                return res.status(400).json({ success: false, message: 'Email already in use.' });
            }
        }
        user = await User.findByIdAndUpdate( req.user.id, { $set: profileFields }, { new: true } ).select('-passwordHash');
        res.json({ success: true, message: 'Profile updated successfully!', user });
    } catch (err) {
        console.error("Error updating profile:", err.message);
        res.status(500).json({ success: false, message: 'Server Error updating profile' });
    }
});

// PUT /api/profile/change-password (Protected, checks plain text current)
const passwordChangeValidation = [
    body('currentPassword', 'Mật khẩu hiện tại không được để trống').notEmpty(),
    body('newPassword', 'Mật khẩu mới phải có ít nhất 6 ký tự').isLength({ min: 6 }),
    body('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.newPassword) throw new Error('Xác nhận mật khẩu mới không khớp');
        return true;
    }),
];
router.put('/change-password', authMiddleware, passwordChangeValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    const { currentPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

        // --- CHECK CURRENT PASSWORD (Plain Text Compare) ---
        const isMatch = (currentPassword === user.passwordHash);
        // --------------------------------------------------

        if (!isMatch) return res.status(400).json({ success: false, message: 'Mật khẩu hiện tại không đúng.' });

        // Hash the NEW password before saving
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ success: true, message: 'Password changed successfully!' });
    } catch (err) {
        console.error("Error changing password:", err.message);
        res.status(500).json({ success: false, message: 'Server Error changing password.' });
    }
});

module.exports = router;