import styled from 'styled-components';

const TopSection = styled.section`
  min-height: 100vh;
  padding: 6vh 5vw; /* 패딩 위쪽 여백 조금 줄임 */
  display: flex;
  flex-direction: column;
  justify-content: start; /* 중앙보다 위쪽에 위치하도록 조정 */
  align-items: center;
  color: white;
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: bold;
  line-height: 1.5;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
  margin-top: 10vh; /* 글씨를 살짝 위로 올림 */
`;

const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.8rem);
  font-style: italic;
  margin-top: 1.5rem;
  color: #f0f0f0;
`;

const ButtonWrapper = styled.div`
  margin-top: 3rem;
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
  const text = {
    ko: {
      title: '이력서 초기 작성 도우미를 통해\n작성에 도움을 받으세요',
      subtitle: '~이력서 작성해보세요~',
      button: '이력서 작성하기',
    },
    en: {
      title: 'Use the resume assistant\nto start writing easily',
      subtitle: '~Start writing your resume~',
      button: 'Start Resume',
    },
  };

  return (
    <TopSection>
      <Title>{text[language].title}</Title>
      <Subtitle>{text[language].subtitle}</Subtitle>
      <ButtonWrapper>
        <WriteButton>{text[language].button}</WriteButton>
      </ButtonWrapper>
    </TopSection>
  );
}


export default MainTop;
