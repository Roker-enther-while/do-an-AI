// src/pages/ChiTietMonHoc.jsx
import React from 'react';
import {
    RiBookLine, RiUserLine, RiCalendarLine, RiBookmarkLine,
    RiInformationLine, RiArrowLeftLine
} from 'react-icons/ri';

// Component BookItem (giữ nguyên)
const BookItem = ({ title, author, type }) => (
    <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${type === 'Bắt buộc' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
            <RiBookLine />
        </div>
        <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{title}</h4>
            <p className="text-sm text-gray-600">{author}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${type === 'Bắt buộc' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'} whitespace-nowrap`}>
            {type}
        </span>
    </div>
);

function ChiTietMonHoc({ course, setMonHocChiTiet }) {

    if (!course) {
        return <div className="text-center text-gray-500">Không tìm thấy thông tin môn học.</div>;
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm p-8 max-w-4xl mx-auto">
            {/* Nút Quay Lại */}
            <button
                // Gọi setMonHocChiTiet(null) để quay lại danh sách
                onClick={() => setMonHocChiTiet(null)}
                className="flex items-center text-blue-600 hover:text-blue-700 mb-6 text-sm font-medium"
            >
                <RiArrowLeftLine className="mr-1" /> Quay lại danh sách môn học
            </button>

            {/* Thông tin chung (Lấy từ prop 'course') */}
            <div className="flex items-start justify-between mb-6 border-b pb-6 gap-4"> {/* Thêm gap */}
                <div className="flex-1"> {/* Thêm flex-1 */}
                    <div className="flex items-center space-x-3 mb-2 flex-wrap"> {/* Thêm flex-wrap */}
                        <h2 className="text-2xl font-bold text-gray-900 mr-2">{course.title}</h2> {/* Thêm mr-2 */}
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-semibold whitespace-nowrap">{course.code}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span className="flex items-center"><RiBookmarkLine className="mr-1" /> {course.credits} tín chỉ</span>
                        <span className="flex items-center"><RiUserLine className="mr-1" /> {course.teacher}</span>
                        {/* Kiểm tra nếu có lịch học */}
                        {course.schedule && <span className="flex items-center"><RiCalendarLine className="mr-1" /> {course.schedule}</span>}
                    </div>
                </div>
                {/* Nút Đăng ký */}
                <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition-colors whitespace-nowrap shrink-0"> {/* Thêm shrink-0 */}
                    Đăng ký môn
                </button>
            </div>

            {/* Mô tả môn học */}
            <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <RiInformationLine className="mr-2 text-blue-600" /> Mô Tả Môn Học
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{course.description}</p>
            </div>

            {/* Tài liệu tham khảo */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tài Liệu Tham Khảo</h3>
                <div className="space-y-3">
                    {/* Dữ liệu tài liệu mẫu */}
                    <BookItem title="Object-Oriented Programming in C++" author="Robert Lafore (2019)" type="Bắt buộc" />
                    <BookItem title="Design Patterns: Elements of Reusable Object-Oriented Software" author="Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides (Gang of Four) (2018)" type="Tham khảo" />
                </div>
            </div>
        </div>
    );
}

export default ChiTietMonHoc;