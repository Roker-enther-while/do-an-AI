// src/components/QuenMatKhauModal.jsx
import React, { useState } from 'react';
import { RiCloseLine, RiMailSendLine, RiLoader4Line } from 'react-icons/ri';
import { forgotPasswordRequest } from '../services/api';

function QuenMatKhauModal({ setModal }) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // State để hiển thị thông báo thành công trong modal

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset lỗi cũ
    setSuccess(''); // Reset thông báo thành công cũ
    setLoading(true);
    try {
      const response = await forgotPasswordRequest(emailOrUsername); // Gọi API
      if (response.data.success) {
        // toast.success(response.data.message || 'Yêu cầu đã được gửi!'); // Tùy chọn: Dùng toast
        setSuccess(response.data.message || 'Nếu thông tin hợp lệ, hướng dẫn sẽ được gửi.'); // Hiển thị trong modal
        setEmailOrUsername(''); // Xóa input sau khi thành công
      }
    } catch (err) {
      console.error("Lỗi quên mật khẩu:", err);
      // Hiển thị lỗi từ backend hoặc lỗi chung
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.errors) { // Xử lý lỗi validation nếu có
          setError(err.response.data.errors[0].msg);
      }
      else {
        setError('Gửi yêu cầu thất bại. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // Nền mờ và căn giữa modal
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      {/* Khung modal */}
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-md relative animate-slide-in-down">
        {/* Nút đóng */}
        <button
          onClick={() => !loading && setModal(null)} // Chỉ đóng khi không loading
          disabled={loading}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl p-1 rounded-full transition-colors disabled:cursor-not-allowed"
        >
          <RiCloseLine />
        </button>

        {/* Tiêu đề và Icon */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <RiMailSendLine className="text-3xl" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Quên Mật Khẩu</h2>
          <p className="text-gray-500 text-sm mt-1">Nhập Tên đăng nhập hoặc Email của bạn</p>
        </div>

        {/* Hiển thị Form hoặc Thông báo thành công */}
        {!success ? (
          // Form quên mật khẩu
          <form className="space-y-4" onSubmit={handleForgotSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tên đăng nhập hoặc Email</label>
              <input
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition-shadow"
                placeholder="Nhập Tên đăng nhập hoặc Email"
                required
                type="text" // Cho phép nhập cả username và email
                value={emailOrUsername}
                onChange={(e) => setEmailOrUsername(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Hiển thị lỗi */}
            {error && <p className="text-red-500 text-sm text-center py-1">{error}</p>}

            {/* Nút Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setModal(null)} // Quay lại
                disabled={loading}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm font-medium transition-colors disabled:opacity-50"
              >
                Quay lại
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2.5 bg-yellow-500 rounded-md text-white hover:bg-yellow-600 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-wait flex items-center justify-center"
              >
                {loading ? <RiLoader4Line className="animate-spin text-xl" /> : 'Gửi yêu cầu'}
              </button>
            </div>
          </form>
        ) : (
          // Thông báo thành công
          <div className="text-center">
            <p className="text-green-600 mb-6 font-medium">{success}</p>
            <button
              onClick={() => setModal('login')} // Nút quay lại đăng nhập
              className="w-full px-4 py-2.5 bg-blue-600 rounded-md text-white hover:bg-blue-700 text-sm font-medium transition-colors"
            >
              Quay lại Đăng nhập
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default QuenMatKhauModal; // Export tên mới