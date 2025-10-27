// src/pages/HoSoCaNhan.jsx
import React, { useState } from 'react';
import {
    RiUserLine,
    RiMailLine,
    RiPhoneLine,
    RiMapPinLine,
    RiGraduationCapLine,
    RiBarChartLine,
    RiSettingsLine,
    RiNotificationLine,
    RiLockPasswordLine,
    RiCheckboxCircleLine,
    RiBookOpenLine,
    RiTimeLine,
    RiArrowRightSLine
} from 'react-icons/ri';

// Component Toggle Switch (cho phần Cài đặt thông báo)
const ToggleSwitch = ({ label, description, initialChecked = true }) => {
    const [isChecked, setIsChecked] = useState(initialChecked);

    return (
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
                <h4 className="font-medium text-gray-900">{label}</h4>
                <p className="text-sm text-gray-600">{description}</p>
            </div>
            <button
                onClick={() => setIsChecked(!isChecked)}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${isChecked ? 'bg-blue-600' : 'bg-gray-300'}`}
            >
                <span
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform transform ${isChecked ? 'translate-x-6' : 'translate-x-0'}`}
                ></span>
            </button>
        </div>
    );
};

function HoSoCaNhan() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Cột 1: Thông tin cá nhân & Cài đặt */}
            <div className="lg:col-span-2 space-y-8">
                {/* Thông tin cá nhân (file ..._52 PM) */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Thông Tin Cá Nhân</h3>
                    <form className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                                <input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" type="text" defaultValue="Nguyễn Văn An" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mã số sinh viên</label>
                                <input className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm" readOnly type="text" value="2021001234" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" type="email" defaultValue="an.nguyen@student.edu.vn" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                                <input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" type="tel" defaultValue="0123456789" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
                            <input className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm" type="text" defaultValue="Hà Nội" />
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 text-sm font-medium">Lưu thay đổi</button>
                        </div>
                    </form>
                </div>

                {/* Cài đặt thông báo & Bảo mật (file ..._01 PM) */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Cài Đặt</h3>
                    <div className="mb-6">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Thông Báo</h4>
                        <div className="space-y-3">
                            <ToggleSwitch label="Thông báo lịch học" description="Nhận thông báo về thay đổi lịch học" />
                            <ToggleSwitch label="Thông báo lịch thi" description="Nhắc nhở về lịch thi" />
                            <ToggleSwitch label="Thông báo hạn chót" description="Nhắc nhở về các hạn chót quan trọng" />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Bảo Mật</h4>
                        <div className="space-y-3">
                            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-900">Đổi mật khẩu</span>
                                    <RiArrowRightSLine className="text-gray-400" />
                                </div>
                            </button>
                            {/* Thêm các cài đặt bảo mật khác nếu cần */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Cột 2: Thông tin học tập (file ..._57 PM) */}
            <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Tiến Độ Học Tập</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="bg-blue-50 p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <RiCheckboxCircleLine className="text-blue-600 text-2xl" />
                                <span className="text-2xl font-bold text-blue-600">78</span>
                            </div>
                            <p className="text-sm text-gray-600">Tín chỉ đã hoàn thành</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <RiBookOpenLine className="text-green-600 text-2xl" />
                                <span className="text-2xl font-bold text-green-600">18</span>
                            </div>
                            <p className="text-sm text-gray-600">Tín chỉ học kỳ này</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                                <RiTimeLine className="text-orange-600 text-2xl" />
                                <span className="text-2xl font-bold text-orange-600">42</span>
                            </div>
                            <p className="text-sm text-gray-600">Tín chỉ còn lại</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Kết Quả Học Tập</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700">GPA tích lũy</span>
                            <span className="text-lg font-bold text-gray-900">3.2 / 4.0</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-700">GPA học kỳ trước</span>
                            <span className="text-lg font-bold text-gray-900">3.5 / 4.0</span>
                        </div>
                        {/* Thêm các chỉ số khác */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HoSoCaNhan;