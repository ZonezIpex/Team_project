import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Step2page = () => {
  const navigate = useNavigate();
  const steps = ["이력서\n양식", "신상\n정보", "경력", "수정", "완성"];
  const currentStep = 1;

  return (
    <PageWrapper>
      <Header />
      <Container>
        <Title>신상 정보 입력</Title>

        <Stepper>
          {steps.map((step, index) => (
            <Step key={index}>
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
            <MilitaryTable>
              <thead>
                <tr>
                  <th>복무기간</th>
                  <th>군별</th>
                  <th>계급</th>
                  <th>병과</th>
                  <th>군필여부</th>
                  <th>보훈대상</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="text" placeholder="예: 2018~2020" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td><input type="text" /></td>
                  <td>
                    <select>
                      <option>필</option>
                      <option>미필</option>
                      <option>면제</option>
                    </select>
                  </td>
                  <td>
                    <select>
                      <option>대상</option>
                      <option>비대상</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </MilitaryTable>
          </MilitarySection>
        </ResumeInput>

        <ButtonWrapper>
          <Button onClick={() => navigate("/step1page")}>이전</Button>
          <Button onClick={() => navigate("/step3")}>다음</Button>
        </ButtonWrapper>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

export default Step2page;

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

const ResumeInput = styled.div`
  background-color: white;
  padding: 20px 30px;
  border-radius: 10px;
  box-shadow: 3px 3px 10px -3px gray;
`;

const InputTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 20px;
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
  margin-top: ${(props) => props.marginTop || "0"};
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

const Select = styled.select`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

const BirthAddressSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 30px;
  width: 100%;
  max-width: 900px;
`;

const BirthTitle = styled.h4`
  margin-bottom: 10px;
`;

const AddressSection = styled.div`
  flex: 1;
`;

const AddressTitle = styled.h4`
  margin-bottom: 10px;
`;

const AddressInput = styled(Input)`
  width: 100%;
`;

const MilitarySection = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 30px;
  text-align: left;
`;

const MilitaryTitle = styled.h4`
  margin-bottom: 10px;
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
  }

  input, select {
    width: 100%;
    border: none;
    background-color: transparent;
    font-size: 14px;
    text-align: center;
    outline: none;
  }
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
  background-color: #146c94;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0d4c6d;
  }
`;
