// src/loadings/FileScanningLoader.jsx
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e0f4ff;
  text-align: center;
`;

const Spinner = styled.div`
  width: 80px;
  height: 80px;
  border: 8px solid #d3eefa;
  border-top: 8px solid #4aa1e0;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const Message = styled.p`
  margin-top: 20px;
  font-size: 1.2rem;
  color: #444;
`;

function FileScanningLoader() {
  return (
    <LoaderWrapper>
      <Spinner />
      <Message>이력서를 스캔 중입니다...</Message>
    </LoaderWrapper>
  );
}

export default FileScanningLoader;
