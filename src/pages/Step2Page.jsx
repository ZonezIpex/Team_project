import React, { useState, useRef } from "react";
import styled from "styled-components";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const Step2Page = ({ language, onChangeLanguage, formData, handleFormDataChange }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleFormDataChange({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => fileInputRef.current?.click();

  const text = {
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
    prev: { ko: "이전", en: "Previous" },
    next: { ko: "다음", en: "Next" },
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
  };

  const getMonthOptions = () => Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const getDayOptions = () => Array.from({ length: 31 }, (_, i) => `${i + 1}`);

  const [birthYear, setBirthYear] = useState(formData.birthYear || '년');
  const [birthMonth, setBirthMonth] = useState(formData.birthMonth || '월');
  const [birthDay, setBirthDay] = useState(formData.birthDay || '일');

  const handleNext = () => navigate("/step3Page", { state: { formData } });

  return (
    <PageWrapper>
      <Header language={language} onChangeLanguage={onChangeLanguage} />
      <Container>
        <Title>{text.title[language]}</Title>

        <ResumeInput>
          <InputTitle>{text.inputTitle[language]}</InputTitle>
          <InfoSection>
            <PhotoBox onClick={handlePhotoClick}>
              {formData.photo ? (
                <PhotoPreview src={formData.photo} alt="Profile" />
              ) : (
                <label>{text.photo[language]}</label>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
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
                <Input
                  type="email"
                  placeholder={text.email[language]}
                  value={formData.email || ""}
                  onChange={(e) => handleFormDataChange({ ...formData, email: e.target.value })}
                />
                <Input
                  type="tel"
                  placeholder={text.phone[language]}
                  value={formData.phone || ""}
                  onChange={(e) => handleFormDataChange({ ...formData, phone: e.target.value })}
                />
              </InputRow>
            </InputsColumn>
          </InfoSection>

          <BirthAddressSection>
            <div>
              <BirthTitle>{text.birth[language]}</BirthTitle>
              <Select value={birthYear} onChange={(e) => {
                setBirthYear(e.target.value);
                handleFormDataChange({ ...formData, birthYear: e.target.value });
              }}>
                <option value="년">년</option>
                {getYearOptions().map((year) => <option key={year} value={year}>{year}</option>)}
              </Select>
              <Select value={birthMonth} onChange={(e) => {
                setBirthMonth(e.target.value);
                handleFormDataChange({ ...formData, birthMonth: e.target.value });
              }}>
                <option value="월">월</option>
                {getMonthOptions().map((month, i) => <option key={month} value={i + 1}>{month}</option>)}
              </Select>
              <Select value={birthDay} onChange={(e) => {
                setBirthDay(e.target.value);
                handleFormDataChange({ ...formData, birthDay: e.target.value });
              }}>
                <option value="일">일</option>
                {getDayOptions().map((day) => <option key={day} value={day}>{day}</option>)}
              </Select>
            </div>

            <AddressSection>
              <AddressTitle>{text.address[language]}</AddressTitle>
              <AddressInput
                type="text"
                placeholder={text.address[language]}
                value={formData.address || ""}
                onChange={(e) => handleFormDataChange({ ...formData, address: e.target.value })}
              />
            </AddressSection>
          </BirthAddressSection>

          <MilitarySection>
            <MilitaryTitle>{text.military[language]}</MilitaryTitle>
            <InputRow>
              <Input
                type="text"
                placeholder="복무기간"
                value={formData.military?.servicePeriod || ""}
                onChange={(e) =>
                  handleFormDataChange({
                    ...formData,
                    military: { ...formData.military, servicePeriod: e.target.value },
                  })
                }
              />
              <Input
                type="text"
                placeholder="군별"
                value={formData.military?.branch || ""}
                onChange={(e) =>
                  handleFormDataChange({
                    ...formData,
                    military: { ...formData.military, branch: e.target.value },
                  })
                }
              />
              <Input
                type="text"
                placeholder="계급"
                value={formData.military?.rank || ""}
                onChange={(e) =>
                  handleFormDataChange({
                    ...formData,
                    military: { ...formData.military, rank: e.target.value },
                  })
                }
              />
              <Input
                type="text"
                placeholder="병과"
                value={formData.military?.specialty || ""}
                onChange={(e) =>
                  handleFormDataChange({
                    ...formData,
                    military: { ...formData.military, specialty: e.target.value },
                  })
                }
              />
            </InputRow>

            <InputRow marginTop="10px">
              <Select
                value={formData.military?.served || ""}
                onChange={(e) =>
                  handleFormDataChange({
                    ...formData,
                    military: { ...formData.military, served: e.target.value },
                  })
                }
              >
                <option value="">병역여부</option>
                <option value="예">예</option>
                <option value="아니오">아니오</option>
              </Select>

              <Select
                value={formData.military?.veteran || ""}
                onChange={(e) =>
                  handleFormDataChange({
                    ...formData,
                    military: { ...formData.military, veteran: e.target.value },
                  })
                }
              >
                <option value="">보훈대상</option>
                <option value="예">예</option>
                <option value="아니오">아니오</option>
              </Select>
            </InputRow>
          </MilitarySection>
        </ResumeInput>

        <StepButton>
          <PreButton onClick={() => navigate('/step1Page')}>
            {text.prev[language]}
          </PreButton>
          <NextButton onClick={handleNext}>
            {text.next[language]}
          </NextButton>
        </StepButton>
      </Container>
      <Footer language={language} />
    </PageWrapper>
  );
};

export default Step2Page;

// 스타일 컴포넌트는 그대로 유지됩니다.


// 스타일 컴포넌트는 그대로 유지됩니다.


const PageWrapper = styled.div`background: linear-gradient(to bottom, #88ccf9, #b6e4ff, #d9f3ff, #f1fbff); min-height: 100vh; display: flex; flex-direction: column;`;
const Container = styled.div`flex: 1; padding: 2rem; display: flex; flex-direction: column; align-items: center; font-family: sans-serif; text-align: center;`;
const Title = styled.h1`font-size: clamp(1.8rem, 3vw, 2.5rem); color: white; margin-top: 100px; margin-bottom: 30px;`;
const ResumeInput = styled.div`background-color: white; padding: 20px 30px; border-radius: 20px; box-shadow: 3px 3px 10px -3px gray;`;
const InputTitle = styled.h1`margin-top: 0; font-size: 1.2rem;`;
const InfoSection = styled.div`display: flex; gap: 20px; margin-top: 30px; width: 100%; max-width: 800px;`;
const PhotoBox = styled.div`width: 120px; height: 150px; border: 1px solid #aaa; display: flex; justify-content: center; align-items: center; flex-shrink: 0; cursor: pointer;`;
const PhotoPreview = styled.img`width: 120px; height: 150px; object-fit: cover;`;
const InputsColumn = styled.div`flex: 1; margin-top: 20px;`;
const InputRow = styled.div`display: flex; gap: 10px; margin-top: ${props => props.marginTop || "0"};`;
const Input = styled.input`flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; box-sizing: border-box;`;
const Select = styled.select`flex: 1; padding: 10px 20px; border: 1px solid #ccc; border-radius: 8px; font-size: 14px; box-sizing: border-box; margin-right: 10px;`;
const BirthTitle = styled.h4`margin-bottom: 10px; margin-left: 5px; text-align: left;`;
const BirthAddressSection = styled.div`display: flex; flex-wrap: wrap; gap: 20px; margin-top: 20px; width: 100%; max-width: 1000px;`;
const AddressSection = styled.div`margin-left: 20px; flex: 1; max-width: 600px;`;
const AddressTitle = styled.h4`margin-bottom: 10px; margin-left: 5px; text-align: left;`;
const AddressInput = styled(Input)`flex: 1; width: 100%; min-width: 0;`;
const MilitarySection = styled.div`width: 100%; overflow-x: auto; max-width: 100%; margin-top: 30px; text-align: left;`;
const MilitaryTitle = styled.h4`margin-bottom: 10px; margin-left: 5px;`;
const LinkText = styled.div`color: white; background-color: #146c94; border: 1px solid #146c94; border-radius: 20px; font-size: 1rem; cursor: pointer; text-decoration: none; padding: 8px 20px; &:hover { color: #146c94; background-color: white; }`;
const PreButton = styled(LinkText)`margin-left: 30px;`;
const NextButton = styled(LinkText)`text-align: left; margin-right: 30px;`;
const StepButton = styled.div`width: 100%; max-width: 900px; margin: 50px auto 0; display: flex; justify-content: space-between; align-items: center;`;
