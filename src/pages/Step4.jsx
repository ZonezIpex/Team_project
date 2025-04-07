// src/components/Step4.jsx
import React from "react";
import styled from "styled-components";
import Header from '../components/Header';
import Footer from '../components/Footer';
import Step3Page from './Step3Page';
import Step5 from './Step5';
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

const Step4 = () => {
  const sectionStyle = {
    marginBottom: "30px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "800px",
        margin: "0 auto",
        height: "80vh",           // ✅ 높이 제한
        overflowY: "auto",        // ✅ 세로 스크롤
        backgroundColor: "#fff",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>4단계: 최종 수정</h2>

      {/* 기본 정보 */}
      <div style={sectionStyle}>
        <h3>기본 정보</h3>
        <input type="text" placeholder="이름" style={inputStyle} />
        <input type="email" placeholder="이메일" style={inputStyle} />
        <input type="tel" placeholder="전화번호" style={inputStyle} />
        <input type="text" placeholder="주소" style={inputStyle} />
      </div>

      {/* 학력 */}
      <div style={sectionStyle}>
        <h3>학력</h3>
        <input type="text" placeholder="학교명" style={inputStyle} />
        <input type="text" placeholder="전공" style={inputStyle} />
        <input type="text" placeholder="졸업 여부" style={inputStyle} />
      </div>

      {/* 경력 */}
      <div style={sectionStyle}>
        <h3>경력</h3>
        <input type="text" placeholder="회사명" style={inputStyle} />
        <input type="text" placeholder="직책" style={inputStyle} />
        <input type="text" placeholder="근무기간" style={inputStyle} />
        <textarea placeholder="담당업무 설명" rows={4} style={inputStyle}></textarea>
      </div>

      {/* 자격증 */}
      <div style={sectionStyle}>
        <h3>자격증</h3>
        <input type="text" placeholder="자격증명" style={inputStyle} />
        <input type="date" placeholder="취득일" style={inputStyle} />
      </div>

      {/* 외국어 */}
      <div style={sectionStyle}>
        <h3>외국어</h3>
        <input type="text" placeholder="언어명" style={inputStyle} />
        <input type="text" placeholder="시험명 / 점수" style={inputStyle} />
      </div>
    </div>
  );
};

export default Step4;
