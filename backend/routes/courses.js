// backend/routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const Schedule = require('../models/Schedule'); // Cần để kiểm tra trùng lịch
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware

// GET /api/courses - Public
router.get('/', async (req, res) => { /* ... giữ nguyên logic lấy danh sách ... */
    try {
        const courses = await Course.find();
        // Có thể populate thông tin giảng viên nếu cần
        // const courses = await Course.find().populate('teacher', 'name teacherId');
        res.json(courses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET /api/courses/:courseCode - Public
router.get('/:courseCode', async (req, res) => { /* ... giữ nguyên logic lấy chi tiết ... */
    try {
        const course = await Course.findOne({ courseCode: req.params.courseCode });
        // .populate('teacher');
        if (!course) {
            return res.status(404).json({ msg: 'Môn học không tồn tại' });
        }
        // TODO: Lấy thêm thông tin tài liệu tham khảo,...
        res.json(course);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// POST /api/courses/register/:courseCode - Protected
router.post('/register/:courseCode', authMiddleware, async (req, res) => {
  const username = req.user.username; // Lấy từ token
  const courseCode = req.params.courseCode;

  try {
    const course = await Course.findOne({ courseCode: courseCode });
    // const user = await User.findOne({ username: username }); // Lấy user nếu cần kiểm tra thêm

    if (!course /*|| !user*/) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy môn học hoặc người dùng.' });
    }

    // 1. Ràng buộc: Đã đăng ký chưa?
    if (course.registeredStudents.includes(username)) {
      return res.status(400).json({ success: false, message: 'Bạn đã đăng ký môn học này rồi.' });
    }

    // 2. Ràng buộc: Còn chỗ không?
    if (course.registeredStudents.length >= course.maxStudents) {
      return res.status(400).json({ success: false, message: 'Môn học đã hết chỗ.' });
    }

    // 3. Ràng buộc: Kiểm tra môn tiên quyết (Giả sử CourseSchema có prerequisites)
    // if (course.prerequisites && course.prerequisites.length > 0) {
    //   const completedCourses = user.completedCourses || []; // Giả sử user có trường này
    //   const hasPrerequisites = course.prerequisites.every(code => completedCourses.includes(code));
    //   if (!hasPrerequisites) {
    //     return res.status(400).json({ success: false, message: 'Bạn chưa hoàn thành các môn tiên quyết.' });
    //   }
    // }

    // 4. Ràng buộc: Kiểm tra trùng lịch (Logic phức tạp hơn)
    // const courseSchedule = await getCourseSchedule(courseCode); // Hàm lấy lịch chi tiết của môn
    // const userSchedule = await Schedule.find({ studentUsername: username });
    // const hasConflict = checkScheduleConflict(courseSchedule, userSchedule); // Hàm kiểm tra trùng
    // if (hasConflict) {
    //     return res.status(400).json({ success: false, message: 'Lịch học bị trùng với môn đã đăng ký.' });
    // }


    // --- Nếu mọi ràng buộc OK ---
    course.registeredStudents.push(username);
    // user.registeredCourses.push(courseCode); // Cập nhật user nếu cần

    await course.save();
    // await user.save();

    // TODO: Tự động thêm lịch học chi tiết vào Schedule collection cho user này

    res.json({ success: true, message: `Đăng ký môn ${courseCode} thành công!` });

  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ success: false, message: 'Lỗi server khi đăng ký môn học.' });
  }
});

// DELETE /api/courses/unregister/:courseCode - Protected
router.delete('/unregister/:courseCode', authMiddleware, async (req, res) => {
    const username = req.user.username;
    const courseCode = req.params.courseCode;
     try {
        const course = await Course.findOne({ courseCode: courseCode });
        if (!course) return res.status(404).json({ success: false, message: 'Môn học không tồn tại.' });

        // Kiểm tra xem user có đăng ký môn này không
        if (!course.registeredStudents.includes(username)) {
             return res.status(400).json({ success: false, message: 'Bạn chưa đăng ký môn học này.' });
        }

        // Xóa user khỏi danh sách đăng ký
        course.registeredStudents = course.registeredStudents.filter(studentId => studentId !== username);
        await course.save();

        // TODO: Xóa môn học khỏi danh sách của user (nếu có)
        // TODO: Xóa các lịch học liên quan trong Schedule collection

        res.json({ success: true, message: `Hủy đăng ký môn ${courseCode} thành công.` });
    } catch (err) {
        console.error("Unregistration error:", err.message);
        res.status(500).json({ success: false, message: 'Lỗi server khi hủy đăng ký.' });
    }
});


module.exports = router;