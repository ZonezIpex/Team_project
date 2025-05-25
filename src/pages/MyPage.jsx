// src/pages/MyPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from "../components/Footer";
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
  max-width: 1000px;
`;

const TabHeader = styled.div`
  display: flex;
  background-color: #d2ecfb;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
`;

const TabButton = styled.button`
  flex: 1;
  background-color: ${(props) => (props.active ? "#64a8f0" : "#eaf8ff")};
  color: ${(props) => (props.active ? "#ffffff" : "#003049")};
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.8rem 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  border-top-left-radius: ${(props) => (props.position === "left" ? "16px" : "0")};
  border-top-right-radius: ${(props) => (props.position === "right" ? "16px" : "0")};
  border-bottom: ${(props) => (props.active ? "none" : "1px solid #ccc")};

  &:hover {
    background-color: ${(props) => (props.active ? "#64a8f0" : "#d2ecfb")};
  }
`;


const TabContentBox = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 40px 30px;
`;

const CardList = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
`;

const ResumeCard = styled.div`
  width: 200px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  img {
    width: 100%;
    height: 260px;
    object-fit: cover;
    border-bottom: 1px solid #eee;
  }

  &:hover {
    transform: translateY(-4px);
  }
`;

const ReviewCard = styled.div`
  width: 200px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  padding: 20px;
  font-size: 0.95rem;
  line-height: 1.5;
  transition: all 0.3s ease;
  cursor: pointer;

  strong {
    font-weight: bold;
    font-size: 1rem;
    display: block;
    margin-bottom: 5px;
  }

  &:hover {
    transform: translateY(-4px);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const MyPage = ({ language = 'ko', onChangeLanguage }) => {
  const [tab, setTab] = useState('resume');
  const [resumeItems, setResumeItems] = useState([resume1, resume1, resume1]);
  const [reviewItems, setReviewItems] = useState([1, 2, 3]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalText, setModalText] = useState(null);

  const navigate = useNavigate();

  const openModal = (image = null, text = null) => {
    setModalImage(image);
    setModalText(text);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImage(null);
    setModalText(null);
  };

  const t = {
    ko: {
      title: '마이페이지',
      profileName: '고냥이',
      info: '개인정보 🔗',
      blog: '블로그 🔗',
      resume: '이력서',
      review: '리뷰',
      reviewTitle: '진짜 최고의 이력서',
      reviewContent: '이력서 내용이 너무 마음에 들어서 내용이 너무 좋아요 이력서 내용이 너무 마음에 들어서 내용이 너무 좋아요',
      more: '더 보기',
    },
    en: {
      title: 'My Page',
      profileName: 'Kitty',
      info: 'Profile Info 🔗',
      blog: 'Blog 🔗',
      resume: 'Resume',
      review: 'Review',
      reviewTitle: 'Truly the Best Resume',
      reviewContent: 'I really loved the content of this resume. It was so well done and impressive.',
      more: 'Load more',
    },
  }[language];

  return (
    <PageWrapper>
      <Header language={language} onChangeLanguage={onChangeLanguage} />
      <Content>
        <Title>{t.title}</Title>

        <ProfileSection>
          <ProfileImage src={profileImg} alt="프로필" />
          <div>
            <ProfileText>{t.profileName}</ProfileText>
            <LinkText onClick={() => navigate('/ProfilePage')}>{t.info}</LinkText>
            <LinkText onClick={() => navigate('/blog')}>{t.blog}</LinkText>
          </div>
        </ProfileSection>

        <TabContainer>
          <TabHeader>
            <TabButton active={tab === 'resume'} onClick={() => setTab('resume')} position="left">
              {t.resume}
            </TabButton>
            <TabButton active={tab === 'review'} onClick={() => setTab('review')} position="right">
              {t.review}
            </TabButton>
          </TabHeader>

          <TabContentBox>
            {tab === 'resume' ? (
              <>
                <CardList>
                  {resumeItems.map((item, idx) => (
                    <ResumeCard key={idx} onClick={() => openModal(item)}>
                      <img src={item} alt="Resume" />
                    </ResumeCard>
                  ))}
                </CardList>
                <LinkText onClick={() => setResumeItems([...resumeItems, resume1])}>
                  + {t.more}
                </LinkText>
              </>
            ) : (
              <>
                <CardList>
                  {reviewItems.map((item, idx) => (
                    <ReviewCard key={idx} onClick={() => openModal(null, t.reviewContent)}>
                      <strong>{t.reviewTitle}</strong>
                      ⭐⭐⭐⭐⭐ <br />
                      {t.reviewContent}
                    </ReviewCard>
                  ))}
                </CardList>
                <LinkText onClick={() => setReviewItems([...reviewItems, reviewItems.length + 1])}>
                  + {t.more}
                </LinkText>
              </>
            )}
          </TabContentBox>
        </TabContainer>
      </Content>
      <Footer language={language} />

      {modalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            {modalImage && <img src={modalImage} alt="확대보기" />}
            {modalText && <p>{modalText}</p>}
          </ModalContent>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
};

export default MyPage;
