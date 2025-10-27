// src/pages/ThongBao.jsx
import React from 'react';
import { RiMedalLine, RiCloseCircleLine } from 'react-icons/ri';

// ↓↓↓ SỬA Ở ĐÂY ↓↓↓
const NotificationItem = ({ icon, iconBg, iconColor, title, text, time }) => (
  <div className="bg-white rounded-2xl shadow-sm p-6 transition-all">
    <div className="flex items-start space-x-4">
      <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center shrink-0`}>
        {/* React.cloneElement để thêm class màu vào icon */}
        {React.cloneElement(icon, { className: `${iconColor} text-xl` })}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-600 text-sm mb-3">{text}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{time}</span>
          <div className="flex items-center space-x-2">
            <button className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer">Xóa</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function ThongBao() { // Đổi tên component
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <NotificationItem
        title="Điểm số mới"
        text="Điểm bài kiểm tra giữa kỳ môn Cơ Sở Dữ Liệu đã được cập nhật: 8.5/10."
        time="3 ngày trước"
        // ↓↓↓ TRUYỀN iconColor VÀO ĐÂY ↓↓↓
        icon={<RiMedalLine />}
        iconBg="bg-green-100"
        iconColor="text-green-600"
      />
      <NotificationItem
        title="Hủy lịch học"
        text="Lịch học môn Trí Tuệ Nhân Tạo ngày 02/02/2024 đã bị hủy."
        time="4 ngày trước"
        // ↓↓↓ TRUYỀN iconColor VÀO ĐÂY ↓↓↓
        icon={<RiCloseCircleLine />}
        iconBg="bg-red-100"
        iconColor="text-red-600"
      />
      {/* Thêm các thông báo khác */}
    </div>
  );
}
export default ThongBao; // Đổi tên export