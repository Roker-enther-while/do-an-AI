// src/components/MainContent.jsx
import React from 'react';

// Icon
const FeatureIcon = ({ d }) => (
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
    </svg>
);

function MainContent() {
    return (
        <div className="bg-white text-gray-800">

            {/* ============================================== */}
            {/* Section 1: Hero (ĐÃ CẬP NHẬT ẢNH NỀN MỚI) */}
            {/* ============================================== */}
            <section
                className="relative bg-cover bg-center text-center"

                // ↓↓↓ THAY ĐỔI Ở ĐÂY - ẢNH HỌC SINH ĐỌC SÁCH TRONG THƯ VIỆN, MÀU XANH NƯỚC BIỂN NHẸ ↓↓↓
                style={{
                    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1596495578065-6f8f78719416?q=80&w=2070&auto=format&fit=crop')"
                }}
            >
                <div className="relative container mx-auto px-4 py-20 md:py-32">

                    <h1 className="text-4xl md:text-6xl font-extrabold text-white">
                        Quản Lý Lịch Học
                        <span className="block text-indigo-300">Thông Minh</span>
                    </h1>

                    <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Trợ lý AI cá nhân hóa giúp sinh viên sắp xếp lịch học, đăng ký môn học và quản lý thời gian hiệu quả với công nghệ chatbot tiên tiến.
                    </p>

                    <div className="mt-8 flex justify-center space-x-4">
                        <a
                            href="#"
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
                        >
                            Bắt Đầu Ngay
                        </a>
                        <a
                            href="#"
                            className="bg-white text-gray-800 px-6 py-3 rounded-lg text-lg font-medium border border-gray-300 hover:bg-gray-100 transition-colors"
                        >
                            Tìm Hiểu Thêm
                        </a>
                    </div>
                </div>
            </section>

            {/* ============================================== */}
            {/* CÁC SECTION KHÁC GIỮ NGUYÊN */}
            {/* ============================================== */}

            {/* Section 2: Tính Năng Nổi Bật */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Tính Năng Nổi Bật</h2>
                        <p className="mt-2 text-lg text-gray-600">
                            EduBot mang đến giải pháp quản lý học tập toàn diện với công nghệ AI tiên tiến
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full mb-4">
                                <FeatureIcon d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Quản Lý Thời Khóa Biểu</h3>
                            <p className="text-gray-600">Hiển thị lịch học cá nhân, theo dõi môn học và giảng viên một cách trực quan và dễ dàng.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full mb-4">
                                <FeatureIcon d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Chatbot Thông Minh</h3>
                            <p className="text-gray-600">Tương tác bằng ngôn ngữ tự nhiên để đăng ký môn học, tra cứu thông tin và nhận hỗ trợ 24/7.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full mb-4">
                                <FeatureIcon d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Thông Báo Tự Động</h3>
                            <p className="text-gray-600">Nhận thông báo về lịch học, lịch thi, hạn chót đăng ký và các thay đổi quan trọng.</p>
                        </div>
                        {/* Feature 4 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full mb-4">
                                <FeatureIcon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Tra Cứu Môn Học</h3>
                            <p className="text-gray-600">Tìm kiếm thông tin chi tiết về môn học, tín chỉ, giảng viên và địa điểm học tập.</p>
                        </div>
                        {/* Feature 5 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full mb-4">
                                <FeatureIcon d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Kiểm Tra Xung Đột</h3>
                            <p className="text-gray-600">Tự động phát hiện và cảnh báo xung đột lịch học khi đăng ký môn học mới.</p>
                        </div>
                        {/* Feature 6 */}
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-full mb-4">
                                <FeatureIcon d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Cá Nhân Hóa</h3>
                            <p className="text-gray-600">Trải nghiệm được tùy chỉnh theo từng sinh viên với dữ liệu học tập cá nhân.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Cách Thức Hoạt Động */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Cách Thức Hoạt Động</h2>
                        <p className="mt-2 text-lg text-gray-600">
                            Quy trình đơn giản để bắt đầu sử dụng EduBot
                        </p>
                    </div>
                    <div className="relative flex flex-col md:flex-row justify-between items-center max-w-4xl mx-auto">
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-300 -translate-y-1/2 -z-10"></div>
                        <div className="flex flex-col items-center text-center max-w-xs z-10 bg-white px-4">
                            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full text-2xl font-bold mb-4">1</div>
                            <h3 className="text-xl font-semibold mb-2">Đăng Nhập</h3>
                            <p className="text-gray-600">Sử dụng mã số sinh viên để đăng nhập và xác thực tài khoản của bạn.</p>
                        </div>
                        <div className="flex flex-col items-center text-center max-w-xs z-10 bg-white px-4 mt-8 md:mt-0">
                            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full text-2xl font-bold mb-4">2</div>
                            <h3 className="text-xl font-semibold mb-2">Tương Tác</h3>
                            <p className="text-gray-600">Chat với EduBot bằng ngôn ngữ tự nhiên để thực hiện các tác vụ học tập.</p>
                        </div>
                        <div className="flex flex-col items-center text-center max-w-xs z-10 bg-white px-4 mt-8 md:mt-0">
                            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full text-2xl font-bold mb-4">3</div>
                            <h3 className="text-xl font-semibold mb-2">Quản Lý</h3>
                            <p className="text-gray-600">Theo dõi lịch học, nhận thông báo và quản lý thời gian hiệu quả.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4: CTA (Call to Action) */}
            <section className="bg-indigo-700 text-white">
                <div className="container mx-auto px-4 py-20 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold">Sẵn Sàng Trải Nghiệm EduBot?</h2>
                    <p className="mt-4 text-lg text-indigo-100 max-w-xl mx-auto">
                        Tham gia cùng hàng nghìn sinh viên đã tin tưởng sử dụng EduBot để quản lý học tập hiệu quả.
                    </p>
                    <div className="mt-8">
                        <a
                            href="#"
                            className="bg-white text-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
                        >
                            Đăng Nhập Ngay
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default MainContent;