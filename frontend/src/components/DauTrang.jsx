// src/components/DauTrang.jsx
import React from 'react';
import { RiLoginBoxLine, RiUserAddLine } from 'react-icons/ri';

function DauTrang({ setModal }) {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-20">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Logo/Tên */}
        <div className="flex items-center space-x-2">
           <span className="text-xl font-bold text-indigo-700">EduBot Lịch Học</span>
        </div>

        {/* Nút Đăng nhập / Đăng ký */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setModal('login')} // Mở modal đăng nhập
            className="flex items-center space-x-1.5 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm shadow-sm"
          >
            <RiLoginBoxLine />
            <span>Đăng Nhập</span>
          </button>
          <button
            onClick={() => setModal('register')} // Mở modal đăng ký
            className="flex items-center space-x-1.5 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm shadow-sm"
          >
             <RiUserAddLine />
             <span>Đăng Ký</span>
          </button>
        </div>
      </nav>
    </header>
  );
}

export default DauTrang; // Export tên mới