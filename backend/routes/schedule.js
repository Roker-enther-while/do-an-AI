// backend/routes/schedule.js
const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/schedule (Protected)
router.get('/', authMiddleware, async (req, res) => { /* ... code unchanged ... */
    const username = req.user.username;
    try {
        const dayOrder = { "Thứ 2": 2, "Thứ 3": 3, "Thứ 4": 4, "Thứ 5": 5, "Thứ 6": 6, "Thứ 7": 7, "Chủ nhật": 1 };
        const userScheduleRaw = await Schedule.find({ studentUsername: username });
        const userScheduleSorted = userScheduleRaw.sort((a, b) => {
            const dayCompare = (dayOrder[a.dayOfWeek] || 99) - (dayOrder[b.dayOfWeek] || 99);
            if (dayCompare !== 0) return dayCompare;
            return a.startTime.localeCompare(b.startTime);
        });
        res.json(userScheduleSorted);
    } catch (err) {
        console.error("Error fetching schedule:", err.message);
        res.status(500).json({ message: 'Server Error fetching schedule' });
    }
});

module.exports = router;