import React from "react";
import styled from "styled-components";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";

import html2pdf from 'html2pdf.js';

const PageWrapper = styled.div`
  background: linear-gradient(to bottom, #88ccf9, #b6e4ff, #d9f3ff, #f1fbff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 2rem;
  padding-top: 120px;
  max-width: 1400px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 700;
  color:rgb(255, 255, 255);
  text-align: center;
  margin-bottom: 2rem;
`;

const FooterSpacer = styled.div`
  height: 100px;
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
  background-color: ${props => props.index <= props.currentStep ? '#146c94' : 'white'};
  color: ${props => props.index <= props.currentStep ? 'white' : '#146c94'};
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

const ResumeWrapper = styled.div`
  padding: 20px;  
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  width: 794px;
  min-height: 1123px;
  height: auto;
  font-family: 'Noto Sans KR', sans-serif;
  color: #333;
  background-color:white;
  box-shadow: 3px 3px 10px -3px gray;
`;

const TopSection = styled.div`
  display: flex;
  padding: 20px;
  background-color: #f5f5f5;
  align-items: center;
`;

const NameSection = styled.div`
  flex: 1;
`;

const NameKo = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
`;

const NameEn = styled.p`
  font-size: 16px;
  color: gray;
`;

const Section = styled.div`
  margin: 20px 0;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 10px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 5px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 5px;
  text-align:center;
`;

const RowTitle = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 5px;
  font-size: 1.2rem;
`;
 
const PhotoBox = styled.div`
  width: 120px;
  height: 150px;
  border: 2px solid #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const PhotoPreview = styled.img`
  width: 120px;
  height: 150px;
  object-fit: cover;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 10px;
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
  margin-right: 30px;]
