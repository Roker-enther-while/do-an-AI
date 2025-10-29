// backend/services/chatbotService.js
async function getBotResponse(userMessage, username) {
  console.log(`User (${username}) asked: ${userMessage}`);
  const lowerCaseMessage = userMessage.toLowerCase();
  // Simple keyword logic (replace with actual AI/NLU service call)
  if (lowerCaseMessage.includes('lịch học')) return `Chào ${username}, bạn muốn xem lịch học của ngày nào?`;
  if (lowerCaseMessage.includes('môn học')) return `Bạn muốn tìm thông tin môn học nào?`;
  if (lowerCaseMessage.includes('chào')) return `Chào bạn ${username}! Tôi có thể giúp gì?`;
  return `Xin lỗi ${username}, tôi chưa hiểu.`;
}
module.exports = { getBotResponse };