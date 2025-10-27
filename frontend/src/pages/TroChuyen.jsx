// src/pages/DashboardChat.jsx
import React from 'react';
import { RiRobotLine, RiSendPlaneFill, RiTimeLine, RiMapPinLine } from 'react-icons/ri';

const BotMessage = ({ text, time }) => (
  <div className="flex justify-start">
    <div className="max-w-[70%]">
      <div className="rounded-2xl px-4 py-3 bg-gray-100 text-gray-900"> {/* Đổi nền bot 1 chút */}
        <p className="text-sm">{text}</p>
      </div>
      <p className="text-xs text-gray-500 mt-1 text-left">{time}</p>
    </div>
  </div>
);

const CourseSuggestion = () => (
  <div className="bg-white rounded-xl p-4 border my-4">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h4 className="font-semibold text-gray-900">Toán A2 (MATH202)</h4>
        <p className="text-sm text-gray-600">PGS. Trần Thị B</p>
      </div>
      <div className="text-right">
        <span className="text-sm font-medium text-green-600">Còn 8/50 chỗ</span>
      </div>
    </div>
    <div className="flex items-center justify-between">
      <div className="text-sm text-gray-600">
        <div className="flex items-center"><RiTimeLine className="mr-1" /> Thứ 3, 6 (13:00-15:30)</div>
        <div className="flex items-center"><RiMapPinLine className="mr-1" /> B205</div>
      </div>
      <div className="flex space-x-2">
        <button className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer whitespace-nowrap">Xem chi tiết</button>
        <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer whitespace-nowrap">Đăng ký ngay</button>
      </div>
    </div>
  </div>
);

function DashboardChat() {
  return (
    // Giao diện này lấy từ file ..._39.html
    // Bỏ thẻ div "lg:col-span-2" bên ngoài
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col">
      <div className="border-b p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
            <RiRobotLine className="text-white text-xl" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">EduBot Assistant</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Đang hoạt động</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <BotMessage text="Xin chào Nguyễn Văn An! Tôi là EduBot, trợ lý học tập của bạn. Tôi có thể giúp gì cho bạn hôm nay?" time="09:00" />
        <BotMessage text="Tôi thấy bạn chưa đăng ký môn Toán A2. Đây là thông tin môn học:" time="09:01" />
        <CourseSuggestion />
      </div>

      <div className="border-t p-6">
        <form className="flex space-x-3">
          <input
            type="text"
            placeholder="Nhập tin nhắn cho EduBot..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <RiSendPlaneFill />
          </button>
        </form>
      </div>
    </div>
  );
}
export default DashboardChat;