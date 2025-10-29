// backend/routes/notifications.js
const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/notifications (Protected)
router.get('/', authMiddleware, async (req, res) => { /* ... code unchanged ... */
    const username = req.user.username;
   try {
     const notifications = await Notification.find({ username: username }).sort({ timestamp: -1 }).limit(20);
     res.json(notifications);
   } catch (err) {
     console.error("Error fetching notifications:", err.message);
     res.status(500).json({ message: 'Server Error fetching notifications' });
   }
});

// PUT /api/notifications/read/:id (Protected)
router.put('/read/:id', authMiddleware, async (req, res) => { /* ... code unchanged ... */
    const username = req.user.username;
    const notificationId = req.params.id;
     try {
        const notification = await Notification.findOneAndUpdate({ _id: notificationId, username: username }, { isRead: true }, { new: true });
        if (!notification) return res.status(404).json({ success: false, message: 'Notification not found or unauthorized.' });
        res.json({ success: true, message: 'Notification marked as read.', notification });
    } catch (err) {
        console.error("Error marking notification read:", err.message);
        res.status(500).json({ success: false, message: 'Server Error.' });
    }
});

// DELETE /api/notifications/:id (Protected)
router.delete('/:id', authMiddleware, async (req, res) => { /* ... code unchanged ... */
    const username = req.user.username;
    const notificationId = req.params.id;
     try {
         const result = await Notification.deleteOne({ _id: notificationId, username: username });
         if (result.deletedCount === 0) return res.status(404).json({ success: false, message: 'Notification not found or unauthorized.' });
         res.json({ success: true, message: 'Notification deleted.' });
    } catch (err) {
         console.error("Error deleting notification:", err.message);
         res.status(500).json({ success: false, message: 'Server Error.' });
    }
});

module.exports = router;