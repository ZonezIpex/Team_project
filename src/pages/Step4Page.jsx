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

const ResumeInput = styled.div`
  background-color: white;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 3px 3px 10px -3px gray;
  margin-bottom: 50px;
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: white;
  margin-top: 100px;
  margin-bottom: 30px;
`;

const InputTitle=styled.h1`
  margin-top: 0;
  font-size: 1.2rem;

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

const InfoSection = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
  width: 100%;
  max-width: 800px;
`;

const PhotoBox = styled.div`
  width: 120px;
  height: 150px;
  border: 2px dashed #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  cursor: pointer;
`;

const InputsColumn = styled.div`
  flex: 1;
  margin-top: 20px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: ${props => props.marginTop || "0"};
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
`;

const Select = styled.select`
  flex: 1;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  margin-right: 10px;
`;

const BirthTitle = styled.h4`
  margin-bottom: 10px;
  margin-left: 5px;
  text-align: left;
`;

const BirthAddressSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
  max-width: 1000px;
`;

const AddressSection = styled.div`
  margin-left: 20px;
  flex: 1;
  max-width: 600px;
`

const AddressTitle = styled.h4`
  margin-bottom: 10px;
  margin-left: 5px;
  text-align: left;
`;

const AddressInput = styled(Input)`
  flex: 1;
  width: 100%;
  min-width: 0; // flex에서 줄바꿈 방지
`;

// 병역 사항 관련 스타일
const MilitarySection = styled.div`
  width: 100%;
  overflow-x: auto;
  max-width: 100%;
  margin-top: 30px;
  text-align: left;
`;

const MilitaryTitle = styled.h4`
  margin-bottom: 10px;
  margin-left: 5px;
`;

const MilitaryTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
  font-size: 14px;

  th, td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
  }

  th {
    background-color: #f8f8f8;
    font-weight: normal;
  }

  input, select {
    width: 100%;
    border: none;
    font-size: 14px;
    text-align: center;
    background-color: transparent;
    outline: none;
  }
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
  width: 100%;
  max-width: 900px; /* 기존 800px에서 더 넓혀줌 */
  margin: 50px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InputSection = styled.div`
  background-color: white;
  padding: 0 20px 20px 20px;
  border-radius: 20px;
  box-shadow: 3px 3px 10px -3px gray;
`;

const SectionTitle = styled.h4`
  margin-top: 30px;
  text-align: left;
  border-bottom: 1px solid black;
  padding-bottom: 0.3rem;
`;

const steps = ["이력서\n양식", "신상\n정보", "경력", "수정", "완성"];
const currentStep = 3; // 현재 단계

const Step4 = () => {
  const navigate = useNavigate();
  return (
    <PageWrapper>
      <Header/>
      <Container>
        <Title>신상 정보 입력</Title>

        <Stepper>
          {steps.map((step, index) => (
            <Step key={step}>
              <Circle index={index} currentStep={currentStep}>
                {step}
              </Circle>
              {index < steps.length - 1 && <Line />}
            </Step>
          ))}
        </Stepper>

        <ResumeInput>
        <InputTitle>신상정보</InputTitle>
          <InfoSection>
            <PhotoBox>+ 사진 추가</PhotoBox>
            <InputsColumn>
              <InputRow>
                <Input type="text" placeholder="이름" />
                <Input type="text" placeholder="영문 이름" />
              </InputRow>
              <InputRow marginTop="10px">
                <Input type="text" placeholder="성" />
                <Input type="text" placeholder="영문 성" />
              </InputRow>
              <InputRow marginTop="10px">
                <Input type="email" placeholder="이메일 주소" />
                <Input type="tel" placeholder="전화번호" />
              </InputRow>
            </InputsColumn>
          </InfoSection>

          <BirthAddressSection>
            <div>
            <BirthTitle>생년월일</BirthTitle>
            <Select>
              <option>년</option>
            </Select>
            <Select>
              <option>월</option>
            </Select>
            <Select>
              <option>일</option>
            </Select>
            </div>
              <AddressSection>
                <AddressTitle>주소</AddressTitle>
                <AddressInput type="text" placeholder="주소" />
              </AddressSection>
          </BirthAddressSection>

          
          <MilitarySection>
            <MilitaryTitle>병역 사항</MilitaryTitle>
              <StyledTable
                type="military"
                inputComponent={Input}
                selectComponent={Select}
                showMore={false} // 한 줄만 표시하고 '더 쓰기' 숨기기
              />

          </MilitarySection>
        </ResumeInput>

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

          <StepButton>
          <PreButton onClick={() => navigate('/step3Page')}>이전</PreButton>
          <NextButton onClick={() => navigate('/step5')}>다음</NextButton>
          </StepButton>
        </Container>

        <Footer/>
        </PageWrapper>
  );
};

export default Step4;
