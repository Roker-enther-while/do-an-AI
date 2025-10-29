// src/pages/TroChuyen.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
    RiRobotLine, RiSendPlaneFill, RiTimeLine, RiMapPinLine, 
    RiUserLine, RiLoader4Line, RiAlertLine 
} from 'react-icons/ri';
import { fetchChatHistory, sendChatMessage } from '../services/api';
import { format } from 'date-fns';

const BotMessage = ({ text, time }) => (
    <div className="flex items-start space-x-3">
        <div className="w-10 h-10 bg-gradient from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shrink-0">
             <RiRobotLine className="text-white text-xl" />
        </div>
        <div>
            <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 text-sm text-gray-700 shadow-sm">
                <p>{text}</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">{time}</span>
        </div>
    </div>
);

const UserMessage = ({ text, time }) => (
     <div className="flex items-start space-x-3 justify-end">
         <div className="text-right">
            <div className="bg-blue-600 text-white rounded-2xl rounded-tr-none p-4 text-sm shadow-sm">
                <p>{text}</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">{time}</span>
        </div>
         <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
             <RiUserLine className="text-gray-600 text-xl" />
        </div>
    </div>
);


function TroChuyen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const formatTime = (isoString) => {
      try {
          return format(new Date(isoString), 'HH:mm');
      } catch {
          return "..."
      }
  }

  useEffect(() => {
    const loadHistory = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetchChatHistory();
        setMessages(response.data);
      } catch (err) {
        console.error("Lỗi khi lấy lịch sử chat:", err);
        setError('Không thể tải lịch sử chat.');
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage || isSending) return;

    setIsSending(true);
    setInputMessage('');

    const userMsgOptimistic = { 
        _id: 'temp-user-' + Date.now(),
        messageFrom: 'user', 
        content: trimmedMessage, 
        timestamp: new Date().toISOString() 
    };
    setMessages(prev => [...prev, userMsgOptimistic]);
    
     const typingMsgOptimistic = { 
        _id: 'temp-bot-' + Date.now(),
        messageFrom: 'bot', 
        content: <RiLoader4Line className="animate-spin text-lg" />,
        timestamp: new Date(Date.now() + 100).toISOString() 
    };
    setMessages(prev => [...prev, typingMsgOptimistic]);
    scrollToBottom();

    try {
      const response = await sendChatMessage(trimmedMessage);
      setMessages(prev => [
          ...prev.filter(m => m._id !== typingMsgOptimistic._id),
          response.data
      ]);
    } catch (err) {
      console.error("Lỗi khi gửi tin nhắn:", err);
       setMessages(prev => [
          ...prev.filter(m => m._id !== typingMsgOptimistic._id), 
          {
             _id: 'temp-error-' + Date.now(),
             messageFrom: 'bot',
             content: "Xin lỗi, đã xảy ra lỗi. Vui lòng thử lại.",
             timestamp: new Date().toISOString()
          }
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm h-full flex flex-col">
      <div className="border-b p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shrink-0">
             <RiRobotLine className="text-white text-xl" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">EduBot Assistant</h2>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">Đang hoạt động</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {loading && (
           <div className="flex justify-center items-center h-full">
              <RiLoader4Line className="animate-spin text-4xl text-blue-600" />
           </div>
        )}
        {error && (
            <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg flex items-center justify-center">
                <RiAlertLine className="mr-2" /> {error}
            </div>
        )}
        {!loading && !error && messages.length === 0 && (
             <div className="text-center text-gray-500">
                <p>Bắt đầu cuộc trò chuyện với EduBot!</p>
             </div>
        )}
        
        {messages.map(msg => 
            msg.messageFrom === 'user' ? (
                <UserMessage key={msg._id} text={msg.content} time={formatTime(msg.timestamp)} />
            ) : (
                <BotMessage key={msg._id} text={msg.content} time={formatTime(msg.timestamp)} />
            )
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-6">
        <form className="flex space-x-3" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Nhập tin nhắn cho EduBot..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm disabled:bg-gray-100"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isSending || loading}
          />
          <button
            type="submit"
            disabled={isSending || loading || inputMessage.trim() === ''}
            className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-wait"
          >
            <RiSendPlaneFill />
          </button>
        </form>
      </div>
    </div>
  );
}
export default TroChuyen;