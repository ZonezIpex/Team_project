import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';

// 예: 로그인 API 호출
export const login = async (username, password) => {
    try {
        const response = await api.post('/api/auth/login', { username, password });
        const token = response.data.token;

        console.log("Server Response:", response.data);
        localStorage.setItem('token', token); // 토큰 저장

        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);

        return { token, isAdmin: decoded.isAdmin };
    } catch (error) {
        console.error("Login error:", error);
        throw new Error("Login failed");
    }
};

export const logout = () => {
    localStorage.removeItem('token'); // 토큰 제거 키 일관화
};

export const register = async (email, password, name) => {
    try {
        await api.post('/api/user/register', { email, password, name });
    } catch (error) {
        console.error("Registration error:", error);
        throw new Error("Failed to register");
    }
};

export const getIsAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        console.log("Decoded Token:", decoded);
        return decoded.isAdmin === true; // 토큰에서 isAdmin 값을 확인
    } catch (error) {
        console.error('Failed to decode token:', error);
        return false;
    }
};
