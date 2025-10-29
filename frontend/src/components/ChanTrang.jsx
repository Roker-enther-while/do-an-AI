// src/components/ChanTrang.jsx
import React from 'react';
import { RiFacebookFill, RiTwitterFill, RiLinkedinFill } from 'react-icons/ri'; // Ví dụ icons mạng xã hội

function ChanTrang() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-gray-400 py-10 px-4">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Cột 1: Giới thiệu */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-3">EduBot</h3>
          <p className="text-sm leading-relaxed">
            Trợ lý học tập AI, giúp sinh viên quản lý thời gian và lịch trình hiệu quả.
          </p>
          {/* Mạng xã hội */}
          <div className="flex space-x-4 mt-4">
            <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-white transition-colors"><RiFacebookFill size={20}/></a>
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-white transition-colors"><RiTwitterFill size={20}/></a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors"><RiLinkedinFill size={20}/></a>
          </div>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h4 className="font-semibold mb-3 text-white text-sm uppercase tracking-wider">Liên Kết Nhanh</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white hover:underline transition-colors">Tính Năng</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-colors">Hướng Dẫn</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-colors">Về Chúng Tôi</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* Cột 3: Hỗ Trợ */}
        <div>
          <h4 className="font-semibold mb-3 text-white text-sm uppercase tracking-wider">Hỗ Trợ</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white hover:underline transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-colors">Trung Tâm Trợ Giúp</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-colors">Điều Khoản Dịch Vụ</a></li>
            <li><a href="#" className="hover:text-white hover:underline transition-colors">Chính Sách Bảo Mật</a></li>
          </ul>
        </div>

        {/* Cột 4: Liên Hệ */}
        <div>
          <h4 className="font-semibold mb-3 text-white text-sm uppercase tracking-wider">Liên Hệ</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: support@edubot.edu.vn</li>
            <li>Hotline: (+84) 123 456 789</li>
            {/* Địa chỉ có thể bỏ bớt nếu không cần thiết */}
          </ul>
        </div>
      </div>

      {/* Dấu bản quyền */}
      <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500 text-xs">
        <p>&copy; {currentYear} EduBot Scheduler. All rights reserved.</p>
      </div>
    </footer>
  );
}
export default ChanTrang; // Export tên mới