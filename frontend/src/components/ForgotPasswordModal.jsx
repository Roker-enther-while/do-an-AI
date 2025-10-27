// src/components/ForgotPasswordModal.jsx
import React from 'react';
import { RiLockLine, RiCloseLine } from 'react-icons/ri';

function ForgotPasswordModal({ setModal }) {
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
                    <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <RiLockLine className="text-white text-3xl" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Quên Mật Khẩu</h2>
                    <p className="text-gray-600">Nhập MSSV hoặc email để lấy lại mật khẩu</p>
                </div>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">MSSV hoặc Email</label>
                        <input
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                            placeholder="Nhập MSSV hoặc email"
                            required
                            type="text"
                        />
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
                            className="flex-1 px-4 py-3 bg-orange-600 rounded-lg text-white hover:bg-orange-700 text-sm font-medium"
                        >
                            Gửi yêu cầu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPasswordModal;