// src/components/Footer.jsx
import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-12 px-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Cột 1: Giới thiệu EduBot */}
                <div className="md:col-span-1">
                    <h3 className="text-2xl font-bold text-white mb-4">EduBot</h3>
                    <p>
                        Trợ lý AI thông minh cho sinh viên hiện đại.
                    </p>
                </div>

                {/* Cột 2: Tính Năng */}
                <div>
                    <h4 className="font-semibold mb-4 text-white">Tính Năng</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors">Quản lý lịch học</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Đăng ký môn học</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Thông báo tự động</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Tra cứu thông tin</a></li>
                    </ul>
                </div>

                {/* Cột 3: Hỗ Trợ */}
                <div>
                    <h4 className="font-semibold mb-4 text-white">Hỗ Trợ</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn sử dụng</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Liên hệ hỗ trợ</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Báo lỗi</a></li>
                    </ul>
                </div>

                {/* Cột 4: Liên Hệ */}
                <div>
                    <h4 className="font-semibold mb-4 text-white">Liên Hệ</h4>
                    <ul className="space-y-2">
                        <li>Email: support@edubot.edu.vn</li>
                        <li>Hotline: 1900-xxxx</li>
                        <li>Địa chỉ: Trường Đại học</li>
                    </ul>
                </div>
            </div>

            {/* Dấu bản quyền */}
            <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
                <p>© 2025 EduBot. Powered by Readdy</p>
            </div>
        </footer>
    );
}
export default Footer;