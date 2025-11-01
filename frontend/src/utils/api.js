/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * API Client - Centralized HTTP client for backend communication
 */

import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 
           (import.meta.env.PROD ? '/api' : 'http://localhost:3000/api'),
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const auth = {
  register: async (userData) => {
    return await api.post('/users/register', userData);
  },
  login: async (credentials) => {
    return await api.post('/users/login', credentials);
  },
  requestMagicCode: async (phoneNumber) => {
    return await api.post('/auth/request-code', { phoneNumber });
  },
  verifyMagicCode: async (phoneNumber, code) => {
    return await api.post('/auth/verify-code', { phoneNumber, code });
  },
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

// Admin API
export const admin = {
  getAllUsers: () => api.get('/users/admin/all'),
  updateUserRole: (userId, roleData) => api.put(`/users/admin/${userId}/role`, roleData),
};

// Rocks API
export const rocks = {
  getAll: (params = {}) => api.get('/rocks', { params }),
  getById: (id) => api.get(`/rocks/${id}`),
  create: (rockData) => api.post('/rocks', rockData),
  update: (id, rockData) => api.put(`/rocks/${id}`, rockData),
  delete: (id) => api.delete(`/rocks/${id}`),
  like: (id) => api.post(`/rocks/${id}/like`),
  comment: (id, comment) => api.post(`/rocks/${id}/comments`, { text: comment }),
  search: (params) => api.get('/rocks/search', { params }),
};

// Hunts API
export const hunts = {
  getAll: (params = {}) => api.get('/hunts', { params }),
  getById: (id) => api.get(`/hunts/${id}`),
  create: (huntData) => api.post('/hunts', huntData),
  join: (id) => api.post(`/hunts/${id}/join`),
  leave: (id) => api.post(`/hunts/${id}/leave`),
  markFound: (huntId, rockId) => api.post(`/hunts/${huntId}/rocks/${rockId}/found`),
};

// Achievements API
export const achievements = {
  getAll: () => api.get('/achievements'),
  getUserAchievements: (userId) => api.get(`/users/${userId}/achievements`),
};

// Health check
export const health = {
  check: () => api.get('/health'),
};

export default api;