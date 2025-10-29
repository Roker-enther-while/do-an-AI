// src/layouts/KhungTrangChinh.jsx
import React, { useState, useEffect } from 'react';
// ... imports icons ...
import {
  RiRobot2Line, RiCalendarEventLine, RiBookOpenLine, RiNotificationBadgeLine,
  RiUserLine, RiLogoutBoxRLine, RiQuestionLine, RiSettings3Line
} from 'react-icons/ri';

// ... imports pages ...
import TroChuyen from '../pages/TroChuyen';
import LichHoc from '../pages/LichHoc';
import MonHoc from '../pages/MonHoc';
import ThongBao from '../pages/ThongBao';
import HoSoCaNhan from '../pages/HoSoCaNhan';
import TroGiup from '../pages/TroGiup';
import ChiTietMonHoc from '../pages/ChiTietMonHoc';

// ... NavItem component ...
const NavItem = ({ icon, children, onClick, isActive }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 px-4 py-2.5 rounded-lg cursor-pointer transition-all w-full text-left duration-200 ${isActive ? 'bg-gradient from-blue-500 to-indigo-600 text-white shadow-lg scale-[1.03]' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}>
      <span className="text-xl shrink-0">{icon}</span>
      <p className="font-medium text-sm truncate">{children}</p>
    </button>
);


function KhungTrangChinh({ setIsLoggedIn }) {
  const [currentPage, setCurrentPage] = useState('trochuyen');
  // Sử dụng tên state nhất quán: courseDetail
  const [courseDetail, setCourseDetail] = useState(null);
  const [userInfo, setUserInfo] = useState({ fullName: "Loading...", username: "..." });

  useEffect(() => {
     const storedUserInfo = localStorage.getItem('userInfo');
     if (storedUserInfo) { setUserInfo(JSON.parse(storedUserInfo)); }
  }, []);

  const renderActivePage = () => {
    // ---- SỬA Ở ĐÂY: Kiểm tra `courseDetail` ----
    if (courseDetail) {
      // Truyền đúng tên prop `setMonHocChiTiet` xuống component con
      return <ChiTietMonHoc course={courseDetail} setMonHocChiTiet={setCourseDetail} />;
    }
    // ------------------------------------------
    switch (currentPage) {
      case 'trochuyen': return <TroChuyen />;
      case 'lichhoc': return <LichHoc />;
      // Truyền đúng tên prop `setMonHocChiTiet` xuống component con
      case 'monhoc': return <MonHoc setMonHocChiTiet={setCourseDetail} />;
      case 'thongbao': return <ThongBao />;
      case 'hoso': return <HoSoCaNhan />;
      case 'trogiup': return <TroGiup />;
      default: return <TroChuyen />;
    }
  };

  const handleNavClick = (pageName) => {
    setCurrentPage(pageName);
    setCourseDetail(null); // Đóng chi tiết khi chuyển trang
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4 shrink-0 h-full overflow-y-auto shadow-sm">
         {/* ... Logo ... */}
         <div className="px-3 mb-6 flex items-center space-x-2">
             <div className="w-8 h-8 bg-gradient from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-md">
                  <RiRobot2Line className="text-lg"/>
             </div>
             <h1 className="text-xl font-bold text-gray-800">EduBot</h1>
         </div>

        {/* Navigation Chính */}
        <nav className="flex-1 space-y-1.5 mb-6">
          <NavItem icon={<RiRobot2Line />} isActive={currentPage === 'trochuyen' && !courseDetail} onClick={() => handleNavClick('trochuyen')}>Trò Chuyện</NavItem>
          <NavItem icon={<RiCalendarEventLine />} isActive={currentPage === 'lichhoc' && !courseDetail} onClick={() => handleNavClick('lichhoc')}>Lịch Học</NavItem>
          <NavItem icon={<RiBookOpenLine />} isActive={currentPage === 'monhoc' && !courseDetail} onClick={() => handleNavClick('monhoc')}>Môn Học</NavItem>
          <NavItem icon={<RiNotificationBadgeLine />} isActive={currentPage === 'thongbao' && !courseDetail} onClick={() => handleNavClick('thongbao')}>Thông Báo</NavItem>
        </nav>

        {/* Phần dưới Sidebar */}
        <div className="mt-auto pt-4 border-t border-gray-100">
           {/* ... Settings, User Info, Logout ... */}
            <div className="space-y-1.5 mb-4">
              <NavItem icon={<RiSettings3Line />} isActive={currentPage === 'hoso' && !courseDetail} onClick={() => handleNavClick('hoso')}>Hồ Sơ & Cài Đặt</NavItem>
            </div>
             <div className="flex items-center space-x-3 mb-3 p-2.5 rounded-lg bg-gray-50 border border-gray-200">
                 <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center shrink-0"><RiUserLine className="text-gray-600 text-lg" /></div>
                 <div className="overflow-hidden">
                     <p className="text-xs font-semibold text-gray-800 truncate" title={userInfo.fullName || userInfo.username}>{userInfo.fullName || userInfo.username}</p>
                     <p className="text-xs text-gray-500 truncate" title={userInfo.username}>{userInfo.username}</p>
                 </div>
             </div>
              <button
                onClick={setIsLoggedIn}
                className="flex items-center space-x-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 hover:font-medium transition-all w-full duration-200"
              >
                <RiLogoutBoxRLine className="text-xl"/>
                <span className="text-sm">Đăng xuất</span>
              </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-8 overflow-y-auto h-screen">
        {renderActivePage()}
      </main>
    </div>
  );
}
export default KhungTrangChinh;