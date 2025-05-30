import React, { useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";

// ====== styled-components ======
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
  color: rgb(255, 255, 255);
  text-align: center;
  margin-bottom: 2rem;
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
  background-color: ${props => (props.index <= props.currentStep ? "#146c94" : "white")};
  color: ${props => (props.index <= props.currentStep ? "white" : "#146c94")};
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

const FooterSpacer = styled.div`
  height: 100px;
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

const PreButton = styled(LinkText)` margin-left: 30px; `;
const NextButton = styled(LinkText)` margin-right: 30px; `;

const StepButton = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

const Content = styled.div`
    width: 2480px;
    hegit: 3508px;
`;

// 텍스트 객체
const text = {
  title: { ko: "경력 입력", en: "Enter Experience" },
  steps: {
    ko: ["이력서\n양식", "신상\n정보", "경력", "수정", "완성"],
    en: ["Template", "Personal\nInfo", "Experience", "Edit", "Complete"]
  },
  sectionTitles: {
    ko: {
      personal: "기본 사항",
      education: "학력 사항",
      career: "경력",
      certificate: "자격증",
      language: "외국어",
      military: "병역 사항"
    },
    en: {
      personal: "Personal",
      education: "Education",
      career: "Career",
      certificate: "Certificates",
      language: "Languages",
      military: "Military Service"
    }
  },
  sectionText: {
    ko: {
      email: "이메일",
      phone: "전화번호",
      birth: "생년월일",
      
      eduDate: "졸업일",
      eduName: "학교명",
      eduStatus: "졸업여부",
      eduGrade: "성적",
      
      carPeriod: "근무기간",
      carName: "회사명",
      carPosition: "최종직위",
      carResponsibilities: "담당업무",
      
      language: "언어명",
      proficiency: "구사정도",
      testName: "시험명",
      score: "점수",
    },
    en: {
      email: "Email",
      phone: "Phone",
      birth: "Birth",

      eduDate: "Graduation Date",
      eduName: "School Name",
      eduStatus: "Graduation Status",
      eduGrade: "Grade",
      
      carPeriod: "Employment Period",
      carName: "Company Name",
      carPosition: "Final Position",
      carResponsibilities: "Responsibilities",
      
      language: "Language",
      proficiency: "Proficiency",
      testName: "Test Name",
      score: "Score",
    }
  },
  next: { ko: "PDF 다운", en: "PDF DOWNLOAD" },
  prev: { ko: "이전", en: "Previous" }
};

// ====== 컴포넌트 시작 ======
const ResumePreview = ({ language = "ko", formData, onChangeLanguage }) => {
  const location = useLocation();
  const selectedTemplate = location.state?.selectedTemplate || 1;
  const navigate = useNavigate();
  const currentStep = 4;

  useEffect(() => {
    const id = "dynamic-resume-style";
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = `/resumePreview/${selectedTemplate}.css`;
    document.head.appendChild(link);
  }, [selectedTemplate]);

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
    education,
    career,
    certificate,
    military,
    languageSkills,
    photo
  } = formData;

  const getText = (section, key) => {
    const langData = text[section]?.[language] || text[section]?.ko;
    if (typeof langData === "string") return langData;
    return key ? langData?.[key] || "" : langData || "";
  };

  const downloadPDF = () => {
    const element = document.getElementById("pdf-download");
    html2pdf(element, {
      filename: "resume.pdf",
      html2canvas: { scale: 2 },
      jsPDF: { format: "b4", orientation: "portrait" }
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


        <div id="pdf-download" className={`resume-template-${selectedTemplate}`}>

          <div className="resume-left">
            {photo && <img src={photo} alt="사진" className="resume-photo" />}
            <div className="resume-name">{firstName} {name}</div>
            <div className="resume-name-en">{firstNameEn} {nameEn}</div>

            <div className="resume-section">
              <div className="resume-section-title">{getText("sectionTitles", "personal")}</div>
              <div className="resume-text-line">{getText("sectionText","email")}: {email}</div>
              <div className="resume-text-line">{getText("sectionText","phone")}: {phone}</div>
              <div className="resume-text-line">{getText("sectionText","birth")}: {birthYear}.{birthMonth}.{birthDay}</div>
            </div>

            {Array.isArray(certificate) && (
              <div className="resume-section">
                <div className="resume-section-title">{getText("sectionTitles", "certificate")}</div>
                {certificate.map((row, i) => (
                  <div className="resume-text-line" key={i}>{row.join(" / ")}</div>
                ))}
              </div>
            )}
          </div>

          <div className="resume-right">
            {Array.isArray(education) && education.length > 0 && (
              <div className="resume-section">
                <div className="resume-section-title">{getText("sectionTitles", "education")}</div>
                <table className="resume-table">
                  <thead>
                    <tr>
                      <th>{getText("sectionText", "eduDate")}</th><th>{getText("sectionText", "eduName")}</th><th>{getText("sectionText", "eduStatus")}</th><th>{getText("sectionText", "eduGrade")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {education.map((row, i) => (
                      <tr key={i}>{row.map((col, j) => <td key={j}>{col || "-"}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {Array.isArray(career) && career.length > 0 && (
              <div className="resume-section">
                <div className="resume-section-title">{getText("sectionTitles", "career")}</div>
                <table className="resume-table">
                  <thead>
                    <tr>
                      <th>{getText("sectionText", "carPeriod")}</th><th>{getText("sectionText", "carName")}</th><th>{getText("sectionText", "carPosition")}</th><th>{getText("sectionText", "carResponsibilities")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {career.map((row, i) => (
                      <tr key={i}>{row.map((col, j) => <td key={j}>{col || "-"}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {military && Object.values(military).some(value => value) && (
              <div className="resume-section">
                <div className="resume-section-title">{getText("sectionTitles", "military")}</div>
                <div className="resume-text-line">
                  {(military.serviceStart || "-").replace(/-/g, ".")} ~ {(military.serviceEnd || "-").replace(/-/g, ".")}
                </div>
                <div className="resume-text-line">{military.branch} / {military.rank} / {military.specialty}</div>
                <div className="resume-text-line">{military.served} / {military.veteran}</div>
              </div>
            )}

            {Array.isArray(languageSkills) && languageSkills.length > 0 && (
              <div className="resume-section">
                <div className="resume-section-title">{getText("sectionTitles", "language")}</div>
                <table className="resume-table">
                  <thead>
                    <tr>
                      <th>{getText("sectionText", "language")}</th><th>{getText("sectionText", "proficiency")}</th><th>{getText("sectionText", "testName")}</th><th>{getText("sectionText", "score")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {languageSkills.map((row, i) => (
                      <tr key={i}>{row.map((col, j) => <td key={j}>{col || "-"}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
        </div>

        <StepButton>
          <PreButton onClick={() => navigate("/step4page")}>{getText("prev")}</PreButton>
          <NextButton onClick={downloadPDF}>{getText("next")}</NextButton>
        </StepButton>

        <FooterSpacer />
      </MainContent>
      <Footer language={language} />
    </PageWrapper>
  );
};

export default ResumePreview;
