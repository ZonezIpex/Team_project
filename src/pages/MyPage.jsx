// src/pages/MyPage.jsx
import React, { useState } from 'react';
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
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
`;

const ReviewCard = styled.div`
  width: 280px;
  min-height: 200px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  line-height: 1.4;
`;

function MyPage({ language, onChangeLanguage }) {
  const [tab, setTab] = useState('resume');

  return (
    <PageWrapper>
      <Header language={language} onChangeLanguage={onChangeLanguage} />
      <Content>
        <Title>마이페이지</Title>

        <ProfileSection>
          <ProfileImage src={profileImg} alt="프로필" />
          <ProfileText>고냥이</ProfileText>
        </ProfileSection>

        <TabBox>
          <Tab active={tab === 'resume'} onClick={() => setTab('resume')}>
            이력서
          </Tab>
          <Tab active={tab === 'review'} onClick={() => setTab('review')}>
            리뷰
          </Tab>
        </TabBox>

        <TabContent>
          {tab === 'resume' ? (
            <>
              <ResumeCard />
              <ResumeCard />
              <ResumeCard />
              <ResumeCard />
            </>
          ) : (
            <>
              <ReviewCard>
                <strong>진짜 최고의 이력서</strong>
                <br />
                ⭐⭐⭐⭐⭐
                <br />
                이력서 내용이 너무 마음에 들어서 내용...
              </ReviewCard>
              <ReviewCard>
                <strong>진짜 최고의 이력서</strong>
                <br />
                ⭐⭐⭐⭐⭐
                <br />
                이력서 내용이 너무 마음에 들어서 내용...
              </ReviewCard>
              <ReviewCard>
                <strong>진짜 최고의 이력서</strong>
                <br />
                ⭐⭐⭐⭐⭐
                <br />
                이력서 내용이 너무 마음에 들어서 내용...
              </ReviewCard>
            </>
          )}
        </TabContent>
      </Content>
      <Footer />
    </PageWrapper>
  );
}

export default MyPage;
