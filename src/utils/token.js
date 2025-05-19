import { jwtDecode } from 'jwt-decode';

export const getTokenExpiration = (token) => {
    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000; // Convert to milliseconds
    } catch (error) {
        return null;
    }
};

export const isTokenExpired = (token) => {
    const expiration = getTokenExpiration(token);
    return expiration ? Date.now() > expiration : true;
};

// For showing timeout warnings (5 minutes before expiration)
export const getTokenTimeLeft = (token) => {
    const expiration = getTokenExpiration(token);
    if (!expiration) return 0;
    return expiration - Date.now();
};