`;

const StepButton = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

  const text = {
    title: { ko: "경력 입력", en: "Enter Experience" },
    steps: {
      ko: ["이력서\n양식", "신상\n정보", "경력", "수정", "완성"],
      en: ["Template", "Personal\nInfo", "Experience", "Edit", "Complete"],
    },
    sectionTitles: {
      ko: {
        personal: "기본 사항",
        education: "학력 사항",
        career: "경력",
        certificate: "자격증",
        language: "외국어",
        military: "병역 사항",
      },
      en: {
        personal: "Personal",
        education: "Education",
        career: "Career",
        certificate: "Certificates",
        language: "Languages",
        military: "Military Service",
      },
    },
    nullText:{
      ko:{
        education: "입력된 학력 정보가 없습니다.",
        career: "입력된 경력 정보가 없습니다.",
        certificate: "입력된 자격증 정보가 없습니다.",
        language: "입력된 외국어 정보가 없습니다.",
        military: "입력된 병역 정보가 없습니다.",
        photo: "사진없음",
      },
      en:{
        education: "No education information has been entered.",
        career: "No career information has been entered.",
        certificate: "No certificate information has been entered.",
        language: "No language skills have been entered.",
        military: "No military information has been entered.",
        photo: "No photo",
      }
    },
    next: { ko: "PDF 다운", en: "PDF DOWNLOAD" },

    next: { ko: "PDF 다운", en: "PDF DOWNLOAD" },
    prev: { ko: "이전", en: "Previous" },
    title: { ko: "신상 정보 입력", en: "Enter Personal Information" },
    inputTitle: { ko: "신상정보", en: "Personal Details" },

    photo: { ko: "+ 사진 추가", en: "+ Add Photo" },
    name: { ko: "이름", en: "First Name" },
    nameEn: { ko: "영문 이름", en: "First Name (EN)" },
    surname: { ko: "성", en: "Last Name" },
    surnameEn: { ko: "영문 성", en: "Last Name (EN)" },
    email: { ko: "이메일 주소", en: "Email Address" },
    phone: { ko: "전화번호", en: "Phone Number" },
    birth: { ko: "생년월일", en: "Date of Birth" },
    address: { ko: "주소", en: "Address" },

    military: { ko: "병역 사항", en: "Military Service" },
    militaryService: {ko: "복무기간", en:"Service Period"},
    militaryBranch: { ko: "군별", en: "Branch" },
    militaryRank: {ko: "계급", en:"Rank"},
    militarySpecialty: {ko: "병과", en:"Military Specialty"},
    militaryServiceStatus: { ko: "병역여부", en: "Service Status" },
    militaryVeteranStatus: {ko: "보훈대상", en:"Veteran Status"},

    graduationDate: {ko: "졸업일", en:"Graduation Date"},
    schoolName: {ko: "학교명", en:"School Name"},
    graduationStatus: {ko: "졸업여부", en:"Graduation Status"},
    grade: {ko: "성적", en:"Grade"},

    employmentPeriod: {ko:"근무기간", en:"Employment Period"},
    companyName: {ko:"회사명", en:"Company Name"},
    finalPosition: {ko:"최종직위", en:"Final Position"},
    responsibilities: {ko:"담당업무", en:"Responsibilities"},

    dateAcquisition: {ko:"취득일", en:"Date of Acquisition"},
    certificateName: {ko:"자격명", en:"Eertificate Name"},
    Issuer: {ko:"발행처", en:"Issuer"},

    language: {ko:"언어명", en:"Language"},
    proficiency: {ko:"구사정도", en:"Proficiency"},
    testName: {ko:"시험명", en:"Test Name"},
    score: {ko:"점수", en:"Score"},
  }

const ResumePreview = ({  language = 'ko', formData,onChangeLanguage }) => {
 
  const currentStep = 4;
  const navigate = useNavigate();

  const {
    name,
    firstName,
    nameEn,
    firstNameEn,
    email,
    phone,
    birthYear,
    birthMonth,
    birthDay,
    experience,
    education,
    career,
    certificate,
    skills
  } = formData;


  const getText = (section, key) => {
    const langData = text[section]?.[language] || text[section]?.ko;
    if (typeof langData === 'string') return langData;
    return key ? langData?.[key] || '' : langData || '';
  };

  const downloadPDF = () => {
    const element = document.getElementById("pdf-download"); // PDF로 변환할 요소 선택
    html2pdf(element, {
      filename: "Toast_Editor.pdf", // default : file.pdf
      html2canvas: { scale: 2 }, // 캡처한 이미지의 크기를 조절, 값이 클수록 더 선명하다.
      jsPDF: { 
        format: "b4",  // 종이 크기 형식
        orientation: "portrait", // or landscape : 가로
      },
      callback: () => {
        console.log("PDF 다운로드 완료");
      },
    });
  };

  return (
    <PageWrapper>
      <Header language={language} onChangeLanguage={onChangeLanguage} />
      <MainContent>
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
        
    <ResumeWrapper>
      <div id="pdf-download" className="toast-editor-viewer">
      <TopSection>
            <PhotoBox>
              {formData.photo ? (
                <PhotoPreview src={formData.photo} alt="Profile" />
              ) : (
                <label></label>
              )}
            </PhotoBox>
        <NameSection>
          <NameKo>{`${firstName} ${name}`}</NameKo>
          <NameEn>{`${nameEn} ${firstNameEn}`}</NameEn>
        </NameSection>
      </TopSection>

<div style={{padding:'20px'}}>
      <Section>
        <SectionTitle>기본사항</SectionTitle>
        <p>{getText('birth')}: {formData.birthYear.length && formData.birthMonth.length && formData.birthDay.length > 0 ? (`${birthYear}.${birthMonth}.${birthDay}`):null}</p>
        <p>{getText('phone')}: {phone}</p>
        <p>{getText('email')}: {email}</p>
      </Section>

      <Section>
        {Array.isArray(formData.certificate) && formData.certificate.length > 0 ? (
          <>
        <SectionTitle>자격증</SectionTitle>
          <Table>
            <RowTitle>
                <span>{getText('dateAcquisition')}</span>
                <span>{getText('certificateName')}</span>
                <span>{getText('Issuer')}</span>
            </RowTitle>
              {formData.certificate.map((cert, i) => (
                <Row key={i}>
                  {cert.map((col, colIdx) => (
                    <span key={colIdx}>{col || "-"}</span>
                  ))}
                </Row>
              ))}
          </Table></>
        ) : null}
      </Section>

      <Section>
        {Array.isArray(formData.education) && formData.education.length > 0 ? (
          <>
        <SectionTitle>학력사항</SectionTitle>
          <Table>
            <RowTitle>
                <span>{getText('graduationDate')}</span>
                <span>{getText('schoolName')}</span>
                <span>{getText('graduationStatus')}</span>
                <span>{getText('grade')}</span>
            </RowTitle>
              {formData.education.map((cert, i) => (
                <Row key={i}>
                  {cert.map((col, colIdx) => (
                    <span key={colIdx}>{col || "-"}</span>
                  ))}
                </Row>
              ))}
          </Table></>
        ) : null}
      </Section>
 
      <Section>
        {Array.isArray(formData.career) && formData.career.length > 0 ? (
          <>
        <SectionTitle>{getText('career')}</SectionTitle>
          <Table>
            <RowTitle>
                <span>{getText('employmentPeriod')}</span>
                <span>{getText('companyName')}</span>
                <span>{getText('finalPosition')}</span>
                <span>{getText('responsibilities')}</span>
            </RowTitle>
              {formData.career.map((cert, i) => (
                <Row key={i}>
                  {cert.map((col, colIdx) => (
                    <span key={colIdx}>{col || "-"}</span>
                  ))}
                </Row>
              ))}
          </Table></>
        ) : null}
      </Section>
 
      <Section>
          {formData.military && Object.keys(formData.military).length > 0 ? (
          <>
        <SectionTitle>{getText('military')}</SectionTitle>
          <Table>
            <RowTitle>
                <span>{getText('militaryService')}</span>
                <span>{getText('militaryBranch')}</span>
                <span>{getText('militaryRank')}</span>
                <span>{getText('militarySpecialty')}</span>
                <span>{getText('militaryServiceStatus')}</span>
                <span>{getText('militaryVeteranStatus')}</span>
            </RowTitle><Row>
            <span> 
              {(formData.military.serviceStart || "-").replace(/-/g, ".")} ~ {(formData.military.serviceEnd || "-").replace(/-/g, ".")}
            </span>
            <span>
              {formData.military.branch || "-"}
            </span>
            <span>
              {formData.military.rank || "-"}
            </span>
            <span>
              {formData.military.specialty || "-"}
            </span>
            <span>
              {formData.military.served || "-"}
            </span>
            <span>
              {formData.military.veteran || "-"}
            </span></Row>
          </Table></>
        ) : null}
      </Section>
 
      <Section>
        {Array.isArray(formData.languageSkills) && formData.languageSkills.length > 0 ? (
          <>
        <SectionTitle>{getText("language")}</SectionTitle>
          <Table>
            <RowTitle>
                <span>{getText('language')}</span>
                <span>{getText('proficiency')}</span>
                <span>{getText('testName')}</span>
                <span>{getText('score')}</span>
            </RowTitle>
              {formData.languageSkills.map((cert, i) => (
                <Row key={i}>
                  {cert.map((col, colIdx) => (
                    <Row key={colIdx}>{col || "-"}</Row>
                  ))}
                </Row>
              ))}
          </Table></>
        ) : null}
      </Section>
      </div>
      </div>
    </ResumeWrapper>
        <StepButton>
          <PreButton onClick={() => navigate("/step4page")}>
            {getText("prev")}
          </PreButton>
          <NextButton onClick={downloadPDF}>
            {getText("next")}
          </NextButton>
        </StepButton>
        <FooterSpacer />
      </MainContent>
      <Footer language={language} />
    </PageWrapper>
  );
};

export default ResumePreview;
