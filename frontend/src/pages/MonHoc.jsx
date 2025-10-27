// src/pages/MonHoc.jsx
import React from 'react';
import {
  RiBookmarkLine, RiUserLine, RiFlaskLine,
  RiArrowRightLine, RiBookOpenLine // Thêm RiBookOpenLine
} from 'react-icons/ri';

// Component CourseCard nhận prop 'onViewDetail'
const CourseCard = ({ courseData, onViewDetail }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1 mr-4"> {/* Thêm mr-4 */}
        <div className="flex items-center space-x-2 mb-2">
          <h3 className="text-lg font-bold text-gray-900">{courseData.title}</h3>
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-semibold whitespace-nowrap">{courseData.code}</span> {/* Thêm whitespace-nowrap */}
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{courseData.description}</p> {/* Thêm line-clamp-2 */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500"> {/* Thêm flex-wrap và gap */}
          <span className="flex items-center"><RiBookmarkLine className="mr-1" /> {courseData.credits} tín chỉ</span>
          <span className="flex items-center"><RiUserLine className="mr-1" /> {courseData.teacher}</span>
        </div>
      </div>
      {/* Icon môn học */}
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${courseData.iconBg} ${courseData.iconColor} shrink-0`}> {/* Thêm shrink-0 */}
        {courseData.icon}
      </div>
    </div>
    {/* Phần chân card */}
    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
      <span className="text-sm font-medium text-green-600">Còn 20/50 chỗ</span>
      {/* Nút Xem chi tiết gọi onViewDetail */}
      <button
        onClick={() => onViewDetail(courseData)}
        className="text-blue-600 hover:text-blue-700 font-medium text-sm cursor-pointer flex items-center"
      >
        Xem chi tiết <RiArrowRightLine className="ml-1" />
      </button>
    </div>
  </div>
);

// Dữ liệu mẫu
const courses = [
  {
    id: "IT307", // Thêm id để phân biệt
    title: "Phân Tích Dữ Liệu Lớn",
    code: "IT307",
    description: "Hadoop, Spark, xử lý và phân tích dữ liệu quy mô lớn, khám phá các kỹ thuật và công cụ tiên tiến.",
    credits: 4,
    teacher: "PGS. Ngô Thị H",
    icon: <RiFlaskLine className="text-xl" />,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    schedule: "Thứ 5 (09:00 - 11:00)", // Thêm lịch học mẫu
    // Thêm các thông tin chi tiết khác nếu cần
  },
  {
    id: "IT301",
    title: "Lập Trình Hướng Đối Tượng",
    code: "IT301",
    description: "Nguyên lý cơ bản của lập trình hướng đối tượng, bao gồm lớp, đối tượng, kế thừa, đa hình và đóng gói.",
    credits: 3,
    teacher: "TS. Lê Văn C",
    icon: <RiBookOpenLine className="text-xl" />,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    schedule: "Thứ 4 (07:00 - 09:00)",
  }
];

// Nhận prop 'setMonHocChiTiet'
function MonHoc({ setMonHocChiTiet }) {
  return (
    // Hiển thị danh sách các môn học
    <div className="space-y-6">
      {courses.map(course => (
        <CourseCard
          key={course.id} // Thêm key
          courseData={course}
          onViewDetail={setMonHocChiTiet} // Truyền hàm xử lý
        />
      ))}
    </div>
  );
}
export default MonHoc;