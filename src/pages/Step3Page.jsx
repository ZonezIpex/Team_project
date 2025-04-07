// Step3Page.jsx
import React from "react";
import styled from "styled-components";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Step2Page from './Step2Page';
import Step4 from './Step4';
import { useNavigate } from 'react-router-dom';
import StyledTable from '../components/StepTable'; // ✅ 공통 테이블 스타일 import

const PageWrapper = styled.div`
  background: linear-gradient(to bottom, #88ccf9, #b6e4ff, #d9f3ff, #f1fbff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  font-family: sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: white;
  margin-top: 100px;
  margin-bottom: 30px;
`;

const InputSection = styled.div`
  background-color: white;
  padding: 0 20px 20px 20px;
  border-radius: 20px;
  box-shadow: 3px 3px 10px -3px gray;
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
  background-color: ${props =>
    props.index <= props.currentStep ? '#146c94' : 'white'};
  color: ${props =>
    props.index <= props.currentStep ? 'white' : '#146c94'};
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

const SectionTitle = styled.h4`
  margin-top: 30px;
  text-align: left;
  border-bottom: 1px solid black;
  padding-bottom: 0.3rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
`;
const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;


const Select = styled.select`
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
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
    margin-right: 30px;
`;

const StepButton = styled.div`
  text-align:center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 800px;
  margin-bottom: 50px;
`;

const steps = ["이력서\n양식", "신상\n정보", "경력", "수정", "완성"];
const currentStep = 2; // 현재 단계

const Step3Page = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Header/>
      <Container>
        <Title>경력 입력</Title>
        <Stepper>
          {steps.map((step, index) => (
            <Step key={step}>
              <Circle index={index} currentStep={currentStep}>{step}</Circle>
              {index < steps.length - 1 && <Line />}
            </Step>
          ))}
        </Stepper>

        <InputSection>
          {/* 학력 */}
          <SectionTitle>학력</SectionTitle>
            <StyledTable
              type="education"
              inputComponent={Input}
              selectComponent={Select}
            />

            <SectionTitle>경력</SectionTitle>
            <StyledTable
              type="career"
              inputComponent={Input}
              selectComponent={Select}
            />

            <SectionTitle>자격증</SectionTitle>
            <StyledTable
              type="certificate"
              inputComponent={Input}
              selectComponent={Select}
            />

            <SectionTitle>외국어</SectionTitle>
            <StyledTable
              type="language"
              inputComponent={Input}
              selectComponent={Select}
            />

        </InputSection>
      </Container>

      <StepButton>
        <PreButton onClick={() => navigate('/step2Page')}>이전</PreButton>
        <NextButton onClick={() => navigate('/step4')}>다음</NextButton>
      </StepButton>

      <Footer/>
    </PageWrapper>
  );
};

export default Step3Page;
