// src/pages/SignupPage.jsx
import styled from 'styled-components';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Wrapper = styled.div`
  background: linear-gradient(to bottom, #79A7D3, #C3DAF5);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const JoinSection = styled.div`
  flex: 1;
  padding-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JoinBox = styled.div`
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

function SignupPage({ language, onChangeLanguage }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const text = {
    ko: {
      title: '회원가입',
      email: '이메일',
      password: '비밀번호',
      confirm: '비밀번호 재확인',
      nickname: '닉네임',
      signup: '회원가입',
      toLogin: '로그인 페이지로',
      mismatch: '비밀번호가 일치하지 않습니다.',
    },
    en: {
      title: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirm: 'Confirm Password',
      nickname: 'Nickname',
      signup: 'Sign Up',
      toLogin: 'Go to Login',
      mismatch: 'Passwords do not match.',
    },
  };

  const t = text[language || 'ko'];

  const handleSignup = () => {
    if (password !== confirm) {
      alert(t.mismatch);
      return;
    }

    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('username', nickname);
    navigate('/login'); // 로그인 페이지로 이동
  };

  return (
    <Wrapper>
      <Header language={language} onChangeLanguage={onChangeLanguage} />
      <JoinSection>
        <JoinBox>
          <h2>{t.title}</h2>
          <Input type="email" placeholder={t.email} value={email} onChange={e => setEmail(e.target.value)} />
          <Input type="password" placeholder={t.password} value={password} onChange={e => setPassword(e.target.value)} />
          <Input type="password" placeholder={t.confirm} value={confirm} onChange={e => setConfirm(e.target.value)} />
          <Input type="text" placeholder={t.nickname} value={nickname} onChange={e => setNickname(e.target.value)} />
          <PrimaryButton onClick={handleSignup}>{t.signup}</PrimaryButton>
          <SecondaryButton onClick={() => navigate('/login')}>
            {t.toLogin}
          </SecondaryButton>
        </JoinBox>
      </JoinSection>
    </Wrapper>
  );
}

export default SignupPage;
