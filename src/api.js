import axios from 'axios';
import { isTokenExpired } from './utils/token';

const API = axios.create({
    baseURL: 'http://localhost:8080',
});

// Request interceptor - handles token expiration before sending requests
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    // Skip check for login endpoint
    if (!config.url.includes('/login')) {
        if (token) {
            if (isTokenExpired(token)) {
                localStorage.removeItem('token');
                // Only redirect if not already on login page
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login?session_expired=true';
                }
                return Promise.reject(new Error('Session expired'));
            }
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor - handles session expiration during API responses
API.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;

        // Handle 401 errors
        if (error.response?.status === 401) {
            // Never redirect for login endpoint errors
            if (!originalRequest.url.includes('/login')) {
                localStorage.removeItem('token');
                // Prevent redundant redirects
                if (!window.location.pathname.includes('/login')) {
                    window.location.href = '/login?session_expired=true';
                }
            }
        }

        // Handle token expiration messages from backend
        if (error.response?.data?.message?.includes('expired')) {
            if (!originalRequest.url.includes('/login')) {
                localStorage.removeItem('token');
                window.location.href = '/login?session_expired=true';
            }
        }

        return Promise.reject(error);
    }
);

export default API;