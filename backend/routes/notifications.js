// backend/routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware

// GET /api/notifications - Lấy thông báo của user (Protected)
router.get('/', authMiddleware, async (req, res) => {
    const username = req.user.username; // Lấy username từ user đã xác thực
   try {
     // Tìm 20 thông báo mới nhất của user
     const notifications = await Notification.find({ username: username }).sort({ timestamp: -1 }).limit(20);
     res.json(notifications);
   } catch (err) {
     console.error("Lỗi khi lấy thông báo:", err.message);
     res.status(500).json({ msg: 'Lỗi server khi lấy thông báo' });
   }
});

// PUT /api/notifications/read/:id - Đánh dấu đã đọc (Protected)
router.put('/read/:id', authMiddleware, async (req, res) => {
    const username = req.user.username; // Lấy username
    const notificationId = req.params.id;
     try {
        // Tìm và cập nhật thông báo, đảm bảo nó thuộc về đúng user
        const notification = await Notification.findOneAndUpdate(
            { _id: notificationId, username: username }, 
            { isRead: true },
            { new: true } // Trả về document đã cập nhật
        );
        
        // Kiểm tra xem có tìm thấy và cập nhật được không
        if (!notification) {
            return res.status(404).json({ success: false, msg: 'Thông báo không tồn tại hoặc không thuộc về bạn.' });
        }
        
        res.json({ success: true, msg: 'Đã đánh dấu thông báo là đã đọc.', notification });
    } catch (err) {
        console.error("Lỗi khi đánh dấu đọc:", err.message);
        res.status(500).json({ success: false, msg: 'Lỗi server.' });
    }
});

// DELETE /api/notifications/:id - Xóa thông báo (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
    const username = req.user.username; // Lấy username
    const notificationId = req.params.id;
     try {
         // Xóa thông báo, đảm bảo nó thuộc về đúng user
         const result = await Notification.deleteOne({ _id: notificationId, username: username }); 
         
         // Kiểm tra xem có xóa được bản ghi nào không
         if (result.deletedCount === 0) {
              return res.status(404).json({ success: false, msg: 'Thông báo không tồn tại hoặc không thuộc về bạn.' });
         }
         
        res.json({ success: true, msg: 'Đã xóa thông báo.' });
    } catch (err) {
         console.error("Lỗi khi xóa thông báo:", err.message);
         res.status(500).json({ success: false, msg: 'Lỗi server.' });
    }
});

module.exports = router;