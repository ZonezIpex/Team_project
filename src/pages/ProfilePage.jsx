import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header'; // 기존 Header 그대로 사용
import Footer from '../components/Footer'; // 기존 Footer 그대로 사용
import profileImg from '../assets/profile1.jpg'; // 프로필 이미지 파일
import MyPage from './MyPage';

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
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 40px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid white;
`;

const ProfileText = styled.div`
  color: white;
  font-size: clamp(1.2rem, 2vw, 1.6rem);
  font-weight: bold;
`;

const TabBox = styled.div`
  display: flex;
  background-color: #dbefff;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 40px;
`;

const Tab = styled.button`
  flex: 1;
  padding: 15px 30px;
  font-size: 1rem;
  background-color: ${({ active }) => (active ? '#b0d4f1' : '#dbefff')};
  border: none;
  cursor: pointer;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  color: ${({ active }) => (active ? '#000' : '#555')};

  &:hover {
    background-color: #cbe5ff;
  }
`;

const TabContent = styled.div`
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const ResumeCard = styled.div`
  width: 180px;
  height: 240px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 1px 1px 6px rgba(0,0,0,0.1);
`;

const ReviewCard = styled.div`
  width: 280px;
  min-height: 200px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 1px 1px 6px rgba(0,0,0,0.1);
  padding: 20px;
  line-height: 1.4;
`;

const Profile = () => {
  return (
    <PageWrapper>
      <Header />
      <Content>
        <Title>마이페이지</Title>

        {/* 개인정보 섹션 */}
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

        {/* 연락처 섹션 */}
        <InfoCard>
          <SectionTitle>연락처</SectionTitle>
          <InfoRow>
            <Label>이메일</Label>
            <Value>cutecheeseCAT@cat.com</Value>
          </InfoRow>
          <InfoRow>
            <Label>연락처</Label>
            <Value>2025년 4월 1일</Value>
          </InfoRow>
        </InfoCard>

        {/* 주소 섹션 */}
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

        {/* 푸터 정보 */}
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

export default MyPage;