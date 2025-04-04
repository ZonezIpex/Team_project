// src/pages/SignupPage.jsx
import styled from 'styled-components';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

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

  const text = {
    ko: {
      title: '회원가입',
      id: '아이디',
      password: '비밀번호',
      nickname: '닉네임',
      email: '이메일',
      signup: '회원가입',
      toLogin: '로그인 페이지로',
    },
    en: {
      title: 'Sign Up',
      id: 'ID',
      password: 'Password',
      nickname: 'Nickname',
      email: 'Email',
      signup: 'Sign Up',
      toLogin: 'Go to Login',
    },
  };

  const t = text[language || 'ko'];

  return (
    <Wrapper>
      <Header language={language} onChangeLanguage={onChangeLanguage} />
      <JoinSection>
        <JoinBox>
          <h2>{t.title}</h2>
          <Input type="text" placeholder={t.id} />
          <Input type="password" placeholder={t.password} />
          <Input type="text" placeholder={t.nickname} />
          <Input type="email" placeholder={t.email} />
          <PrimaryButton>{t.signup}</PrimaryButton>
          <SecondaryButton onClick={() => navigate('/login')}>
            {t.toLogin}
          </SecondaryButton>
        </JoinBox>
      </JoinSection>
    </Wrapper>
  );
}

export default SignupPage;
