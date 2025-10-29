// src/components/DangKyModal.jsx
import React, { useState } from 'react';
import { RiUserAddLine, RiCloseLine, RiLoader4Line } from 'react-icons/ri';
import { registerUser } from '../services/api';
import { toast } from 'react-hot-toast';

function DangKyModal({ setModal, setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault(); setError('');
    if (password !== confirmPassword) { setError('Xác nhận mật khẩu không khớp.'); return; }
    if (password.length < 6) { setError('Mật khẩu phải có ít nhất 6 ký tự.'); return; }
    setLoading(true);
    const userData = { username, password, fullName: fullName || undefined, email: email || undefined };
    try {
      const response = await registerUser(userData);
      if (response.data.success) {
        toast.success(response.data.message || 'Đăng ký thành công!');
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        setIsLoggedIn(true); setModal(null);
      }
    } catch (err) {
      console.error("Registration Error:", err);
      if (err.response?.data?.errors) { setError(err.response.data.errors[0].msg); }
      else if (err.response?.data?.message) { setError(err.response.data.message); }
      else { setError('Đăng ký thất bại. Vui lòng thử lại.'); }
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-md relative animate-slide-in-down">
        <button onClick={() => !loading && setModal(null)} disabled={loading} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl p-1 rounded-full transition-colors"><RiCloseLine /></button>
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3"><RiUserAddLine className="text-3xl" /></div>
          <h2 className="text-2xl font-semibold text-gray-800">Đăng Ký Tài Khoản</h2>
          <p className="text-gray-500 text-sm mt-1">Tạo tài khoản mới</p>
        </div>
        <form className="space-y-3 md:space-y-4" onSubmit={handleRegisterSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập <span className="text-red-500">*</span></label>
            <input className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow" placeholder="Chọn tên đăng nhập (duy nhất)" required type="text" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu (tối thiểu 6 ký tự) <span className="text-red-500">*</span></label>
            <input className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow" placeholder="Nhập mật khẩu" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu <span className="text-red-500">*</span></label>
            <input className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow" placeholder="Nhập lại mật khẩu" required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
            <input className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow" placeholder="Nhập họ tên đầy đủ (tùy chọn)" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={loading} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow" placeholder="Nhập địa chỉ email (tùy chọn, duy nhất)" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
          </div>
          {error && <p className="text-red-500 text-sm text-center py-1">{error}</p>}
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={() => !loading && setModal('login')} disabled={loading} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors disabled:opacity-50">Quay lại Đăng nhập</button>
            <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 bg-green-600 rounded-md text-white hover:bg-green-700 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-wait flex items-center justify-center">
              {loading ? <RiLoader4Line className="animate-spin text-xl" /> : 'Đăng ký'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default DangKyModal;