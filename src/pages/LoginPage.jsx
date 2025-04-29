// src/pages/LoginPage.jsx
import styled from 'styled-components';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../contexts/AuthService';
import { useAuth } from '../contexts/AuthContext';

const Wrapper = styled.div`
  background: linear-gradient(to bottom, #79A7D3, #C3DAF5);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const LoginSection = styled.div`
  flex: 1;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  width: 320px;
  text-align: center;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s;
`;

const PrimaryButton = styled(Button)`
  background-color: #5D9CEC;
  color: white;

  &:hover {
    background-color: #4A8CD4;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #D6E9FF;
  color: #5D9CEC;

  &:hover {
    background-color: #BFDDF7;
  }
`;

function LoginPage({ language, onChangeLanguage }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();

  const text = {
    ko: {
      title: '로그인',
      email: '이메일',
      password: '비밀번호',
      login: '로그인',
      signup: '회원 가입',
      error: '이메일 또는 비밀번호가 잘못되었습니다.',
    },
    en: {
      title: 'Login',
      email: 'Email',
      password: 'Password',
      login: 'Login',
      signup: 'Sign Up',
      error: 'Invalid email or password.',
    },
  };

  const t = text[language || 'ko'];

  const handleLogin = async () => {

    try {
      const { token, isAdmin } = await login(email, password); // 서버 요청
      console.log("Token received:", token); // 토큰 값 확인

      if (token) {
        // 로그인 성공 시 JWT 토큰을 localStorage에 저장
        console.log("Saving token to localStorage...");
        localStorage.setItem("token", token); // 토큰 저장
        console.log("Token saved:", localStorage.getItem("token")); // 저장된 토큰 확인
        auth.setUser({ loggedIn: true }); // 상태 업데이트
  
        // ✅ 관리자이면 어드민 페이지로 이동, 아니면 홈으로 이동
        if (isAdmin) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error(error);
      alert(t.error); // 로그인 실패 시 에러 메시지
    }    
};

  return (
    <Wrapper>
      <Header language={language} onChangeLanguage={onChangeLanguage} />
      <LoginSection>
        <LoginBox>
          <h2>{t.title}</h2>
          <Input
            type="email"
            placeholder={t.email}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder={t.password}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <PrimaryButton onClick={handleLogin}>{t.login}</PrimaryButton>
          <SecondaryButton onClick={() => navigate('/signup')}>
            {t.signup}
          </SecondaryButton>
        </LoginBox>
      </LoginSection>
    </Wrapper>
  );
}

export default LoginPage;
