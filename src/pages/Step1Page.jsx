// src/pages/Step1Page.jsx
import React from "react";
import styled from "styled-components";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";

const steps = ["이력서\n양식", "신상\n정보", "경력", "수정", "완성"];

export default function Step1Page() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Header />
      <Container>
        <Title>이력서 양식 선택</Title>

        <Stepper>
          {steps.map((step, index) => (
            <Step key={step}>
              <Circle active={index === 0}>{step}</Circle>
              {index < steps.length - 1 && <Line />}
            </Step>
          ))}
        </Stepper>

        <Section>
          <SectionTitle>이력서 양식 예시</SectionTitle>
          <TemplateGrid>
            {[1, 2, 3].map((n) => (
              <Template key={n}>양식 {n}</Template>
            ))}
            <TemplateAdd>+</TemplateAdd>
          </TemplateGrid>
        </Section>

        <Section>
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
        </Section>

        <ButtonWrapper>
          <Button onClick={() => navigate('/step2page')}>다음</Button>
        </ButtonWrapper>
      </Container>
      <Footer />
    </PageWrapper>
  );
}

// styled-components
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
  font-family: sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: white;
  margin-top: 100px;
  margin-bottom: 30px;
`;

const Stepper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div`
  min-width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.index !== undefined
      ? props.index <= props.currentStep ? '#146c94' : 'white'
      : props.active ? '#146c94' : 'white'};
  color: ${(props) =>
    props.index !== undefined
      ? props.index <= props.currentStep ? 'white' : '#146c94'
      : props.active ? 'white' : '#146c94'};
  border: 3px solid #146c94;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  text-align: center;
  white-space: pre-line;
  padding: 5px;
  box-sizing: border-box;
`;


const Line = styled.div`
  width: 30px;
  height: 5px;
  background-color: #146c94;
`;

const Section = styled.div`
  width: 100%;
  max-width: 900px;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  text-align: left;
  margin: 2rem 0 1rem 0;
  border-bottom: 3px solid #176B87;
  padding-bottom: 0.3rem;
`;

const TemplateBox = styled.div`
  background: rgba(243, 251, 255, 0.8);
  padding: 20px 70px;
  border-radius: 10px;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
  justify-items: center;
`;

const Template = styled.div`
  width: 100%;
  max-width: 150px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TemplateAdd = styled(Template)`
  border: 2px dashed #aaa;
  font-size: 24px;
  color: #aaa;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 40px;
  margin-bottom: 60px;
`;

const Button = styled.button`
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