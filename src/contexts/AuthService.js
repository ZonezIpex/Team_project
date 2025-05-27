import api from '../api/axios'; // axios 인스턴스 (withCredentials: true 포함)

// 로그인 (세션 생성)
export const login = async (username, password) => {
  const response = await api.post('/api/auth/login', {
    username,
    password,
  });

  // 백엔드에서 { isAdmin: true/false } 형태로 응답한다고 가정
  return response.data; // { isAdmin: true }
};

// 로그아웃 (세션 삭제)
export const logout = async () => {
  await api.post('/api/auth/logout');
};

// 회원가입
export const register = async (email, password, name) => {
  const response = await api.post('/api/user/register', {
    email,
    password,
    name,
  });

  if (!response.status.toString().startsWith('2')) {
    throw new Error(`Failed to register: ${response.status}`);
  }
};

// 관리자 여부 확인 (선택적으로 사용)
export const getIsAdmin = async () => {
  try {
    const response = await api.get('/api/auth/check');
    return response.data.isAdmin === true;
  } catch (error) {
    console.error('Admin check failed:', error);
    return false;
  }
};
