// src/pages/Step2Page.jsx
import React, { useEffect } from "react";
import styled from "styled-components";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import StyledTable from '../components/StepTable';

const Step2Page = ({ language, onChangeLanguage, selectedTemplate }) => {
  const navigate = useNavigate();

  // --- [ 추가된 부분 ] 선택된 템플릿이 없으면 Step1Page로 리다이렉트
  useEffect(() => {
    if (!selectedTemplate) {
      alert("템플릿을 선택해주세요.");
      navigate('/step1Page');
    }
  }, [selectedTemplate, navigate]);
  // --------------------------------------------

  const text = {
    title: {
      ko: "신상 정보 입력",
      en: "Enter Personal Information",
    },
    steps: {
      ko: ["이력서\n양식", "신상\n정보", "경력", "수정", "완성"],
      en: ["Template", "Personal\nInfo", "Experience", "Edit", "Complete"],
    },
    inputTitle: {
      ko: "신상정보",
      en: "Personal Details",
    },
    photo: {
      ko: "+ 사진 추가",
      en: "+ Add Photo",
    },
    name: {
      ko: "이름",
      en: "First Name",
    },
    nameEn: {
      ko: "영문 이름",
      en: "First Name (EN)",
    },
    surname: {
      ko: "성",
      en: "Last Name",
    },
    surnameEn: {
      ko: "영문 성",
      en: "Last Name (EN)",
    },
    email: {
      ko: "이메일 주소",
      en: "Email Address",
    },
    phone: {
      ko: "전화번호",
      en: "Phone Number",
    },
    birth: {
      ko: "생년월일",
      en: "Date of Birth",
    },
    year: {
      ko: "년",
      en: "Year",
    },
    month: {
      ko: "월",
      en: "Month",
    },
    day: {
      ko: "일",
      en: "Day",
    },
    address: {
      ko: "주소",
      en: "Address",
    },
    military: {
      ko: "병역 사항",
      en: "Military Service",
    },
    prev: {
      ko: "이전",
      en: "Previous",
    },
    next: {
      ko: "다음",
      en: "Next",
    },
  };

  const currentStep = 1;

  return (
    <PageWrapper>
      <Header language={language} onChangeLanguage={onChangeLanguage} />
      <Container>
        <Title>{text.title[language]}</Title>

        <Stepper>
          {text.steps[language].map((step, index) => (
            <Step key={step}>
              <Circle index={index} currentStep={currentStep}>
                {step}
              </Circle>
              {index < text.steps[language].length - 1 && <Line />}
            </Step>
          ))}
        </Stepper>

        {/* --- [ 추가된 부분 ] 선택한 템플릿 이름 표시 --- */}
        {selectedTemplate && (
          <SelectedTemplateBox>
            선택한 템플릿: {selectedTemplate.name}
          </SelectedTemplateBox>
        )}
        {/* -------------------------------------------------- */}

        <ResumeInput>
          <InputTitle>{text.inputTitle[language]}</InputTitle>
          <InfoSection>
            <PhotoBox>{text.photo[language]}</PhotoBox>
            <InputsColumn>
              <InputRow>
                <Input type="text" placeholder={text.name[language]} />
                <Input type="text" placeholder={text.nameEn[language]} />
              </InputRow>
              <InputRow marginTop="10px">
                <Input type="text" placeholder={text.surname[language]} />
                <Input type="text" placeholder={text.surnameEn[language]} />
              </InputRow>
              <InputRow marginTop="10px">
                <Input type="email" placeholder={text.email[language]} />
                <Input type="tel" placeholder={text.phone[language]} />
              </InputRow>
            </InputsColumn>
          </InfoSection>

          <BirthAddressSection>
            <div>
              <BirthTitle>{text.birth[language]}</BirthTitle>
              <Select><option>{text.year[language]}</option></Select>
              <Select><option>{text.month[language]}</option></Select>
              <Select><option>{text.day[language]}</option></Select>
            </div>
            <AddressSection>
              <AddressTitle>{text.address[language]}</AddressTitle>
              <AddressInput type="text" placeholder={text.address[language]} />
            </AddressSection>
          </BirthAddressSection>

          <MilitarySection>
            <MilitaryTitle>{text.military[language]}</MilitaryTitle>
            <StyledTable
              type="military"
              inputComponent={Input}
              selectComponent={Select}
              showMore={false}
            />
          </MilitarySection>
        </ResumeInput>

        <StepButton>
          <PreButton onClick={() => navigate('/step1Page')}>
            {text.prev[language]}
          </PreButton>
          <NextButton onClick={() => navigate('/step3Page')}>
            {text.next[language]}
          </NextButton>
        </StepButton>
      </Container>
      <Footer language={language} />
    </PageWrapper>
  );
};

export default Step2Page;

// -------------------- Styled Components --------------------
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
  border-radius: 20px;
  box-shadow: 3px 3px 10px -3px gray;
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: white;
  margin-top: 100px;
  margin-bottom: 30px;
`;

const SelectedTemplateBox = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #146c94;
`;

const InputTitle = styled.h1`
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
  background-color: ${props => props.index <= props.currentStep ? '#146c94' : 'white'};
  color: ${props => props.index <= props.currentStep ? 'white' : '#146c94'};
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
`;

const AddressTitle = styled.h4`
  margin-bottom: 10px;
  margin-left: 5px;
  text-align: left;
`;

const AddressInput = styled(Input)`
  flex: 1;
  width: 100%;
  min-width: 0;
`;

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

const LinkText = styled.div`
  color: white;
  background-color: #146c94;
  border: 1px solid #146c94;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  padding: 8px 20px;

  &:hover {
    color: #146c94;
    background-color: white;
  }
`;

const PreButton = styled(LinkText)`
  margin-left: 30px;
`;

const NextButton = styled(LinkText)`
  text-align: left;
  margin-right: 30px;
`;

const StepButton = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 50px auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
