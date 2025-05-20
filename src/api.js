import axios from 'axios';
import { isTokenExpired } from './utils/token'; // Import from your utility file

const API = axios.create({
    baseURL: 'http://localhost:8080',
});

// Request interceptor
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        if (isTokenExpired(token)) { // Using the imported utility
            localStorage.removeItem('token');
            window.location.href = '/login?session_expired=true';
            return Promise.reject(new Error('Session expired'));
        }
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Response interceptor (no changes needed here)
API.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized responses
        if (error.response?.status === 401 && !originalRequest._retry) {
            localStorage.removeItem('token');
            window.location.href = '/login?session_expired=true';
        }

        // Handle token expiration during response
        if (error.response?.data?.message?.includes('expired')) {
            localStorage.removeItem('token');
            window.location.href = '/login?session_expired=true';
        }

        return Promise.reject(error);
    }
);

export default API;