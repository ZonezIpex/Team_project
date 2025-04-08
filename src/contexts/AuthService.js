import { jwtDecode } from 'jwt-decode';
const API_URL = 'http://sarm-server.duckdns.org:8888/api/auth';

// 예: 로그인 API 호출
export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, { //도메인 주소
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const data = await response.json();
    console.log("Server Response:", data);
    localStorage.setItem('token', data.token); // 토큰 저장 키 일관화

    try {
        const decoded = jwtDecode(data.token);
        console.log("Decoded Token:", decoded);
        return { token: data.token, isAdmin: decoded.isAdmin }; // 토큰과 isAdmin 반환
    } catch (error) {
        console.error('Failed to decode token:', error);
        throw new Error('Failed to decode token');
    }
};

export const logout = () => {
    localStorage.removeItem('token'); // 토큰 제거 키 일관화
};

export const register = async (email, password, name) => {
    const response = await fetch("http://sarm-server.duckdns.org:8888/api/user/register", { //도메인
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name}),
    });
    if(!response.ok){
        throw new Error("Failed to register: " + response.status);
    }//
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
