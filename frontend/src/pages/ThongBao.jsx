// src/pages/ThongBao.jsx
import React, { useState, useEffect } from 'react';
import { 
    RiMedalLine, RiCloseCircleLine, RiLoader4Line, RiAlertLine, 
    RiMailOpenLine, RiDeleteBinLine, RiInformationLine 
} from 'react-icons/ri';
import { fetchNotifications, deleteNotification, markNotificationRead } from '../services/api';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale/vi'; // SỬA LỖI IMPORT
import { toast } from 'react-hot-toast';

const NotificationItem = ({ item, onMarkRead, onDelete }) => {
    const getIcon = () => {
        switch (item.type) {
            case 'new_grade': return <RiMedalLine className="text-green-600 text-xl" />;
            case 'schedule_change': return <RiCloseCircleLine className="text-red-600 text-xl" />;
            default: return <RiInformationLine className="text-blue-600 text-xl" />;
        }
    };
    const getIconBg = () => {
         switch (item.type) {
            case 'new_grade': return 'bg-green-100';
            case 'schedule_change': return 'bg-red-100';
            default: return 'bg-blue-100';
        }
    }
    // Sử dụng try-catch để phòng trường hợp timestamp không hợp lệ
    let timeAgo = "Không rõ thời gian";
    try {
        timeAgo = formatDistanceToNow(new Date(item.timestamp), { addSuffix: true, locale: vi });
    } catch {
        console.error("Invalid timestamp:", item.timestamp);
    }


    return (
      <div className={`bg-white rounded-2xl shadow-sm p-6 transition-all ${item.isRead ? 'opacity-70' : 'border-l-4 border-blue-500'}`}>
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 ${getIconBg()} rounded-full flex items-center justify-center shrink-0`}>
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{item.content}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{timeAgo}</span>
              <div className="flex items-center space-x-3">
                {!item.isRead && (
                   <button onClick={() => onMarkRead(item._id)} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                       <RiMailOpenLine /> Đánh dấu đã đọc
                   </button>
                )}
                <button onClick={() => onDelete(item._id)} className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1">
                    <RiDeleteBinLine /> Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

function ThongBao() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadNotifications = async () => {
      setLoading(true);
      setError('');
      try {
          const response = await fetchNotifications();
          setNotifications(response.data);
      } catch (err) {
          console.error("Lỗi khi lấy thông báo:", err);
          setError("Không thể tải thông báo.");
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const handleMarkRead = async (id) => {
      try {
          await markNotificationRead(id);
          setNotifications(prev => 
              prev.map(n => n._id === id ? { ...n, isRead: true } : n)
          );
          toast.success("Đã đánh dấu đã đọc.");
      } catch  {
          toast.error("Lỗi. Không thể đánh dấu.");
      }
  };

  const handleDelete = async (id) => {
       if (!window.confirm("Bạn có chắc muốn xóa thông báo này?")) return;
      try {
          await deleteNotification(id);
           setNotifications(prev => prev.filter(n => n._id !== id));
          toast.success("Đã xóa thông báo.");
      } catch  {
          toast.error("Lỗi. Không thể xóa.");
      }
  };

  if (loading) {
     return <div className="flex justify-center items-center h-40"><RiLoader4Line className="animate-spin text-4xl text-blue-600" /></div>;
  }
  if (error) {
     return <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg flex items-center justify-center"><RiAlertLine className="mr-2" /> {error}</div>;
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {notifications.length > 0 ? (
          notifications.map(item => (
            <NotificationItem 
                key={item._id} 
                item={item}
                onMarkRead={handleMarkRead}
                onDelete={handleDelete}
            />
          ))
      ) : (
          <div className="text-center text-gray-500 bg-white p-6 rounded-2xl shadow-sm">
               <RiInformationLine className="text-4xl mx-auto mb-4" />
               <p>Bạn không có thông báo nào.</p>
           </div>
      )}
    </div>
  );
}
export default ThongBao;