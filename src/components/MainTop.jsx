import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const TopSection = styled.section`
  min-height: 80vh;
  padding: 4vh 5vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  color: white;
  text-align: center;
`;

const Greeting = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 10vh;
  color: #fff7d6;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: bold;
  line-height: 1.5;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
  margin-top: 1rem;
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.8rem);
  font-style: italic;
  margin-top: 2rem;
  color: #f0f0f0;
`;

const ButtonWrapper = styled.div`
  margin-top: 4rem;
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
`;

const WriteButton = styled.button`
  background-color: #007c99;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 40px;
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  min-width: 180px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #005f73;
  }
`;

function MainTop({ language }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const text = {
    ko: {
      title: '이력서 초기 작성 도우미를 통해 \n 작성에 도움을 받으세요',
      subtitle: '나만의 이력서 만들기',
      button: '이력서 작성하기',
      greeting: (name) => `안녕하세요, ${name} 님 👋\n당신의 이력서를 준비해볼까요?`,
    },
    en: {
      title: 'Use the resume assistant\nto start writing easily',
      subtitle: '~Start writing your resume~',
      button: 'Start Resume',
      greeting: (name) => `Hello, ${name}! 👋\nReady to build your resume?`,
    },
  };

  const t = text[language || 'ko'];

  useEffect(() => {
    const name = localStorage.getItem('username');
    if (name) setUsername(name);
  }, []);

  // ✅ 로그인 여부에 따라 버튼 동작
  const handleWriteClick = () => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (isLoggedIn === 'true') {
      navigate('/step1page');
    } else {
      navigate('/login');
    }
  };

  return (
    <TopSection>
      {username && <Greeting>{t.greeting(username)}</Greeting>}
      <Title>{t.title}</Title>
      <Subtitle>{t.subtitle}</Subtitle>
      <ButtonWrapper>
        <WriteButton onClick={handleWriteClick}>{t.button}</WriteButton>
      </ButtonWrapper>
    </TopSection>
  );
}

export default MainTop;
