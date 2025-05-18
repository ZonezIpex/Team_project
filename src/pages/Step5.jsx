import React from "react";
import styled from "styled-components";

import html2pdf from 'html2pdf.js';

const ResumeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  margin: auto;
  font-family: 'Noto Sans KR', sans-serif;
  color: #333;
`;

const TopSection = styled.div`
  display: flex;
  padding: 20px;
  background-color: #f5f5f5;
  align-items: center;
`;

const Photo = styled.img`
  width: 120px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 20px;
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
  justify-content: space-between;
  margin-bottom: 5px;
`;

const RowTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  font-size: 1.2rem;
`;

const DotLevel = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: ${({ active }) => (active ? "#333" : "#ccc")};
  border-radius: 50%;
  margin-right: 5px;
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

const Th = styled.th`
  border: 1px solid #ccc;
  padding: 12px;
  background-color: #fafafa;
  text-align: center;
`;

const Td = styled.td`
  border: 1px solid #ccc;
  padding: 12px;
  text-align: center;
`;

const ValueBox = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 12px;
  background-color: #fff;
  color: #333;
`;

const Button = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 12px;
  background-color: #fff;
  color: #333;
`;
  const text = {
    title: { ko: "경력 입력", en: "Enter Experience" },
    steps: {
      ko: ["이력서\n양식", "신상\n정보", "경력", "수정", "완성"],
      en: ["Template", "Personal\nInfo", "Experience", "Edit", "Complete"],
    },
    sectionTitles: {
      ko: {
        personal: "인적 사항",
        education: "학력",
        career: "경력",
        certificate: "자격증",
        language: "외국어",
        military: "병역 사항",
      },
      en: {
        personal: "Personal Information",
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
    next: { ko: "이력서 생성", en: "Create Resume" },
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

const ResumePreview = ({  language = 'ko', formData }) => {
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

      <Section>
        <SectionTitle>기본사항</SectionTitle>
        <p>생년월일: {formData.birthYear.length && formData.birthMonth.length && formData.birthDay.length > 0 ? (`${birthYear}.${birthMonth}.${birthDay}`):null}</p>
        <p>전화번호: {phone}</p>
        <p>이메일: {email}</p>
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
                    <Row key={colIdx}><Row>{col || "-"}</Row></Row>
                  ))}
                </Row>
              ))}
          </Table></>
        ) : null}
      </Section>



      <Section>
        <SectionTitle>학력사항</SectionTitle>
        {Array.isArray(education)
          ? education.map((edu, i) => (
              <Row key={i}>
                <span>{edu.period}</span>
                <span>{edu.school}</span>
                <span>{edu.major}</span>
              </Row>
            ))
          : null}
      </Section>

      <Section>
        <SectionTitle>기술</SectionTitle>
        {skills.map((skill, i) => (
          <Row key={i}>
            <span>{skill.name}</span>
            <span>
              {[...Array(5)].map((_, j) => (
                <DotLevel key={j} active={j < skill.level} />
              ))}
            </span>
          </Row>
        ))}
      </Section>

      <Section>
        <SectionTitle>대외활동</SectionTitle>
        {experience.map((exp, i) => (
          <Row key={i}>
            <span>{exp.organization}</span>
            <span>{exp.period}</span>
            <span>{exp.description}</span>
          </Row>
        ))}
      </Section>

      <Section>
        <SectionTitle>경력사항</SectionTitle>
        {career.map((job, i) => (
          <Row key={i}>
            <span>{job.company} ({job.position})</span>
            <span>{job.period}</span>
            <span>{job.description}</span>
          </Row>
        ))}
      </Section>
      </div>
        <Button
          variant="outlined"
          color="warning"
          sx={{ m: 1 }}
          onClick={downloadPDF}
        >
          PDF Download
        </Button>
    </ResumeWrapper>
  );
};

export default ResumePreview;
