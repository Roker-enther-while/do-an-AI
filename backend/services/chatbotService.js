// backend/services/chatbotService.js

// Hàm này sẽ nhận tin nhắn từ người dùng và trả về phản hồi từ bot
// Tạm thời chỉ trả về tin nhắn mẫu
const getBotResponse = async (userMessage, username) => {
  console.log(`Nhận tin nhắn từ ${username}: ${userMessage}`);
  
  // ----- LOGIC CHATBOT THẬT SẼ Ở ĐÂY -----
  // Ví dụ: phân tích ý định, truy vấn DB, gọi model AI,...
  
  // Tạm thời trả lời mẫu
  await new Promise(resolve => setTimeout(resolve, 500)); // Giả lập độ trễ
  
  if (userMessage.toLowerCase().includes('lịch học')) {
    return "Để xem lịch học, bạn vui lòng vào mục 'Lịch Học' nhé.";
  } else if (userMessage.toLowerCase().includes('đăng ký môn')) {
      return "Để đăng ký môn học, bạn có thể tìm kiếm trong mục 'Môn Học' hoặc cho tôi biết mã môn bạn muốn đăng ký.";
  } else {
    return `Tôi nhận được tin nhắn của bạn: "${userMessage}". Hiện tại tôi chưa thể xử lý yêu cầu này.`;
  }
};

module.exports = {
  getBotResponse,
};