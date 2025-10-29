// src/pages/HoSoCaNhan.jsx
import React, { useState, useEffect } from 'react';
import { 
  RiLoader4Line, RiAlertLine, RiCheckboxCircleLine, 
  RiBookOpenLine, RiTimeLine, RiArrowRightSLine, RiArrowDownSLine 
} from 'react-icons/ri';
import { fetchProfile, updateProfile, changePassword } from '../services/api';
import { toast } from 'react-hot-toast';

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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // State MỚI cho Đổi Mật Khẩu
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Hàm load hồ sơ
  const loadProfile = async () => {
      setLoading(true);
      setError('');
      try {
          const response = await fetchProfile();
          setProfile(response.data);
      } catch (err) {
          console.error("Lỗi khi lấy hồ sơ:", err);
          setError("Không thể tải thông tin hồ sơ.");
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  // Hàm xử lý khi thay đổi input (form thông tin)
  const handleChange = (e) => {
      const { name, value } = e.target;
      setProfile(prev => ({ ...prev, [name]: value }));
  };
  
  // Hàm xử lý khi thay đổi input (form mật khẩu)
  const handlePasswordChange = (e) => {
      const { name, value } = e.target;
      setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý Cập nhật thông tin
  const handleUpdateProfile = async (e) => {
      e.preventDefault();
      setIsUpdating(true);
      try {
          const { fullName, email, phone, address } = profile;
          const response = await updateProfile({ fullName, email, phone, address });
          setProfile(response.data.user);
          
          const storedUser = JSON.parse(localStorage.getItem('userInfo')) || {};
          storedUser.fullName = response.data.user.fullName;
          localStorage.setItem('userInfo', JSON.stringify(storedUser));
          // (Cần F5 trang để KhungTrangChinh đọc lại localStorage)
          
          toast.success(response.data.message);
      } catch (err) {
          console.error("Lỗi cập nhật hồ sơ:", err);
          if (err.response && err.response.data && (err.response.data.message || err.response.data.errors)) {
              toast.error(err.response.data.message || err.response.data.errors[0].msg);
          } else {
              toast.error("Cập nhật thất bại.");
          }
      } finally {
          setIsUpdating(false);
      }
  };
  
  // Hàm xử lý Đổi Mật Khẩu
  const handleChangePasswordSubmit = async (e) => {
      e.preventDefault();
      
      if (passwordData.newPassword.length < 6) {
          toast.error("Mật khẩu mới phải có ít nhất 6 ký tự.");
          return;
      }
       if (passwordData.newPassword !== passwordData.confirmPassword) {
           toast.error("Xác nhận mật khẩu mới không khớp.");
           return;
       }
       
      setIsChangingPassword(true);
      try {
          const response = await changePassword(passwordData);
          toast.success(response.data.message);
          setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
          setShowChangePassword(false);
      } catch (err) {
           console.error("Lỗi đổi mật khẩu:", err);
           if (err.response && err.response.data && (err.response.data.message || err.response.data.errors)) {
              toast.error(err.response.data.message || err.response.data.errors[0].msg);
           } else {
              toast.error("Đổi mật khẩu thất bại.");
           }
      } finally {
          setIsChangingPassword(false);
      }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-40"><RiLoader4Line className="animate-spin text-4xl text-blue-600" /></div>;
  }
  if (error) {
    return <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg flex items-center justify-center"><RiAlertLine className="mr-2" /> {error}</div>;
  }
  if (!profile) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cột 1: Thông tin cá nhân & Cài đặt */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Thông tin cá nhân */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Thông Tin Cá Nhân</h3>
          <form className="space-y-4" onSubmit={handleUpdateProfile}>
             <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</label>
                <input name="fullName" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" type="text" value={profile.fullName || ''} onChange={handleChange} disabled={isUpdating} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mã số sinh viên</label>
                <input className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm" readOnly type="text" value={profile.username} />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" type="email" value={profile.email || ''} onChange={handleChange} disabled={isUpdating} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <input name="phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" type="tel" value={profile.phone || ''} onChange={handleChange} disabled={isUpdating} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
              <input name="address" className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm" type="text" value={profile.address || ''} onChange={handleChange} disabled={isUpdating} />
            </div>
            <div className="pt-4">
              <button type="submit" disabled={isUpdating} className="px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 text-sm font-medium disabled:opacity-50 disabled:cursor-wait flex justify-center items-center">
                 {isUpdating ? <RiLoader4Line className="animate-spin text-xl" /> : 'Lưu thay đổi'}
               </button>
            </div>
          </form>
        </div>

        {/* Cài đặt thông báo & Bảo mật */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
           <h3 className="text-xl font-bold text-gray-900 mb-6">Cài Đặt</h3>
           <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Thông Báo</h4>
            <div className="space-y-3">
              <ToggleSwitch label="Thông báo lịch học" description="Nhận thông báo về thay đổi lịch học" />
              <ToggleSwitch label="Thông báo lịch thi" description="Nhắc nhở về lịch thi" />
            </div>
           </div>
           
           <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Bảo Mật</h4>
            <div className="space-y-3">
              <button 
                 onClick={() => setShowChangePassword(!showChangePassword)}
                 className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-900 font-medium">Đổi mật khẩu</span>
                  {showChangePassword ? (
                      <RiArrowDownSLine className="text-gray-400" />
                  ) : (
                      <RiArrowRightSLine className="text-gray-400" />
                  )}
                </div>
              </button>
              
              {showChangePassword && (
                  <form className="space-y-3 pt-4 border-t" onSubmit={handleChangePasswordSubmit}>
                     <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Mật khẩu hiện tại</label>
                        <input 
                           name="currentPassword"
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                           type="password" 
                           placeholder="Nhập mật khẩu hiện tại"
                           value={passwordData.currentPassword}
                           onChange={handlePasswordChange}
                           disabled={isChangingPassword}
                           required
                        />
                     </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Mật khẩu mới</label>
                        <input 
                           name="newPassword"
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                           type="password" 
                           placeholder="Tối thiểu 6 ký tự"
                           value={passwordData.newPassword}
                           onChange={handlePasswordChange}
                           disabled={isChangingPassword}
                           required
                        />
                     </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Xác nhận mật khẩu mới</label>
                        <input 
                           name="confirmPassword"
                           className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" 
                           type="password" 
                           placeholder="Nhập lại mật khẩu mới"
                           value={passwordData.confirmPassword}
                           onChange={handlePasswordChange}
                           disabled={isChangingPassword}
                           required
                        />
                     </div>
                     <div className="pt-2">
                         <button 
                            type="submit" 
                            disabled={isChangingPassword}
                            className="px-5 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 text-sm font-medium disabled:opacity-50 disabled:cursor-wait flex justify-center items-center"
                         >
                            {isChangingPassword ? <RiLoader4Line className="animate-spin text-xl" /> : 'Xác nhận đổi'}
                         </button>
                     </div>
                  </form>
              )}
              
            </div>
           </div>
        </div>
      </div>

      {/* Cột 2: Thông tin học tập (Dữ liệu mẫu) */}
      <div className="space-y-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Tiến Độ Học Tập</h3>
          {/* (Dữ liệu này cần API riêng) */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-blue-50 p-4 rounded-xl">
               <RiCheckboxCircleLine className="text-blue-600 text-3xl mx-auto mb-2" />
               <span className="text-2xl font-bold text-blue-600">78</span>
               <p className="text-sm text-gray-600">Tín chỉ đã hoàn thành</p>
            </div>
             <div className="bg-green-50 p-4 rounded-xl">
               <RiBookOpenLine className="text-green-600 text-3xl mx-auto mb-2" />
               <span className="text-2xl font-bold text-green-600">18</span>
               <p className="text-sm text-gray-600">Tín chỉ học kỳ này</p>
            </div>
             <div className="bg-orange-50 p-4 rounded-xl">
               <RiTimeLine className="text-orange-600 text-3xl mx-auto mb-2" />
               <span className="text-2xl font-bold text-orange-600">42</span>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default HoSoCaNhan;