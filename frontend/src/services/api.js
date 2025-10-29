// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Địa chỉ backend
  headers: { 'Content-Type': 'application/json' },
});

// Tự động thêm token vào header nếu đã đăng nhập
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Auth ---
export const loginUser = (username, password) => apiClient.post('/auth/login', { username, password });
export const registerUser = (userData) => apiClient.post('/auth/register', userData); // { username, password, fullName?, email? }
export const activateUser = (data) => apiClient.post('/auth/activate', data);
export const forgotPasswordRequest = (emailOrUsername) => apiClient.post('/auth/forgot-password', { emailOrUsername });

// --- Courses ---
export const fetchCourses = () => apiClient.get('/courses');
export const registerCourse = (courseCode) => apiClient.post(`/courses/register/${courseCode}`);
export const unregisterCourse = (courseCode) => apiClient.delete(`/courses/unregister/${courseCode}`);
export const fetchCourseDetail = (courseCode) => apiClient.get(`/courses/${courseCode}`);

// --- Schedule ---
export const fetchSchedule = () => apiClient.get('/schedule');

// --- Notifications ---
export const fetchNotifications = () => apiClient.get('/notifications');
export const markNotificationRead = (id) => apiClient.put(`/notifications/read/${id}`);
export const deleteNotification = (id) => apiClient.delete(`/notifications/${id}`);

// --- Profile ---
export const fetchProfile = () => apiClient.get('/profile');
export const updateProfile = (profileData) => apiClient.put('/profile', profileData);
export const changePassword = (passwords) => apiClient.put('/profile/change-password', passwords);

// --- Chat ---
export const fetchChatHistory = () => apiClient.get('/chat/history');
export const sendChatMessage = (userMessage) => apiClient.post('/chat/message', { userMessage });

export default apiClient;