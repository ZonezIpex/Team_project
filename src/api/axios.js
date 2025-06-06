import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8888', // ✅ 로컬 테스트 시 이거 사용
  // baseURL: "http://sarm-server.duckdns.org:8888", // 운영 배포 시 이걸 사용
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log("🔥 보내는 토큰:", token); // 로그 찍어
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default api;
