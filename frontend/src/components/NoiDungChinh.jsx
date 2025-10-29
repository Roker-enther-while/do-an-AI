// src/components/NoiDungChinh.jsx
import React from 'react';
import { RiRobot2Line, RiCalendarCheckLine, RiBookReadLine, RiNotification3Line } from 'react-icons/ri';

// Component Icon (giữ nguyên)
// const FeatureIcon = ({ d }) => ( ... ); // Bạn có thể bỏ nếu không dùng icon SVG tùy chỉnh

function NoiDungChinh() {
  return (
    // Sử dụng màu nền xám nhạt cho toàn bộ nội dung chính
    <div className="bg-gray-50 text-gray-800">

      {/* Section 1: Hero */}
      <section
        className="relative bg-cover bg-center text-center py-20 md:py-32 overflow-hidden" // Thêm overflow-hidden
        // Ảnh nền thư viện
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('https://images.unsplash.com/photo-1596495578065-6f8f78719416?q=80&w=2070&auto=format&fit=crop')"
        }}
      >
        <div className="relative container mx-auto px-4 z-10"> {/* Thêm z-10 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight animate-fade-in-down">
            Quản Lý Lịch Học
            <span className="block text-indigo-300 mt-1 md:mt-2">Thông Minh & Hiệu Quả</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            EduBot - Trợ lý AI cá nhân hóa giúp sinh viên dễ dàng sắp xếp lịch học, đăng ký môn học và quản lý thời gian hiệu quả hơn bao giờ hết.
          </p>
          {/* Nút CTA có thể thêm sau nếu cần */}
          {/* <div className="mt-10 flex justify-center space-x-4 animate-fade-in-up animation-delay-400"> ... </div> */}
        </div>
      </section>

      {/* Section 2: Tính Năng */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Tính Năng Nổi Bật</h2>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá các công cụ mạnh mẽ giúp bạn làm chủ việc học tập.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Card Tính năng 1 */}
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-5 transform transition-transform group-hover:scale-110">
                <RiCalendarCheckLine className="text-3xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Quản Lý Lịch Học</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Xem thời khóa biểu trực quan, theo dõi môn học, giảng viên và phòng học.</p>
            </div>
            {/* Card Tính năng 2 */}
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-5 transform transition-transform group-hover:scale-110">
                <RiBookReadLine className="text-3xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Đăng Ký Môn Học</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Tìm kiếm, đăng ký hoặc hủy môn học nhanh chóng, kiểm tra sĩ số.</p>
            </div>
            {/* Card Tính năng 3 */}
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-5 transform transition-transform group-hover:scale-110">
                <RiRobot2Line className="text-3xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Chatbot Thông Minh</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Tương tác tự nhiên để nhận hỗ trợ, tra cứu thông tin và thực hiện tác vụ.</p>
            </div>
            {/* Card Tính năng 4 */}
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-5 transform transition-transform group-hover:scale-110">
                <RiNotification3Line className="text-3xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Thông Báo Tự Động</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Nhận nhắc nhở về lịch học, lịch thi, sự kiện quan trọng và thay đổi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Cách Hoạt Động */}
      <section className="py-16 md:py-20 bg-gradient from-gray-50 to-white"> {/* Thêm gradient nhẹ */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Bắt Đầu Dễ Dàng Chỉ Với 3 Bước</h2>
          </div>
          {/* Quy trình các bước */}
          <div className="relative flex flex-col md:flex-row justify-center items-start md:items-stretch max-w-5xl mx-auto space-y-10 md:space-y-0 md:space-x-8">
            {/* Đường nối */}
            <div className="hidden md:block absolute top-8 left-0 right-0 mx-auto w-2/3 h-1 bg-indigo-200 rounded-full transform translate-y-px"></div>
            {/* Bước 1 */}
            <div className="flex flex-col items-center text-center max-w-xs z-10 flex-1">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient from-indigo-500 to-blue-600 text-blue rounded-full text-2xl font-bold mb-4 shadow-lg ring-4 ring-blue">1</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Đăng Nhập / Đăng Ký</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Truy cập hệ thống bằng tài khoản của bạn hoặc tạo tài khoản mới nhanh chóng.</p>
            </div>
            {/* Bước 2 */}
            <div className="flex flex-col items-center text-center max-w-xs z-10 flex-1">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient from-indigo-500 to-blue-600 text-blue rounded-full text-2xl font-bold mb-4 shadow-lg ring-4 ring-blue">2</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Tương Tác Chatbot</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Sử dụng cửa sổ chat để hỏi đáp, xem lịch, đăng ký môn và nhiều hơn nữa.</p>
            </div>
            {/* Bước 3 */}
            <div className="flex flex-col items-center text-center max-w-xs z-10 flex-1">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient from-indigo-500 to-blue-600 text-blue rounded-full text-2xl font-bold mb-4 shadow-lg ring-4 ring-blue">3</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Quản Lý Thông Tin</h3>
              <p className="text-gray-600 text-sm leading-relaxed">Cập nhật hồ sơ, theo dõi lịch học cá nhân và nhận thông báo quan trọng.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
export default NoiDungChinh; // Export tên mới

