// src/pages/ProfilePage.jsx
import React from 'react';
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
  width: 80px;
`;

const Value = styled.div`
  color: #333;
  font-weight: bold;
`;

const FooterText = styled.div`
  margin-top: 40px;
  font-size: 0.85rem;
  color: #555;
  text-align: center;
`;

const ProfilePage = ({ language = 'ko', onChangeLanguage }) => {
  const t = {
    ko: {
      title: '마이페이지',
      section1: '개인정보',
      section2: '연락처',
      section3: '주소',
      name: '고냥이',
      birthday: '2025년 4월 1일',
      gender: '고양이',
      email: 'cutecheeseCAT@cat.com',
      phone: '010-1234-5678',
      home: '대림대 전산관 5층 디지털미디어실습실',
      company: '안양시청',
      birthLabel: '생년월일',
      genderLabel: '성별',
      emailLabel: '이메일',
      phoneLabel: '연락처',
      homeLabel: '집',
      companyLabel: '회사',
      footer: `13916 경기도 안양시 동안구 임곡로 29 대림대학교 | 대표전화 : 031-467-4700
Copyright 학사누 ALL RIGHTS RESERVED`,
    },
    en: {
      title: 'My Page',
      section1: 'Personal Info',
      section2: 'Contact',
      section3: 'Address',
      name: 'Kitty',
      birthday: 'April 1, 2025',
      gender: 'Cat',
      email: 'cutecheeseCAT@cat.com',
      phone: '010-1234-5678',
      home: 'Daelim Univ. IT Lab, 5F',
      company: 'Anyang City Hall',
      birthLabel: 'Birthday',
      genderLabel: 'Gender',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      homeLabel: 'Home',
      companyLabel: 'Work',
      footer: `13916 Daelim University, 29 Imgok-ro, Dongan-gu, Anyang-si, Gyeonggi-do | Tel: 031-467-4700
Copyright © HaksaNU ALL RIGHTS RESERVED`,
    },
  }[language];

  return (
    <PageWrapper>
      <Header language={language} onChangeLanguage={onChangeLanguage} />
      <Content>
        <Title>{t.title}</Title>

        <InfoCard>
          <SectionTitle>{t.section1}</SectionTitle>
          <InfoRow>
            <ProfileImage src={profileImg} alt="프로필 사진" />
            <Value>{t.name}</Value>
          </InfoRow>
          <InfoRow>
            <Label>{t.birthLabel}</Label>
            <Value>{t.birthday}</Value>
          </InfoRow>
          <InfoRow>
            <Label>{t.genderLabel}</Label>
            <Value>{t.gender}</Value>
          </InfoRow>
        </InfoCard>

        <InfoCard>
          <SectionTitle>{t.section2}</SectionTitle>
          <InfoRow>
            <Label>{t.emailLabel}</Label>
            <Value>{t.email}</Value>
          </InfoRow>
          <InfoRow>
            <Label>{t.phoneLabel}</Label>
            <Value>{t.phone}</Value>
          </InfoRow>
        </InfoCard>

        <InfoCard>
          <SectionTitle>{t.section3}</SectionTitle>
          <InfoRow>
            <Label>{t.homeLabel}</Label>
            <Value>{t.home}</Value>
          </InfoRow>
          <InfoRow>
            <Label>{t.companyLabel}</Label>
            <Value>{t.company}</Value>
          </InfoRow>
        </InfoCard>

        <FooterText>{t.footer}</FooterText>
      </Content>
      <Footer />
    </PageWrapper>
  );
};

export default ProfilePage;
