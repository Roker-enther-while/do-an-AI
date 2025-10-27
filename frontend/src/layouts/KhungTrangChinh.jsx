// src/layouts/KhungTrangChinh.jsx
import React, { useState } from 'react';
import {
  RiRobotLine, RiCalendarLine, RiBookOpenLine, RiNotificationLine,
  RiUserLine, RiLogoutBoxRLine, RiQuestionLine, RiSettingsLine
} from 'react-icons/ri';

// Import các trang con
import TroChuyen from '../pages/TroChuyen';
import LichHoc from '../pages/LichHoc';
import MonHoc from '../pages/MonHoc';
import ThongBao from '../pages/ThongBao';
import HoSoCaNhan from '../pages/HoSoCaNhan';
import TroGiup from '../pages/TroGiup';
import ChiTietMonHoc from '../pages/ChiTietMonHoc'; // <-- IMPORT TRANG CHI TIẾT

// Component NavItem (giữ nguyên)
const NavItem = ({ icon, children, onClick, isActive }) => {
  // ... code NavItem
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer transition-colors w-full
        ${isActive
          ? 'bg-blue-600 text-white shadow-lg'
          : 'text-gray-700 hover:bg-gray-100'}
      `}
    >
      <span className="text-xl">{icon}</span>
      <p className="font-medium text-sm">{children}</p>
    </button>
  );
};

function KhungTrangChinh({ setIsLoggedIn }) {
  const [trangHienTai, setTrangHienTai] = useState('trochuyen');
  // State để lưu dữ liệu môn học đang xem chi tiết
  const [monHocChiTiet, setMonHocChiTiet] = useState(null); // null = không xem chi tiết

  // Hàm render nội dung chính
  const renderActivePage = () => {
    // ƯU TIÊN: Nếu đang xem chi tiết môn học, hiển thị trang chi tiết
    if (monHocChiTiet) {
      return <ChiTietMonHoc
        course={monHocChiTiet}
        setMonHocChiTiet={setMonHocChiTiet} // Truyền hàm để quay lại
      />;
    }

    // Nếu không, hiển thị trang chính dựa trên 'trangHienTai'
    switch (trangHienTai) {
      case 'trochuyen':
        return <TroChuyen />;
      case 'lichhoc':
        return <LichHoc />;
      case 'monhoc':
        // Truyền hàm setMonHocChiTiet xuống trang Môn Học
        return <MonHoc setMonHocChiTiet={setMonHocChiTiet} />;
      case 'thongbao':
        return <ThongBao />;
      case 'hoso':
        return <HoSoCaNhan />;
      case 'trogiup':
        return <TroGiup />;
      default:
        return <TroChuyen />;
    }
  };

  // Hàm xử lý khi bấm vào NavItem
  const handleNavClick = (pageName) => {
    setTrangHienTai(pageName); // Đặt trang hiện tại
    setMonHocChiTiet(null);     // Đảm bảo tắt trang chi tiết khi chuyển trang chính
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col p-6 shrink-0">
        <h1 className="text-2xl font-bold text-indigo-600 mb-8">EduBot</h1>

        {/* Navigation Chính */}
        {/* Sử dụng handleNavClick và cập nhật isActive */}
        <nav className="flex-1 space-y-3 mb-6">
          <NavItem
            icon={<RiRobotLine />}
            isActive={trangHienTai === 'trochuyen' && !monHocChiTiet}
            onClick={() => handleNavClick('trochuyen')}
          >
            Trò Chuyện
          </NavItem>
          <NavItem
            icon={<RiCalendarLine />}
            isActive={trangHienTai === 'lichhoc' && !monHocChiTiet}
            onClick={() => handleNavClick('lichhoc')}
          >
            Lịch Học
          </NavItem>
          <NavItem
            icon={<RiBookOpenLine />}
            isActive={trangHienTai === 'monhoc' && !monHocChiTiet}
            onClick={() => handleNavClick('monhoc')}
          >
            Môn Học
          </NavItem>
          <NavItem
            icon={<RiNotificationLine />}
            isActive={trangHienTai === 'thongbao' && !monHocChiTiet}
            onClick={() => handleNavClick('thongbao')}
          >
            Thông Báo
          </NavItem>
        </nav>

        {/* Navigation Phụ & User */}
        <div className="border-t pt-6">
          <div className="space-y-3 mb-6">
            <NavItem
              icon={<RiSettingsLine />}
              isActive={trangHienTai === 'hoso' && !monHocChiTiet}
              onClick={() => handleNavClick('hoso')}
            >
              Hồ Sơ Cá Nhân
            </NavItem>
            <NavItem
              icon={<RiQuestionLine />}
              isActive={trangHienTai === 'trogiup' && !monHocChiTiet}
              onClick={() => handleNavClick('trogiup')}
            >
              Trợ Giúp
            </NavItem>
          </div>

          {/* User Info & Logout */}
          <div className="flex items-center space-x-3 mb-4">
            {/* ... User avatar and name ... */}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <RiUserLine className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Nguyễn Văn An</p>
              <p className="text-xs text-gray-500">20012345</p>
            </div>
          </div>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
          >
            <RiLogoutBoxRLine />
            <span className="text-sm font-medium">Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Khu vực nội dung chính */}
      <main className="flex-1 p-8 overflow-y-auto bg-gray-100 h-screen">
        {renderActivePage()} {/* Hàm này sẽ render đúng trang */}
      </main>
    </div>
  );
}

export default KhungTrangChinh;