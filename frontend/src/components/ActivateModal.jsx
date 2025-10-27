// src/components/ActivateModal.jsx
import React from 'react';
import { RiUserAddLine, RiCloseLine } from 'react-icons/ri';

function ActivateModal({ setModal }) {
    return (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md relative">
                <button
                    onClick={() => setModal(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
                >
                    <RiCloseLine />
                </button>

                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <RiUserAddLine className="text-white text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Kích Hoạt Tài Khoản</h2>
                    <p className="text-gray-600">Nhập thông tin cá nhân để kích hoạt</p>
                </div>

                {/* Form dài hơn, nên thêm 'max-h-[70vh] overflow-y-auto' để cuộn */}
                <form className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mã số sinh viên</label>
                        <input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm" placeholder="Nhập mã số sinh viên" required type="text" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                        <input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm" required type="date" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Số CMND/CCCD</label>
                        <input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm" placeholder="Nhập số CMND/CCCD" required type="text" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mật khẩu mới</label>
                        <input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm" placeholder="Tạo mật khẩu mới" required type="password" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Xác nhận mật khẩu</label>
                        <input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm" placeholder="Nhập lại mật khẩu" required type="password" />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setModal('login')} // Quay lại modal Login
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 text-sm font-medium"
                        >
                            Quay lại
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-green-600 rounded-lg text-white hover:bg-green-700 text-sm font-medium"
                        >
                            Kích hoạt
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ActivateModal;