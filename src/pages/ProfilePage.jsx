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

const ProfilePage = () => {
  return (
    <PageWrapper>
      <Header />
      <Content>
        <Title>마이페이지</Title>

        <InfoCard>
          <SectionTitle>개인정보</SectionTitle>
          <InfoRow>
            <ProfileImage src={profileImg} alt="프로필 사진" />
            <Value>고냥이</Value>
          </InfoRow>
          <InfoRow>
            <Label>생년월일</Label>
            <Value>2025년 4월 1일</Value>
          </InfoRow>
          <InfoRow>
            <Label>성별</Label>
            <Value>고양이</Value>
          </InfoRow>
        </InfoCard>

        <InfoCard>
          <SectionTitle>연락처</SectionTitle>
          <InfoRow>
            <Label>이메일</Label>
            <Value>cutecheeseCAT@cat.com</Value>
          </InfoRow>
          <InfoRow>
            <Label>연락처</Label>
            <Value>010-1234-5678</Value>
          </InfoRow>
        </InfoCard>

        <InfoCard>
          <SectionTitle>주소</SectionTitle>
          <InfoRow>
            <Label>집</Label>
            <Value>대림대 전산관 5층 디지털미디어실습실</Value>
          </InfoRow>
          <InfoRow>
            <Label>회사</Label>
            <Value>안양시청</Value>
          </InfoRow>
        </InfoCard>

        <FooterText>
          13916 경기도 안양시 동안구 임곡로 29 대림대학교 | 대표전화 : 031-467-4700
          <br />
          Copyright 학사누 ALL RIGHTS RESERVED
        </FooterText>
      </Content>
      <Footer />
    </PageWrapper>
  );
};

export default ProfilePage;
