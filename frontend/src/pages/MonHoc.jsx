// src/pages/MonHoc.jsx
import React, { useState, useEffect } from 'react';
import { 
  RiBookmarkLine, RiUserLine, RiFlaskLine, RiArrowRightLine, 
  RiBookOpenLine, RiLoader4Line, RiAlertLine, RiDatabaseLine, RiComputerLine
} from 'react-icons/ri';
import { fetchCourses, registerCourse } from '../services/api';
import { toast } from 'react-hot-toast';

const CourseCard = ({ courseData, onViewDetail, onRegister, isRegistering }) => {
    const getIcon = (code) => {
        if (code.includes('DB')) return <RiDatabaseLine className="text-xl" />;
        if (code.includes('AI')) return <RiFlaskLine className="text-xl" />;
        if (code.includes('WEB')) return <RiComputerLine className="text-xl" />;
        return <RiBookOpenLine className="text-xl" />;
    };
    const getIconColor = (code) => {
         if (code.includes('DB')) return "bg-green-100 text-green-600";
        if (code.includes('AI')) return "bg-orange-100 text-orange-600";
        if (code.includes('WEB')) return "bg-indigo-100 text-indigo-600";
        return "bg-gray-100 text-gray-600";
    }

    return (
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 mr-4">
            <div className="flex items-center space-x-2 mb-2 flex-wrap">
              <h3 className="text-lg font-bold text-gray-900 mr-2">{courseData.courseName}</h3>
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-semibold whitespace-nowrap">{courseData.courseCode}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{courseData.description || "Chưa có mô tả"}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
              <span className="flex items-center"><RiBookmarkLine className="mr-1" /> {courseData.credits} tín chỉ</span>
              <span className="flex items-center"><RiUserLine className="mr-1" /> GV: {courseData.teacherId || "N/A"}</span>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getIconColor(courseData.courseCode)} shrink-0`}>
            {getIcon(courseData.courseCode)}
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm font-medium text-green-600">
            {courseData.registeredStudents?.length || 0} / {courseData.maxStudents || 50} chỗ
          </span>
          <div className="flex items-center gap-4">
             <button 
                onClick={() => onRegister(courseData.courseCode)}
                disabled={isRegistering}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-wait"
             >
                {isRegistering ? <RiLoader4Line className="animate-spin" /> : "Đăng ký"}
             </button>
             <button 
                onClick={() => onViewDetail(courseData)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer flex items-center"
             >
                Xem chi tiết <RiArrowRightLine className="ml-1" />
             </button>
          </div>
        </div>
      </div>
    );
};

function MonHoc({ setMonHocChiTiet }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [registeringId, setRegisteringId] = useState(null);

  const loadCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetchCourses();
      setCourses(response.data);
    } catch (err) {
      console.error("Lỗi khi lấy môn học:", err);
      setError('Không thể tải danh sách môn học.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleRegister = async (courseCode) => {
    setRegisteringId(courseCode);
    try {
        const response = await registerCourse(courseCode);
        toast.success(response.data.message);
        loadCourses(); // Tải lại danh sách để cập nhật số lượng
    } catch (err) {
        console.error("Lỗi đăng ký:", err);
        if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);
        } else {
            toast.error("Đăng ký thất bại. Vui lòng thử lại.");
        }
    } finally {
        setRegisteringId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <RiLoader4Line className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg flex items-center justify-center">
         <RiAlertLine className="mr-2" /> {error}
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {courses.length > 0 ? (
         courses.map(course => (
           <CourseCard
             key={course._id || course.courseCode} 
             courseData={course} 
             onViewDetail={setMonHocChiTiet}
             onRegister={handleRegister}
             isRegistering={registeringId === course.courseCode}
           />
         ))
      ) : (
         <p className="text-center text-gray-500">Không có môn học nào để hiển thị.</p>
      )}
    </div>
  );
}
export default MonHoc;