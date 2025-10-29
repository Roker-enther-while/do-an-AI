// src/components/DangNhapModal.jsx
import React, { useState } from 'react';
import { RiUserLine, RiCloseLine, RiLoader4Line } from 'react-icons/ri';
import { loginUser } from '../services/api';

function DangNhapModal({ setModal, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const response = await loginUser(username, password);
      if (response.data.success) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        setIsLoggedIn(true); setModal(null);
      }
    } catch (err) {
      console.error("Login Error:", err);
      if (err.response?.data?.message) { setError(err.response.data.message); }
      else if (err.response?.status === 401) { setError('Tên đăng nhập hoặc mật khẩu không đúng.'); }
      else { setError('Không thể kết nối máy chủ. Vui lòng thử lại.'); }
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-md relative animate-slide-in-down">
        <button onClick={() => !loading && setModal(null)} disabled={loading} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl p-1 rounded-full transition-colors"><RiCloseLine /></button>
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3"><RiUserLine className="text-3xl" /></div>
          <h2 className="text-2xl font-semibold text-gray-800">Đăng Nhập</h2>
          <p className="text-gray-500 text-sm mt-1">Sử dụng tên đăng nhập của bạn</p>
        </div>
        <form className="space-y-4" onSubmit={handleLoginSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
            <input className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow" placeholder="Nhập tên đăng nhập (ví dụ: gia_ty)" required type="text" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
            <input className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow" placeholder="Nhập mật khẩu" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
          </div>
          {error && <p className="text-red-500 text-sm text-center py-1">{error}</p>}
          <div className="flex justify-between items-center text-xs md:text-sm pt-1">
             <button type="button" onClick={() => !loading && setModal('forgot')} disabled={loading} className="text-blue-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed">Quên mật khẩu?</button>
             <button type="button" onClick={() => !loading && setModal('register')} disabled={loading} className="text-green-600 hover:underline disabled:opacity-50 disabled:cursor-not-allowed">Đăng ký tài khoản</button>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => !loading && setModal(null)} disabled={loading} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors disabled:opacity-50">Quay lại</button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 bg-blue-600 rounded-md text-white hover:bg-blue-700 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-wait flex items-center justify-center">
              {loading ? <RiLoader4Line className="animate-spin text-xl" /> : 'Đăng nhập'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default DangNhapModal;