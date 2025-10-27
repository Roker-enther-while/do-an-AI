// src/App.jsx
import React, { useState } from 'react';

// Import các component của Trang chủ
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

// Import các Modal
import LoginModal from './components/LoginModal';
import ActivateModal from './components/ActivateModal';
import ForgotPasswordModal from './components/ForgotPasswordModal';

// Import Khung Trang Chính (Dashboard)
import KhungTrangChinh from './layouts/KhungTrangChinh';

function App() {
  // State quản lý việc hiển thị modal
  const [modal, setModal] = useState(null);

  // State quản lý trạng thái đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (

        // Giao diện SAU KHI đăng nhập
        <KhungTrangChinh setIsLoggedIn={setIsLoggedIn} />

      ) : (

        // Giao diện TRƯỚC KHI đăng nhập (Trang chủ)
        <div className="flex flex-col min-h-screen">
          <Header setModal={setModal} />
          <main className="flex-1">
            <MainContent />
          </main>
          <Footer />
        </div>

      )}

      {modal === 'login' && <LoginModal setModal={setModal} setIsLoggedIn={setIsLoggedIn} />}
      {modal === 'activate' && <ActivateModal setModal={setModal} />}
      {modal === 'forgot' && <ForgotPasswordModal setModal={setModal} />}
    </>
  );
}

export default App;