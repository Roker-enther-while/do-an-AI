// src/components/LoginModal.jsx

import React from 'react';
import { RiUserLine, RiCloseLine } from 'react-icons/ri';

// Nhận 'setModal' và 'setIsLoggedIn' từ App.jsx
function LoginModal({ setModal, setIsLoggedIn }) {

    // Hàm xử lý khi submit form
    const handleLoginSubmit = (e) => {
        e.preventDefault(); // Ngăn form tải lại trang

        // Giả lập đăng nhập thành công:
        setIsLoggedIn(true); // Báo cho App.jsx biết đã đăng nhập
        setModal(null);      // Đóng modal
    };

    return (
        // Lớp phủ nền mờ
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            {/* Box nội dung */}
            <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">

                <button
                    onClick={() => setModal(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                >
                    <RiCloseLine />
                </button>

                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <RiUserLine className="text-white text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Đăng Nhập</h2>
                    <p className="text-gray-600">Sử dụng mã số sinh viên để đăng nhập</p>
                </div>

                {/* Thêm onSubmit vào form */}
                <form className="space-y-4" onSubmit={handleLoginSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mã số sinh viên</label>
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            placeholder="Nhập mã số sinh viên"
                            required
                            type="text"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu</label>
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            placeholder="Nhập mật khẩu"
                            required
                            type="password"
                        />
                    </div>
                    <div className="flex justify-between text-sm">
                        <button
                            type="button"
                            onClick={() => setModal('forgot')}
                            className="text-blue-600 hover:text-blue-700 cursor-pointer"
                        >
                            Quên mật khẩu?
                        </button>
                        <button
                            type="button"
                            onClick={() => setModal('activate')}
                            className="text-green-600 hover:text-green-700 cursor-pointer"
                        >
                            Kích hoạt tài khoản
                        </button>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setModal(null)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium"
                        >
                            Quay lại
                        </button>
                        <button
                            type="submit" // Đổi thành type="submit"
                            className="flex-1 px-4 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 text-sm font-medium"
                        >
                            Đăng nhập
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginModal;