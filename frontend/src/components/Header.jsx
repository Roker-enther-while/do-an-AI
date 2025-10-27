// src/components/Header.jsx
import React from 'react';

// Nhận 'setModal' làm prop
function Header({ setModal }) {
    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                {/* Logo và Tiêu đề */}
                <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-indigo-600">EduBot</span>
                    <span className="hidden md:block text-gray-700 font-medium text-sm">
                        Trợ Lý Học Tập Thông Minh
                    </span>
                </div>

                {/* Nút Đăng nhập - Đổi thành <button> và thêm onClick */}
                <button
                    onClick={() => setModal('login')} // Mở modal Đăng nhập
                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors"
                >
                    Đăng nhập
                </button>
            </nav>
        </header>
    );
}
export default Header;