// backend/routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Schedule = require('../models/Schedule');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/courses (Public)
router.get('/', async (req, res) => { /* ... code unchanged ... */
    try {
        const courses = await Course.find().sort('courseCode');
        res.json(courses);
    } catch (err) {
        console.error("Error fetching courses:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// GET /api/courses/:courseCode (Public)
router.get('/:courseCode', async (req, res) => { /* ... code unchanged ... */
    try {
        const course = await Course.findOne({ courseCode: req.params.courseCode });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (err) {
        console.error("Error fetching course details:", err.message);
        res.status(500).json({ message: 'Server Error' });
    }
});

// POST /api/courses/register/:courseCode (Protected)
router.post('/register/:courseCode', authMiddleware, async (req, res) => { /* ... code unchanged ... */
    const username = req.user.username;
    const courseCode = req.params.courseCode;
    try {
        const course = await Course.findOne({ courseCode: courseCode });
        if (!course) return res.status(404).json({ success: false, message: 'Môn học không tồn tại.' });
        if (course.registeredStudents.length >= course.maxStudents) return res.status(400).json({ success: false, message: 'Môn học đã hết chỗ.' });
        if (course.registeredStudents.includes(username)) return res.status(400).json({ success: false, message: 'Bạn đã đăng ký môn học này rồi.' });

        const userSchedules = await Schedule.find({ studentUsername: username });
        const courseScheduleDetails = course.schedule;
        for (const newSession of courseScheduleDetails) {
            for (const existingSession of userSchedules) {
                if (newSession.dayOfWeek === existingSession.dayOfWeek) {
                    const newStart = parseInt(newSession.startTime.split(':')[0]) * 60 + parseInt(newSession.startTime.split(':')[1]);
                    const newEnd = parseInt(newSession.endTime.split(':')[0]) * 60 + parseInt(newSession.endTime.split(':')[1]);
                    const existingStart = parseInt(existingSession.startTime.split(':')[0]) * 60 + parseInt(existingSession.startTime.split(':')[1]);
                    const existingEnd = parseInt(existingSession.endTime.split(':')[0]) * 60 + parseInt(existingSession.endTime.split(':')[1]);
                    if (newStart < existingEnd && newEnd > existingStart) {
                        console.log(`Schedule conflict: ${courseCode} (${newSession.dayOfWeek} ${newSession.startTime}-${newSession.endTime}) with ${existingSession.courseCode}`);
                        return res.status(400).json({ success: false, message: `Bị trùng lịch với môn ${existingSession.courseCode} (${existingSession.dayOfWeek}, ${existingSession.startTime} - ${existingSession.endTime}).` });
                    }
                }
            }
        }

        course.registeredStudents.push(username);
        await course.save();

        const scheduleDocsToAdd = course.schedule.map(session => ({
            studentUsername: username, courseCode: course.courseCode, courseName: course.courseName,
            dayOfWeek: session.dayOfWeek, startTime: session.startTime, endTime: session.endTime,
            room: session.room, teacherId: course.teacherId
        }));
        if (scheduleDocsToAdd.length > 0) { await Schedule.insertMany(scheduleDocsToAdd); }

        res.json({ success: true, message: `Đăng ký môn học ${courseCode} thành công!` });
    } catch (err) {
        console.error(`Error registering course ${courseCode} for ${username}:`, err.message);
        res.status(500).json({ success: false, message: 'Lỗi server khi đăng ký môn học.' });
    }
});

// DELETE /api/courses/unregister/:courseCode (Protected)
router.delete('/unregister/:courseCode', authMiddleware, async (req, res) => { /* ... code unchanged ... */
    const username = req.user.username;
    const courseCode = req.params.courseCode;
    try {
        const courseUpdateResult = await Course.updateOne({ courseCode: courseCode }, { $pull: { registeredStudents: username } });
        const deletedSchedules = await Schedule.deleteMany({ studentUsername: username, courseCode: courseCode });
        if (courseUpdateResult.modifiedCount > 0 || deletedSchedules.deletedCount > 0) {
            res.json({ success: true, message: `Đã hủy đăng ký môn học ${courseCode}.` });
        } else {
             return res.status(400).json({ success: false, message: 'Bạn chưa đăng ký môn học này hoặc môn học không tồn tại.' });
        }
    } catch (err) {
        console.error(`Error unregistering course ${courseCode} for ${username}:`, err.message);
        res.status(500).json({ success: false, message: 'Lỗi server khi hủy đăng ký.' });
    }
});

module.exports = router;