// src/components/KichHoatModal.jsx
import React, { useState } from 'react';
import { RiCloseLine, RiShieldCheckLine, RiLoader4Line } from 'react-icons/ri';
import { activateUser } from '../services/api';

function KichHoatModal({ setModal }) {
  const [username, setUsername] = useState('');
  const [dob, setDob] = useState('');
  const [idCard, setIdCard] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State để hiển thị thông báo thành công

  const handleActivateSubmit = async (e) => {
    e.preventDefault(); setError(''); setSuccess('');
    if (newPassword !== confirmPassword) { setError('Xác nhận mật khẩu không khớp.'); return; }
    if (newPassword.length < 6) { setError('Mật khẩu mới phải có ít nhất 6 ký tự.'); return; }
    setLoading(true);
    const activationData = { username, dob, idCard, newPassword, confirmPassword };
    try {
      const response = await activateUser(activationData);
      if (response.data.success) {
        // toast.success(response.data.message || 'Kích hoạt thành công!'); // Có thể dùng toast thay vì state
        setSuccess(response.data.message + " Bạn có thể quay lại để đăng nhập bằng mật khẩu mới.");
        // Xóa form sau khi thành công
        setUsername(''); setDob(''); setIdCard(''); setNewPassword(''); setConfirmPassword('');
      }
    } catch (err) {
      console.error("Lỗi kích hoạt:", err);
      if (err.response?.data) { setError(err.response.data.message || err.response.data.errors?.[0]?.msg || 'Kích hoạt thất bại.'); }
      else { setError('Không thể kết nối đến server.'); }
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-md relative animate-slide-in-down">
        <button onClick={() => !loading && setModal(null)} disabled={loading} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl p-1 rounded-full transition-colors"><RiCloseLine /></button>
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3"><RiShieldCheckLine className="text-3xl" /></div>
          <h2 className="text-2xl font-semibold text-gray-800">Kích Hoạt Tài Khoản</h2>
          <p className="text-gray-500 text-sm mt-1">Xác thực thông tin để tạo mật khẩu</p>
        </div>

        {!success ? ( // Chỉ hiện form nếu chưa thành công
          <form className="space-y-3 md:space-y-4" onSubmit={handleActivateSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập</label>
              <input className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow" placeholder="Tên đăng nhập cần kích hoạt" required type="text" value={username} onChange={(e) => setUsername(e.target.value)} disabled={loading} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label><input className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow" required type="date" value={dob} onChange={(e) => setDob(e.target.value)} disabled={loading}/></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Số CMND/CCCD</label><input className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow" placeholder="Nhập 9 hoặc 12 số" required type="text" value={idCard} onChange={(e) => setIdCard(e.target.value)} disabled={loading}/></div>
            </div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu mới (tối thiểu 6 ký tự)</label><input className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow" placeholder="Nhập mật khẩu mới" required type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled={loading}/></div>
             <div><label className="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu mới</label><input className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow" placeholder="Nhập lại mật khẩu mới" required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={loading}/></div>
            {error && <p className="text-red-500 text-sm text-center py-1">{error}</p>}
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={() => setModal(null)} disabled={loading} className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors disabled:opacity-50">Quay lại</button>
              <button type="submit" disabled={loading} className="flex-1 px-4 py-2.5 bg-green-600 rounded-md text-white hover:bg-green-700 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-wait flex items-center justify-center">
                {loading ? <RiLoader4Line className="animate-spin text-xl" /> : 'Kích hoạt'}
              </button>
            </div>
          </form>
        ) : ( // Hiển thị thông báo thành công
          <div className="text-center">
            <p className="text-green-600 mb-6 font-medium">{success}</p>
            <button onClick={() => setModal('login')} className="w-full px-4 py-2.5 bg-blue-600 rounded-md text-white hover:bg-blue-700 text-sm font-medium transition-colors">
              Đi đến Đăng nhập
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default KichHoatModal; // Export tên mới