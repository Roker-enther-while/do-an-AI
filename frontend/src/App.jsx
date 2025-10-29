// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// 👇 SỬA CÁC DÒNG IMPORT NÀY 👇
import DauTrang from './components/DauTrang';           // Thay Header bằng DauTrang
import NoiDungChinh from './components/NoiDungChinh'; // Thay MainContent bằng NoiDungChinh
import ChanTrang from './components/ChanTrang';         // Thay Footer bằng ChanTrang

// Import các Modal (đã đổi tên)
import DangNhapModal from './components/DangNhapModal';
import DangKyModal from './components/DangKyModal';
// import KichHoatModal from './components/KichHoatModal';
// import QuenMatKhauModal from './components/QuenMatKhauModal';

// Import Layout/Page
import KhungTrangChinh from './layouts/KhungTrangChinh';
// import TrangChu from './pages/TrangChu'; // Bỏ import TrangChu nếu App render trực tiếp

function App() {
  const [modal, setModal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('authToken'));
  

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const handleStorageChange = () => setIsLoggedIn(!!localStorage.getItem('authToken'));
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {isLoggedIn ? (
        <KhungTrangChinh setIsLoggedIn={handleLogout} />
      ) : (
        // Render trực tiếp các component đã đổi tên
        <div className="flex flex-col min-h-screen">
          <DauTrang setModal={setModal} /> {/* Dùng tên component mới */}
          <main className="flex-1">
            <NoiDungChinh />              {/* Dùng tên component mới */}
          </main>
          <ChanTrang />                   {/* Dùng tên component mới */}
        </div>
      )}

      {/* Render Modals */}
      {!isLoggedIn && modal === 'login' && <DangNhapModal setModal={setModal} setIsLoggedIn={setIsLoggedIn} />}
      {!isLoggedIn && modal === 'register' && <DangKyModal setModal={setModal} setIsLoggedIn={setIsLoggedIn} />}
      {/* {!isLoggedIn && modal === 'activate' && <KichHoatModal setModal={setModal} />} */}
      {/* {!isLoggedIn && modal === 'forgot' && <QuenMatKhauModal setModal={setModal} />} */}
    </>
  );
}

export default App;