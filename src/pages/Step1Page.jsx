import React from "react";
import styled from "styled-components";

const steps = ["이력서\n양식", "신상 정보", "경력", "수정", "완성"];

export default function ResumeStepIndicator({ currentStep = 0 }) {
  return (
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

      <SectionTitle>이력서 양식 예시</SectionTitle>
      <TemplateGrid>
        {[1, 2, 3].map((n) => (
          <Template key={n}>양식 {n}</Template>
        ))}
        <TemplateAdd>+</TemplateAdd>
      </TemplateGrid>

      <SectionTitle>최근 사용</SectionTitle>
      <TemplateGrid>
        {[1, 2, 3].map((n) => (
          <Template key={n} style={{ backgroundColor: "#f1f1f1" }}>
            최근 {n}
          </Template>
        ))}
      </TemplateGrid>

      <Footer>
        13916 경기도 안양시 동안구 임곡로 29 대림대학교 | 대표전화: 031-467-4700<br />
        Copyright 학사뉴 ALL RIGHTS RESERVED
      </Footer>
    </Container>
  );
}

// styled-components 정의
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #cce0ff, white);
  padding: 2rem;
  font-family: sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
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
  background-color: #f9f9f9;
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

const Footer = styled.footer`
  font-size: 0.8rem;
  color: #555;
  margin-top: 3rem;
  word-break: keep-all;
  padding: 0 1rem;
`;
