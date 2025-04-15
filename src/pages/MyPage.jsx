// src/pages/MyPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profileImg from '../assets/profile1.jpg';
import resume1 from '../assets/이력서이미지.jpg';
import { useNavigate } from 'react-router-dom';

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
  margin-bottom: 40px;
  font-weight: bold;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
  margin-bottom: 50px;
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

const LinkText = styled.div`
  color: white;
  font-size: 1rem;
  margin-top: 6px;
  cursor: pointer;
  text-decoration: underline;
  transition: 0.2s;

  &:hover {
    color: #ffeb3b;
  }
`;

const TabContainer = styled.div`
  width: 100%;
  max-width: 900px;
`;

const TabHeader = styled.div`
  display: flex;
`;

const TabButton = styled.button`
  flex: 1;
  padding: 15px 0;
  background-color: ${({ active }) => (active ? 'white' : '#dbefff')};
  color: ${({ active }) => (active ? '#333' : '#555')};
  border: 2px solid #7fc6ff;
  border-bottom: none;
  border-radius: 12px 12px 0 0;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: white;
    color: #333;
  }
`;

const TabContentBox = styled.div`
  background-color: white;
  border: 2px solid #7fc6ff;
  border-radius: 0 0 12px 12px;
  padding: 40px 20px;
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
`;

const ResumeCard = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: 0.2s;

  img {
    width: 100%;
    height: 240px;
    object-fit: cover;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ReviewCard = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  min-height: 200px;
  line-height: 1.5;
  transition: 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const MyPage = ({ language, onChangeLanguage }) => {
  const [tab, setTab] = useState('resume');
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Header language={language} onChangeLanguage={onChangeLanguage} />
      <Content>
        <Title>마이페이지</Title>

        <ProfileSection>
          <ProfileImage src={profileImg} alt="프로필" />
          <div>
            <ProfileText>고냥이</ProfileText>
            <LinkText onClick={() => navigate('/ProfilePage')}>개인정보 🔗</LinkText>
            <LinkText onClick={() => navigate('/blog')}>블로그 🔗</LinkText>
          </div>
        </ProfileSection>

        <TabContainer>
          <TabHeader>
            <TabButton active={tab === 'resume'} onClick={() => setTab('resume')}>
              이력서
            </TabButton>
            <TabButton active={tab === 'review'} onClick={() => setTab('review')}>
              리뷰
            </TabButton>
          </TabHeader>

          <TabContentBox>
            {tab === 'resume' ? (
              <CardList>
                {[...Array(3)].map((_, idx) => (
                  <ResumeCard key={idx}>
                    <img src={resume1} alt="이력서" />
                  </ResumeCard>
                ))}
              </CardList>
            ) : (
              <CardList>
                {[...Array(3)].map((_, idx) => (
                  <ReviewCard key={idx}>
                    <strong>진짜 최고의 이력서</strong><br />
                    ⭐⭐⭐⭐⭐<br />
                    이력서 내용이 너무 마음에 들어서 내용...
                  </ReviewCard>
                ))}
              </CardList>
            )}
          </TabContentBox>
        </TabContainer>
      </Content>
      <Footer />
    </PageWrapper>
  );
};

export default MyPage;
