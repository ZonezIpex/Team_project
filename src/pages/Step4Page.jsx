import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate, useLocation } from "react-router-dom";
import StyledTable from "../components/StepTable";

export default function Step4Page({ language = 'ko', formData, onChangeLanguage, handleFormDataChange }) {
  const navigate = useNavigate();
  const { state } = useLocation(); // useLocation 훅을 사용하여 location의 state를 가져옵니다.
  // formData 상태 초기화 (null로 시작하지 않도록 기본값 설정)

  console.log(formData); // formData 내용 확인
  // military 관련 입력을 관리하는 useRef 설정
  const militaryRefs = useRef({}); // military 항목에 대한 ref 객체

  const handlePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();  // 파일 입력 요소를 클릭하여 파일 선택 창 열기
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleFormDataChange({ ...formData, photo: reader.result });

      };
      reader.readAsDataURL(file); // 파일을 데이터 URL로 읽기
    }
  };

    const [birthYear, setBirthYear] = useState(formData.birthYear || '년');
    const [birthMonth, setBirthMonth] = useState(formData.birthMonth || '월');
    const [birthDay, setBirthDay] = useState(formData.birthDay || '일');

  // 사용자 입력을 상태로 관리
  const [education, setLocalEducation] = useState(formData.education || "");
  const [career, setLocalCareer] = useState(formData.career || "");
  const [certificate, setLocalCertificate] = useState(formData.certificate || "");
  const [languageSkills, setLocalLanguageSkills] = useState(formData.languageSkills || "");

  //const [photo, setPhoto] = useState(null);  // 사진 상태 추가
  const fileInputRef = useRef(null);  // fileInput 요소에 대한 ref 추가

  // 생년월일을 위한 옵션들
  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year);
    }
    return years;
  };

  const getMonthOptions = () => {
    return [
      "1", "2", "3", "4", "5", "6", 
      "7", "8", "9", "10", "11", "12"
    ];
  };

  const getDayOptions = () => {
    const days = [];
    for (let day = 1; day <= 31; day++) {
      days.push(day);
    }
    return days;
  };
  
  const inputComponent = useCallback(
    (props) => {
      return (
        <Input
          {...props}
          value={formData.military?.[props.name] || ""}
          onChange={(e) => {
            const updatedData = {
              ...formData.military,
              [props.name]: e.target.value,
            };
            handleFormDataChange({ ...formData, military: updatedData });
          }}
          ref={(el) => (militaryRefs.current[props.name] = el)} // ref 할당
        />
      );
    },
    [formData.military, handleFormDataChange]
  );
  
  const selectComponent = useCallback(
    (props) => (
      <Select
        {...props}
        value={formData.military?.[props.name] || ""}
        onChange={(e) => {
          const updatedData = {
            ...formData.military,
            [props.name]: e.target.value,
          };
          handleFormDataChange({ ...formData, military: updatedData });
        }}
        ref={(el) => (militaryRefs.current[props.name] = el)} // ref 할당
      />
    ),
    [formData.military, handleFormDataChange]
  );
  

  const currentLang = language || 'ko'; // fallback to 'ko' if undefined
  const text = {
    title: {
      ko: "경력 입력",
      en: "Enter Experience",
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
    sectionTitles: {
      ko: {
        education: "학력",
        career: "경력",
        certificate: "자격증",
        language: "외국어",
      },
      en: {
        education: "Education",
        career: "Career",
        certificate: "Certificates",
        language: "Languages",
      },
    },
    next: {
      ko: "다음",
      en: "Next",
    },
    prev: {
      ko: "이전",
      en: "Previous",
    },
  };

  const getText = (section, key) => {
    const langData = text[section]?.[currentLang] || text[section]?.ko;
    if (typeof langData === 'string') return langData;
    return key ? langData?.[key] || '' : langData || '';
  };

  return (
    <PageWrapper>
      <Header language={currentLang} onChangeLanguage={onChangeLanguage} />
      <Container>
        <Title>{getText('title')}</Title>

        <Stepper>
          {getText('steps').map((step, index) => (
            <Step key={step}>
              <Circle active={index === 3}>{step}</Circle>
              {index < getText('steps').length - 1 && <Line />}
            </Step>
          ))}
        </Stepper>

        <div>
          <h2>{getText('title')}</h2>
          <p>Name: {formData?.name}</p>
          <p>Surname: {formData?.surname}</p>
          <p>Email: {formData?.email}</p>
          <p>Phone: {formData?.phone}</p>
        </div>

        <ResumeInput>
          <InputTitle>{text.inputTitle[language]}</InputTitle>
          <InfoSection>
            <PhotoBox onClick={handlePhotoClick}> {/* PhotoBox 클릭 시 파일 선택 창 열기 */}
            {formData.photo ? (
                <PhotoPreview src={formData.photo} alt="Profile" />
              ) : (
                <label>{text.photo[language]}</label>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}  // fileInput에 ref 연결
                onChange={handlePhotoChange}
                hidden
              />
            </PhotoBox>
            <InputsColumn>
              <InputRow>
                <Input
                  type="text"
                  placeholder={text.name[language]}
                  value={formData.firstName || ""}
                  onChange={(e) => handleFormDataChange({ ...formData, firstName: e.target.value })}
                />
                <Input
                  type="text"
                  placeholder={text.nameEn[language]}
                  value={formData.firstNameEn || ""}
                  onChange={(e) => handleFormDataChange({ ...formData, firstNameEn: e.target.value })}
                />
              </InputRow>
              <InputRow marginTop="10px">
                <Input
                  type="text"
                  placeholder={text.surname[language]}
                  value={formData.name || ""}
                  onChange={(e) => handleFormDataChange({ ...formData, name: e.target.value })}
                />
                <Input
                  type="text"
                  placeholder={text.surnameEn[language]}
                  value={formData.nameEn || ""}
                  onChange={(e) => handleFormDataChange({ ...formData, nameEn: e.target.value })}
                />
              </InputRow>
              <InputRow marginTop="10px">
                <Input type="email" placeholder={text.email[language]} 
                  value={formData.email || ""}
                  onChange={(e) => handleFormDataChange({ ...formData, email: e.target.value })}/>
                <Input type="tel" placeholder={text.phone[language]} 
                  value={formData.phone || ""}
                  onChange={(e) => handleFormDataChange({ ...formData, phone: e.target.value })}/>
              </InputRow>
            </InputsColumn>
          </InfoSection>

          <BirthAddressSection>
            <div>
              <BirthTitle>{text.birth[language]}</BirthTitle>
              <Select
                value={birthYear}
                onChange={(e) => {
                  setBirthYear(e.target.value);
                  handleFormDataChange({ ...formData, birthYear: e.target.value });
                }}
              >
                <option value="년">년</option>
                {getYearOptions().map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Select>
              <Select
                value={birthMonth}
                onChange={(e) => {
                  const value = e.target.value;
                  setBirthMonth(value);
                  handleFormDataChange({ ...formData, birthMonth: value });
                }}
              >
                <option value="월">월</option>
                {getMonthOptions().map((month, index) => (
                  <option key={month} value={index + 1}>{month}</option>
                ))}
              </Select>
              <Select
                value={birthDay}
                onChange={(e) => {
                  const value = e.target.value;
                  setBirthDay(value);
                  handleFormDataChange({ ...formData, birthDay: value });
                }}
              >
                <option value="일">일</option>
                {getDayOptions().map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </Select>
            </div>
            <AddressSection>
              <AddressTitle>{text.address[language]}</AddressTitle>
              <AddressInput
                type="text"
                placeholder={text.address[language]}
                value={formData.address || ''}
                onChange={(e) => handleFormDataChange({ ...formData, address: e.target.value })}
              />
            </AddressSection>
          </BirthAddressSection>

          <MilitarySection>
            <MilitaryTitle>{text.military[language]}</MilitaryTitle>
            <StyledTable
              type="military"
              inputComponent={inputComponent}
              selectComponent={selectComponent}
              showMore={false}
            />

          </MilitarySection>
        </ResumeInput>

                <InputSection>
          {/* 학력 */}
          <SectionTitle>{text.sectionTitles[language].education}</SectionTitle>
          <StyledTable
            type="education"
            inputComponent={Input}
            selectComponent={Select}
            showMore={true}
            language={language}
            value={education}
            onChange={setLocalEducation}
          />

          {/* 경력 */}
          <SectionTitle>{text.sectionTitles[language].career}</SectionTitle>
          <StyledTable
            type="career"
            inputComponent={Input}
            selectComponent={Select}
            showMore={true}
            language={language}
            value={career}
            onChange={setLocalCareer}
          />

          {/* 자격증 */}
          <SectionTitle>{text.sectionTitles[language].certificate}</SectionTitle>
          <StyledTable
            type="certificate"
            inputComponent={Input}
            selectComponent={Select}
            showMore={true}
            language={language}
            value={certificate}
            onChange={setLocalCertificate}
          />

          {/* 외국어 */}
          <SectionTitle>{text.sectionTitles[language].language}</SectionTitle>
          <StyledTable
            type="languageSkills"
            inputComponent={Input}
            selectComponent={Select}
            showMore={true}
            language={language}
            value={languageSkills}
            onChange={setLocalLanguageSkills}
          />
        </InputSection>

        <StepButton>
          <PreButton onClick={() => navigate("/step3Page")}>
            {getText('prev')}
          </PreButton>
          <NextButton onClick={() => navigate("/step5Page")}>
            {getText('next')}
          </NextButton>
        </StepButton>
      </Container>
      <Footer language={currentLang} />
    </PageWrapper>
  );
}

// Styled-components
const PhotoPreview = styled.img`
  width: 120px;
  height: 150px;
  object-fit: cover;
`;

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
  min-width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#146c94" : "white")};
  color: ${(props) => (props.active ? "white" : "#146c94")};
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

const InputRow = styled.div`
  display: flex;
  gap: 10px;
  margin-top: ${props => props.marginTop || "0"};
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

const ResumeInput = styled.div`
  background-color: white;
  padding: 20px 30px;
  border-radius: 20px;
  box-shadow: 3px 3px 10px -3px gray;
  margin-bottom: 30px;
`;

const InputsColumn = styled.div`
  flex: 1;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
`;

const InputTitle = styled.h1`
  margin-top: 0;
  font-size: 1.2rem;
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

const Select = styled.select`
  flex: 1;
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  box-sizing: border-box;
  margin-right: 10px;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;
