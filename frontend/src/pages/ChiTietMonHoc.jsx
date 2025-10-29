// src/pages/ChiTietMonHoc.jsx
import React from 'react';
import {
    RiBookLine, RiUserLine, RiCalendarLine, RiBookmarkLine,
    RiInformationLine, RiArrowLeftLine, RiTimeLine, RiMapPinLine // Thêm icons cho lịch
} from 'react-icons/ri';

// Component BookItem (giữ nguyên)
const BookItem = ({ title, author, type }) => (
    <div className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg bg-gray-50"> {/* Cập nhật style */}
        <div className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 ${type === 'Bắt buộc' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
            <RiBookLine className="text-lg"/> {/* Cập nhật size icon */}
        </div>
        <div className="flex-1 min-w-0"> {/* Thêm min-w-0 */}
            <h4 className="font-semibold text-gray-800 text-sm truncate">{title}</h4> {/* Cập nhật style + truncate */}
            <p className="text-xs text-gray-500 truncate">{author}</p> {/* Cập nhật style + truncate */}
        </div>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${type === 'Bắt buộc' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'} whitespace-nowrap`}>
            {type}
        </span>
    </div>
);

// Component hiển thị một buổi học trong lịch
const ScheduleDetailItem = ({ session }) => (
    <div className="p-3 border border-gray-200 rounded-lg bg-gray-50 text-sm">
        <p className="font-semibold text-gray-800 mb-1">{session.dayOfWeek}</p>
        <div className="flex items-center text-gray-600 text-xs mb-0.5">
            <RiTimeLine className="mr-1.5 shrink-0"/> {session.startTime} - {session.endTime}
        </div>
        <div className="flex items-center text-gray-600 text-xs">
            <RiMapPinLine className="mr-1.5 shrink-0"/> Phòng {session.room}
        </div>
    </div>
);


function ChiTietMonHoc({ course, setMonHocChiTiet }) {

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <RiInformationLine className="text-6xl mb-4 text-gray-400"/>
                <p>Không tìm thấy thông tin môn học.</p>
                <button
                    onClick={() => setMonHocChiTiet(null)}
                    className="mt-4 flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                    <RiArrowLeftLine className="mr-1" /> Quay lại danh sách
                </button>
            </div>
        );
    }

    // --- SỬA CÁC TRƯỜNG Ở ĐÂY ---
    const courseName = course.courseName || "Chưa có tên";
    const courseCode = course.courseCode || "N/A";
    const credits = course.credits || "?";
    const teacherId = course.teacherId || "Chưa xác định";
    const description = course.description || "Chưa có mô tả.";
    // Lịch học chi tiết (là mảng)
    const scheduleDetails = course.schedule || [];
    // -------------------------

    return (
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8 max-w-4xl mx-auto border border-gray-100 animate-fade-in">
            {/* Nút Quay Lại */}
            <button
                onClick={() => setMonHocChiTiet(null)} // Quay lại danh sách
                className="flex items-center text-blue-600 hover:text-blue-700 mb-6 text-sm font-medium transition-colors"
            >
                <RiArrowLeftLine className="mr-1.5" /> Quay lại danh sách môn học
            </button>

            {/* Thông tin chung */}
            <div className="mb-6 border-b border-gray-200 pb-6">
                 <div className="flex items-center space-x-3 mb-2 flex-wrap">
                     <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mr-2">{courseName}</h2>
                     <span className="bg-blue-100 text-blue-700 text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">{courseCode}</span>
                 </div>
                 <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-500 mt-2">
                     <span className="flex items-center"><RiBookmarkLine className="mr-1.5 text-base" /> {credits} tín chỉ</span>
                     <span className="flex items-center"><RiUserLine className="mr-1.5 text-base" /> GV: {teacherId}</span>
                 </div>
            </div>

             {/* Lịch học chi tiết (MỚI) */}
             {scheduleDetails.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <RiCalendarLine className="mr-2 text-green-600" /> Lịch Học Chi Tiết
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {scheduleDetails.map((session, index) => (
                            <ScheduleDetailItem key={index} session={session} />
                        ))}
                    </div>
                </div>
             )}


            {/* Mô tả môn học */}
            <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                    <RiInformationLine className="mr-2 text-blue-600" /> Mô Tả Môn Học
                </h3>
                {/* Sử dụng dangerouslySetInnerHTML nếu description chứa HTML, nếu không thì dùng <p> */}
                {/* <div className="prose prose-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }}></div> */}
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{description}</p>
            </div>

            {/* Tài liệu tham khảo (Giữ nguyên dữ liệu mẫu hoặc thay bằng dữ liệu thật nếu có) */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tài Liệu Tham Khảo</h3>
                <div className="space-y-3">
                    {/* Dữ liệu tài liệu mẫu */}
                    <BookItem title="Object-Oriented Programming in C++" author="Robert Lafore (2019)" type="Bắt buộc" />
                    <BookItem title="Design Patterns: Elements of Reusable Object-Oriented Software" author="Erich Gamma, et al. (Gang of Four) (2018)" type="Tham khảo" />
                    {/* Thêm tài liệu từ `course.references` nếu có */}
                    {/* {course.references && course.references.map((ref, index) => (
                        <BookItem key={index} title={ref.title} author={ref.author} type={ref.type} />
                    ))} */}
                </div>
            </div>
        </div>
    );
}

export default ChiTietMonHoc;