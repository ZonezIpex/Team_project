// src/pages/LoginPage.jsx
import styled from 'styled-components';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { users } from '../testUserProfile/users';

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

  const handleLogin = () => {
    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('username', foundUser.username);
      localStorage.setItem('role', foundUser.role || 'user'); // ✅ role이 없으면 기본값 'user'

      // ✅ 관리자이면 어드민 페이지로 이동
      if (foundUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      alert(t.error);
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
