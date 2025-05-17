// src/loadings/AiGeneratingLoader.jsx
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
`;

const LoaderWrapper = styled.div`
  height: 100vh;
  background: #f2f8ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Dots = styled.div`
  display: flex;
  gap: 10px;
`;

const Dot = styled.div`
  width: 18px;
  height: 18px;
  background-color: #4a90e2;
  border-radius: 50%;
  animation: ${bounce} 0.6s infinite;
  animation-delay: ${({ delay }) => delay};
`;

const Message = styled.p`
  margin-top: 30px;
  font-size: 1.2rem;
  color: #333;
`;

function AiGeneratingLoader() {
  return (
    <LoaderWrapper>
      <Dots>
        <Dot delay="0s" />
        <Dot delay="0.2s" />
        <Dot delay="0.4s" />
      </Dots>
      <Message>이력서를 생성 중입니다...</Message>
    </LoaderWrapper>
  );
}

export default AiGeneratingLoader;
