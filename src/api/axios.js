import axios from 'axios';

const api = axios.create({
     baseURL: 'http://sarm-server.duckdns.org:8888', // 서버 주소
    //baseURL: 'http://localhost:8888', //로컬
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
export default api;