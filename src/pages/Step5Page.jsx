// src/components/Step5.jsx
import React from "react";
import styled from "styled-components";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Step4Page from './Step4Page';
import { useNavigate } from 'react-router-dom';
import StyledTable from '../components/StepTable';

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

const InputSection = styled.div`
 background-color: white;
 border-radius: 20px;
 padding: 30px;
  box-shadow: 3px 3px 10px -3px gray;
`;

const Title = styled.h2`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: white;
  margin-top: 100px;
  margin-bottom: 30px;
`;

const Section = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
`;

const SectionTitle = styled.h3`
  margin-bottom: 10px;
`;

const ResumeText = styled.p`
  margin: 5px 0;
`;

const Highlight = styled.strong`
  margin-right: 5px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const CompleteButton = styled.button`
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
`;

const Step5Page = () => {
  return (
    <PageWrapper>
      <Header/>
    <Container>
      <Title>이력서 완성</Title>

<InputSection>
      <Section>
        <SectionTitle>기본 정보</SectionTitle>
        <ResumeText><Highlight>이름:</Highlight>홍길동</ResumeText>
        <ResumeText><Highlight>이메일:</Highlight>hong@example.com</ResumeText>
        <ResumeText><Highlight>전화번호:</Highlight>010-1234-5678</ResumeText>
        <ResumeText><Highlight>주소:</Highlight>서울시 강남구</ResumeText>
      </Section>

      <Section>
        <SectionTitle>학력</SectionTitle>
        <ResumeText><Highlight>학교:</Highlight>OO대학교 / 컴퓨터공학 / 졸업</ResumeText>
      </Section>

      <Section>
        <SectionTitle>경력</SectionTitle>
        <ResumeText><Highlight>회사:</Highlight>ABC회사 / 프론트엔드 개발자 (2020~2023)</ResumeText>
        <ResumeText><Highlight>업무:</Highlight>웹서비스 개발 및 유지보수</ResumeText>
      </Section>

      <Section>
        <SectionTitle>자격증</SectionTitle>
        <ResumeText>정보처리기사 (2022)</ResumeText>
      </Section>

      <Section>
        <SectionTitle>외국어</SectionTitle>
        <ResumeText>영어 / TOEIC 850점</ResumeText>
      </Section>
      </InputSection>

      <ButtonWrapper>
        <CompleteButton onClick={() => alert("이력서 저장이 완료되었습니다!")}>
          이력서 완료
        </CompleteButton>
      </ButtonWrapper>
      
    </Container>
    <Footer/>
    </PageWrapper>
  );
};

export default Step5Page;
