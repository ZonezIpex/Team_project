import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profileImg from '../assets/profile1.jpg';



const PageWrapper = styled.div`
  background: linear-gradient(to bottom, #88ccf9, #b6e4ff, #d9f3ff, #f1fbff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex: 1;
  padding: 100px 20px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: white;
  margin-bottom: 30px;
  font-weight: bold;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
`;

const InfoCard = styled.div`
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  padding: 30px;
  width: 100%;
  max-width: 800px;
  margin-bottom: 30px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid black;
`;

const Label = styled.div`
  font-weight: bold;
  color: #333;
  width: 120px;
  white-space: nowrap;
`;

const Value = styled.div`
  color: #333;
  font-weight: bold;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  margin-bottom: 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  margin-right: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  width: 100%;
  max-width: 800px;
  margin: 20px auto 0 auto; 
`;

const DeleteButton = styled(Button)`
  background-color: #3399ff;
`;

const Input = styled.input`
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
  font-size: 1rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
`;

const translations = {
  ko: {
    title: '프로필 페이지',
    edit: '수정',
    save: '저장',
    delete: '회원 탈퇴',
    confirmDelete: '정말로 회원 탈퇴를 진행하시겠습니까?',
    passwordPlaceholder: '비밀번호를 입력하세요',
    cancel: '취소',
    section1: '기본 정보',
    birthLabel: '생년월일',
    genderLabel: '성별',
    section2: '연락처',
    emailLabel: '이메일',
    phoneLabel: '전화번호',
    section3: '주소 및 회사',
    homeLabel: '주소',
    companyLabel: '회사',
    section4: '군 복무',
    militaryLabel: '군 복무 여부',
    section5: '학력',
    educationLabel: '학력',
    section6: '경력',
    experienceLabel: '경력',
    section7: '자격증',
    certificateLabel: '자격증',
    section8: '어학 능력',
    languageLabel: '어학 능력',
  },
  en: {
    title: 'Profile Page',
    edit: 'Edit',
    save: 'Save',
    delete: 'Delete Account',
    confirmDelete: 'Are you sure you want to delete your account?',
    passwordPlaceholder: 'Enter your password',
    cancel: 'Cancel',
    section1: 'Basic Information',
    birthLabel: 'Birthday',
    genderLabel: 'Gender',
    section2: 'Contact',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    section3: 'Address & Company',
    homeLabel: 'Address',
    companyLabel: 'Company',
    section4: 'Military Service',
    militaryLabel: 'Military Service',
    section5: 'Education',
    educationLabel: 'Education',
    section6: 'Experience',
    experienceLabel: 'Experience',
    section7: 'Certificate',
    certificateLabel: 'Certificate',
    section8: 'Language Skills',
    languageLabel: 'Language Skills',
  },
};

const ProfilePage = ({ language = 'ko', onChangeLanguage }) => {
  const t = (key) => translations[language]?.[key] || key;

  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    const mockData = {
      name: '고냥이',
      birthday: '2025년 4월 1일',
      gender: '고양이',
      email: 'cutecheeseCAT@cat.com',
      phone: '010-1234-5678',
      home: '대림대 전산관 5층 디지털미디어실습실',
      company: '안양시청',
      military: '면제',
      education: '대림대학교 컴퓨터 정보학부 졸업',
      experience: '프론트엔드 인턴 (2024.01 ~ 2024.06)',
      certificate: '정보처리기사',
      languageSkills: '영어 (중), 일본어 (초)',
    };
    setTimeout(() => {
      setProfileData(mockData);
      setFormData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEditToggle = () => {
    if (editMode) setProfileData(formData);
    setEditMode(!editMode);
  };

  const handleDeleteAccount = () => {
    if (passwordInput.trim()) {
      alert('회원 탈퇴 완료되었습니다.');
      setShowDeleteModal(false);
      // 실제 API 호출은 여기서
    } else {
      alert('비밀번호를 입력해주세요.');
    }
  };

  const renderField = (label, field) => (
    <InfoRow key={field}>
      <Label>{label}</Label>
      {editMode ? (
        <Input
          type="text"
          value={formData[field] || ''}
          onChange={(e) => handleChange(field, e.target.value)}
        />
      ) : (
        <Value>{profileData[field]}</Value>
      )}
    </InfoRow>
  );

  if (loading || !profileData) return <div>Loading...</div>;

  return (
    <PageWrapper>
      <Header language={language} onChangeLanguage={onChangeLanguage} />
      <Content>
        <Title>{t('title')}</Title>

        <InfoCard>
          <SectionTitle>{t('section1')}</SectionTitle>
          <InfoRow>
            <ProfileImage src={profileImg} alt="프로필 사진" />
            {editMode ? (
              <Input
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            ) : (
              <Value>{profileData.name}</Value>
            )}
          </InfoRow>
          {renderField(t('birthLabel'), 'birthday')}
          {renderField(t('genderLabel'), 'gender')}
        </InfoCard>

        <InfoCard>
          <SectionTitle>{t('section2')}</SectionTitle>
          {renderField(t('emailLabel'), 'email')}
          {renderField(t('phoneLabel'), 'phone')}
        </InfoCard>

        <InfoCard>
          <SectionTitle>{t('section3')}</SectionTitle>
          {renderField(t('homeLabel'), 'home')}
          {renderField(t('companyLabel'), 'company')}
        </InfoCard>

        <InfoCard>
          <SectionTitle>{t('section4')}</SectionTitle>
          {renderField(t('militaryLabel'), 'military')}
        </InfoCard>

        <InfoCard>
          <SectionTitle>{t('section5')}</SectionTitle>
          {renderField(t('educationLabel'), 'education')}
        </InfoCard>

        <InfoCard>
          <SectionTitle>{t('section6')}</SectionTitle>
          {renderField(t('experienceLabel'), 'experience')}
        </InfoCard>

        <InfoCard>
          <SectionTitle>{t('section7')}</SectionTitle>
          {renderField(t('certificateLabel'), 'certificate')}
        </InfoCard>

        <InfoCard>
          <SectionTitle>{t('section8')}</SectionTitle>
          {renderField(t('languageLabel'), 'languageSkills')}
        </InfoCard>
      </Content>

      <ButtonWrapper>
        <Button onClick={handleEditToggle}>
          {editMode ? t('save') : t('edit')}
        </Button>
        <DeleteButton onClick={() => setShowDeleteModal(true)}>
          {t('delete')}
        </DeleteButton>
      </ButtonWrapper>

      {showDeleteModal && (
        <ModalOverlay>
          <ModalBox>
            <p>{t('confirmDelete')}</p>
            <Input
              type="password"
              placeholder={t('passwordPlaceholder')}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleDeleteAccount}>{t('delete')}</Button>
              <DeleteButton onClick={() => setShowDeleteModal(false)}>{t('cancel')}</DeleteButton>
            </div>
          </ModalBox>
        </ModalOverlay>
      )}

      <Footer language={language} />
    </PageWrapper>
  );
};

export default ProfilePage;
