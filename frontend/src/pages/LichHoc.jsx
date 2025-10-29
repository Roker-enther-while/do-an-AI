// src/pages/LichHoc.jsx
import React, { useState, useEffect } from 'react';
import { RiCalendarLine, RiMapPinLine, RiTimeLine, RiLoader4Line, RiAlertLine } from 'react-icons/ri';
import { fetchSchedule } from '../services/api';

const ScheduleItem = ({ item }) => {
    const dayColorMap = {
        'Thứ 2': 'bg-blue-100 text-blue-700',
        'Thứ 3': 'bg-green-100 text-green-700',
        'Thứ 4': 'bg-yellow-100 text-yellow-700',
        'Thứ 5': 'bg-orange-100 text-orange-700',
        'Thứ 6': 'bg-indigo-100 text-indigo-700',
        'Thứ 7': 'bg-purple-100 text-purple-700',
        'Chủ nhật': 'bg-red-100 text-red-700',
    };
    const color = dayColorMap[item.dayOfWeek] || 'bg-gray-100 text-gray-700';

    return (
        <div className={`p-6 rounded-2xl shadow-sm ${color} bg-opacity-60`}>
            <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${color}`}>{item.dayOfWeek}</span>
                <span className="text-sm font-medium text-gray-700">{item.type || 'Lịch học'}</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{item.courseName}</h3>
            <div className="space-y-2 text-sm">
                <p className="flex items-center text-gray-700"><RiTimeLine className="mr-2" /> {item.startTime} - {item.endTime}</p>
                <p className="flex items-center text-gray-700"><RiMapPinLine className="mr-2" /> Phòng {item.room}</p>
            </div>
        </div>
    );
};

function LichHoc() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSchedule = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetchSchedule();
        setSchedule(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy lịch học:", err);
        setError('Không thể tải lịch học. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };
    loadSchedule();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <RiLoader4Line className="animate-spin text-4xl text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg flex items-center justify-center">
         <RiAlertLine className="mr-2" /> {error}
      </div>
    );
  }

  if (schedule.length === 0) {
      return (
           <div className="text-center text-gray-500 bg-white p-6 rounded-2xl shadow-sm">
               <RiCalendarLine className="text-4xl mx-auto mb-4" />
               <p>Bạn chưa có lịch học nào.</p>
           </div>
      );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {schedule.map(item => (
        <ScheduleItem key={item._id} item={item} />
      ))}
    </div>
  );
}

export default LichHoc;