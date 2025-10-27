// src/pages/TroGiup.jsx
import React, { useState } from 'react';
import {
    RiQuestionLine,
    RiArrowDownSLine,
    RiMailLine,
    RiChat1Line,
    RiPhoneLine,
    RiTimeLine
} from 'react-icons/ri';

// Component cho một mục FAQ
const FaqItem = ({ category, question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded mb-2 font-medium">
                            {category}
                        </span>
                        <h3 className="font-semibold text-gray-900">{question}</h3>
                    </div>
                    <RiArrowDownSLine className={`text-gray-400 text-xl ml-4 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>
            {/* Phần trả lời */}
            {isOpen && (
                <div className="px-6 pb-4 pt-2 text-gray-600 text-sm border-t">
                    <p>{answer || "Đây là câu trả lời mẫu..."}</p>
                </div>
            )}
        </div>
    );
};

// Dữ liệu FAQ mẫu (bạn sẽ thay thế bằng dữ liệu thật)
const faqData = [
    { category: "Đăng nhập", question: "Làm sao để đăng nhập vào hệ thống?", answer: "Bạn sử dụng Mã số sinh viên và mật khẩu đã được cấp hoặc đã tạo để đăng nhập." },
    { category: "Đăng nhập", question: "Tôi quên mật khẩu, phải làm sao?", answer: "Nhấp vào nút 'Quên mật khẩu?' trên màn hình đăng nhập và làm theo hướng dẫn." },
    { category: "Đăng ký môn học", question: "Làm sao để đăng ký môn học?", answer: "Bạn có thể sử dụng chức năng chat với EduBot hoặc vào mục 'Môn Học' để tìm và đăng ký." },
    { category: "Đăng ký môn học", question: "Tôi có thể đăng ký tối đa bao nhiêu tín chỉ?", answer: "Số tín chỉ tối đa phụ thuộc vào quy định của nhà trường, thường là khoảng 24 tín chỉ mỗi học kỳ." },
    { category: "Đăng ký môn học", question: "Làm sao để hủy môn học đã đăng ký?", answer: "Trong thời gian cho phép, bạn có thể hủy môn học thông qua EduBot hoặc mục 'Môn Học'." },
    { category: "Thời khóa biểu", question: "Làm sao để xem thời khóa biểu?", answer: "Truy cập mục 'Lịch Học' trên thanh điều hướng bên trái." },
    { category: "Thời khóa biểu", question: "Tôi có thể xuất lịch học ra file không?", answer: "Hiện tại hệ thống chưa hỗ trợ xuất file, bạn có thể chụp ảnh màn hình." },
    { category: "Thời khóa biểu", question: "Làm sao biết khi nào có thay đổi lịch học?", answer: "Hệ thống sẽ gửi thông báo tự động khi có thay đổi. Hãy đảm bảo bạn đã bật thông báo." },
    { category: "Chatbot", question: "EduBot có thể giúp tôi những gì?", answer: "EduBot có thể giúp bạn xem lịch học, đăng ký/hủy môn, tra cứu thông tin, nhận thông báo..." },
    { category: "Chatbot", question: "Làm sao để sử dụng EduBot hiệu quả?", answer: "Hãy sử dụng ngôn ngữ tự nhiên, rõ ràng và cung cấp đủ thông tin cần thiết (ví dụ: mã môn học)." },
    { category: "Thông báo", question: "Làm sao để tắt thông báo?", answer: "Bạn có thể vào mục 'Hồ Sơ Cá Nhân' -> 'Cài Đặt' để tùy chỉnh các loại thông báo muốn nhận." },
    { category: "Thông báo", question: "Tôi không nhận được thông báo qua email?", answer: "Kiểm tra lại cài đặt thông báo và địa chỉ email trong hồ sơ của bạn. Đảm bảo email không bị vào mục Spam." },
    { category: "Kỹ thuật", question: "Tôi gặp lỗi khi sử dụng hệ thống?", answer: "Vui lòng liên hệ bộ phận hỗ trợ qua email hoặc hotline kèm theo mô tả lỗi và ảnh chụp màn hình (nếu có)." },
    { category: "Kỹ thuật", question: "Hệ thống hỗ trợ những trình duyệt nào?", answer: "EduBot hoạt động tốt nhất trên các trình duyệt hiện đại như Chrome, Firefox, Safari, Edge phiên bản mới nhất." },
];

function TroGiup() {
    const [selectedCategory, setSelectedCategory] = useState('Tất cả');
    const categories = ["Tất cả", "Đăng nhập", "Đăng ký môn học", "Thời khóa biểu", "Chatbot", "Thông báo", "Kỹ thuật"];

    const filteredFaqs = selectedCategory === 'Tất cả'
        ? faqData
        : faqData.filter(faq => faq.category === selectedCategory);

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
                <RiQuestionLine className="text-5xl text-blue-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Trung Tâm Hỗ Trợ</h2>
                <p className="text-gray-600">Tìm câu trả lời cho các câu hỏi thường gặp về EduBot</p>
            </div>

            {/* Thông tin liên hệ */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {/* Email */}
                <div className="bg-white rounded-xl shadow-sm p-6 flex items-start space-x-4 border border-gray-100">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                        <RiMailLine className="text-2xl" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email Hỗ Trợ</h3>
                        <p className="text-sm text-gray-600 mb-2">Gửi email cho chúng tôi</p>
                        <a href="mailto:support@edubot.edu.vn" className="text-blue-600 text-sm font-medium hover:underline">support@edubot.edu.vn</a>
                    </div>
                </div>
                {/* Hotline */}
                <div className="bg-white rounded-xl shadow-sm p-6 flex items-start space-x-4 border border-gray-100">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 shrink-0">
                        <RiPhoneLine className="text-2xl" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Hotline</h3>
                        <p className="text-sm text-gray-600 mb-2">Gọi điện trực tiếp</p>
                        <span className="text-gray-900 text-sm font-medium">1900-xxxx</span>
                    </div>
                </div>
                {/* Giờ Làm Việc */}
                <div className="bg-white rounded-xl shadow-sm p-6 flex items-start space-x-4 border border-gray-100">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 shrink-0">
                        <RiTimeLine className="text-2xl" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Giờ Làm Việc</h3>
                        <p className="text-sm text-gray-600">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                        <p className="text-sm text-gray-600">Thứ 7: 8:00 - 12:00</p>
                    </div>
                </div>
            </div>

            {/* Bộ lọc FAQ */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-2 justify-center">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === category
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 border'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Danh sách FAQ */}
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Câu Hỏi Thường Gặp</h2>
            <div className="space-y-4 mb-12">
                {filteredFaqs.map((faq, index) => (
                    <FaqItem key={index} category={faq.category} question={faq.question} answer={faq.answer} />
                ))}
            </div>

            {/* Phần Liên hệ cuối */}
            <div className="bg-gradient from-blue-600 to-indigo-600 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Vẫn Cần Hỗ Trợ?</h2>
                <p className="text-blue-100 mb-6 max-w-lg mx-auto">
                    Nếu bạn không tìm thấy câu trả lời, đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp đỡ.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="mailto:support@edubot.edu.vn" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                        <RiMailLine />
                        <span>Gửi Email</span>
                    </a>
                    {/* Nút Chat với EduBot */}
                    <button
                        onClick={() => {
                            // Tạm thời chỉ hiện alert, bạn có thể thay bằng logic mở cửa sổ chat
                            alert("Mở cửa sổ chat với EduBot!");
                        }}
                        className="bg-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors flex items-center justify-center space-x-2">
                        <RiChat1Line />
                        <span>Chat với EduBot</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TroGiup;