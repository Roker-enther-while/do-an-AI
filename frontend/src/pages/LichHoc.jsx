// src/pages/DashboardSchedule.jsx
import React from 'react';
import { RiCalendarLine, RiTimeLine, RiMapPinLine } from 'react-icons/ri';

const ScheduleItem = ({ title, type, date, time, location, color }) => (
  <div className={`border ${color.border} rounded-lg p-4`}>
    <div className="flex items-start justify-between mb-2">
      <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
      <span className={`${color.bg} ${color.text} text-xs px-2 py-1 rounded whitespace-nowrap`}>
        {type}
      </span>
    </div>
    <div className="space-y-1 text-xs text-gray-600">
      <div className="flex items-center"><RiCalendarLine className="mr-2" /> {date}</div>
      <div className="flex items-center"><RiTimeLine className="mr-2" /> {time}</div>
      <div className="flex items-center"><RiMapPinLine className="mr-2" /> {location}</div>
    </div>
  </div>
);

function DashboardSchedule() {
  const colors = {
    blue: { border: 'border-blue-200', bg: 'bg-blue-100', text: 'text-blue-700' },
    red: { border: 'border-red-200', bg: 'bg-red-100', text: 'text-red-700' },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="space-y-4">
        <h3 className="font-bold text-gray-900 text-xl">Thứ 2</h3>
        <ScheduleItem
          title="Cơ Sở Dữ Liệu"
          type="Lý thuyết"
          date="01/02/2024"
          time="13:00 - 15:00"
          location="B205"
          color={colors.blue}
        />
        <ScheduleItem
          title="Trí Tuệ Nhân Tạo"
          type="Thực hành"
          date="02/02/2024"
          time="09:00 - 11:00"
          location="C301"
          color={colors.red}
        />
      </div>
      <div className="space-y-4">
        <h3 className="font-bold text-gray-900 text-xl">Thứ 3</h3>
        {/* Thêm lịch thứ 3 ở đây */}
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-6 lg:col-start-3">
        <h3 className="font-bold text-gray-900 mb-4">Chú Thích</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-3"><div className="w-4 h-4 bg-blue-500 rounded"></div><span className="text-sm text-gray-600">Lý thuyết</span></div>
          <div className="flex items-center space-x-3"><div className="w-4 h-4 bg-red-500 rounded"></div><span className="text-sm text-gray-600">Thực hành</span></div>
        </div>
      </div>
    </div>
  );
}
export default DashboardSchedule;