import React from "react";
import styled from "styled-components";
import Step2Page from './Step2Page';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; // 기존 Header 그대로 사용
import Footer from '../components/Footer'; // 기존 Footer 그대로 사용

const steps = ["이력서\n양식", "신상\n정보", "경력", "수정", "완성"];

export default function ResumeStepIndicator({ currentStep = 0 }) {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Header/>
    <Container>
      <Title>이력서 양식 선택</Title>

      <Stepper>
        {steps.map((step, index) => (
          <Step key={step}>
            <Circle active={index === currentStep}>{step}</Circle>
            {index < steps.length - 1 && <Line />}
          </Step>
        ))}
      </Stepper>

    <div>
      <SectionTitle>이력서 양식 예시</SectionTitle>
      <TemplateGrid>
        {[1, 2, 3].map((n) => (
          <Template key={n}>양식 {n}</Template>
        ))}
        <TemplateAdd>+</TemplateAdd>
      </TemplateGrid>
      </div>

      <div>
      <SectionTitle>최근 사용</SectionTitle>
        <TemplateBox>
          <TemplateGrid>
            {[1, 2, 3].map((n) => (
              <Template key={n} style={{ backgroundColor: "#f1f1f1" }}>
                최근 {n}
              </Template>
            ))}
          </TemplateGrid>
        </TemplateBox>
      </div>

      </Container>
      
      <StepButton>
        <PreButton onClick={() => navigate('/step1Page')}>이전</PreButton>
        <NextButton onClick={() => navigate('/step3Page')}>다음</NextButton>
      </StepButton>
      <Footer/>
    </PageWrapper>
  );
}

// styled-components 정의

const PageWrapper = styled.div`
  background: linear-gradient(to bottom, #88ccf9, #b6e4ff, #d9f3ff, #f1fbff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
  padding: 10px 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  font-family: sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: white;
  margin-top: 100px;
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  text-align: left;
  align-self: flex-start;
  margin-top: 2rem;
  margin-bottom: 1rem;
  border-bottom: 3px solid #176B87;  // 밑줄 추가
  padding-bottom: 0.3rem;             // 밑줄과 텍스트 사이 간격
  width: 30%;                     
`;

const Stepper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div`
  min-width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${props => (props.active ? '#146c94' : 'white')};
  color: ${props => (props.active ? 'white' : '#146c94')};
  border: 3px solid #146c94;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  text-align: center;
  padding: 5px;
  white-space: pre-line;
  box-sizing: border-box;
`;

const Line = styled.div`
  width: 30px;
  height: 5px;
  background-color: #146c94;
  margin-left: -2px;
  margin-right: -2px;
`;

const TemplateBox = styled.div`
  background: rgba(243, 251, 255, 0.8);  // 기존 #aeafb5의 rgba 버전, 투명도 60%
  padding: 20px 70px;
  border-radius: 10px;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
  justify-items: center;
  margin: 0 auto;
  max-width: 800px;
`;

const Template = styled.div`
  width: 100%;
  max-width: 150px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color:rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

const TemplateAdd = styled(Template)`
  border: 2px dashed #aaa;
  font-size: 24px;
  color: #aaa;
  cursor: pointer;
`;

const LinkText = styled.div`
  color: white;
  background-color: #146c94;
  border: 1px solid #146c94;
  border-radius:20px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  padding: 8px 20px;

  &:hover {
    color: #146c94;
    background-color: white;
  }
`;

const PreButton=styled(LinkText)`
    margin-left: 30px;
`;

const NextButton=styled(LinkText)`
    text-align:left;
    margin-right: 30px;
`;

const StepButton = styled.div`
  text-align:center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 50px;
`;