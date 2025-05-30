// src/pages/MyPage.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profileImg from '../assets/profile1.jpg';
import resume1 from '../assets/이력서이미지.jpg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  color: #fff;
  margin-bottom: 40px;
  font-weight: 700;
`;

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 50px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 20px;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
`;

const ProfileText = styled.div`
  color: #fff;
  font-size: 1.4rem;
  font-weight: 600;
`;

const LinkText = styled.div`
  color: #fff;
  font-size: 1rem;
  margin-top: 10px;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.2s;

  &:hover {
    color: #ffe169;
  }
`;

const TabContainer = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const TabHeader = styled.div`
  display: flex;
  background-color: #d9f1ff;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
`;

const TabButton = styled.button`
  flex: 1;
  background-color: ${(props) => (props.active ? "#5ca7e8" : "#eaf8ff")};
  color: ${(props) => (props.active ? "#fff" : "#004080")};
  font-size: 1.05rem;
  font-weight: 600;
  padding: 1rem;
  border: none;
  cursor: pointer;
  border-top-left-radius: ${(props) => (props.position === "left" ? "16px" : "0")};
  border-top-right-radius: ${(props) => (props.position === "right" ? "16px" : "0")};
  border-bottom: ${(props) => (props.active ? "none" : "1px solid #ccc")};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? "#5ca7e8" : "#cbe9ff")};
  }
`;

const TabContentBox = styled.div`
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.06);
  padding: 40px 30px;
`;

const CardList = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;
`;

const ResumeCard = styled.div`
  width: 220px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;

  img {
    width: 100%;
    height: 260px;
    object-fit: cover;
    border-bottom: 1px solid #e0e0e0;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  }
`;

const ReviewCard = styled.div`
  width: 220px;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  padding: 20px;
  font-size: 0.95rem;
  line-height: 1.5;
  cursor: pointer;
  transition: all 0.3s ease;

  strong {
    display: block;
    font-size: 1.05rem;
    font-weight: 700;
    margin-bottom: 6px;
    color: #333;
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
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
  background: #fff;
  border-radius: 20px;
  padding: 24px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  text-align: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #444;
  }
`;

const MyPage = ({ language = 'ko', onChangeLanguage }) => {
  const [tab, setTab] = useState('resume');
  const [resumeItems, setResumeItems] = useState([]);
  const [reviewItems, setReviewItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalText, setModalText] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resumesRes, reviewsRes] = await Promise.all([
          axios.get('/api/resumes'),
          axios.get('/api/reviews'),
        ]);
        setResumeItems(resumesRes.data);
        setReviewItems(reviewsRes.data);
      } catch (err) {
        console.error("데이터 로딩 오류:", err);
      }
    };
    fetchData();
  }, []);

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
      reviewContent: '이력서 내용이 너무 마음에 들어서 내용이 너무 좋아요.',
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
      reviewContent: 'I really loved the content of this resume. It was so impressive.',
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
                    <ReviewCard key={idx} onClick={() => openModal(null, item.content)}>
                      <strong>{item.title}</strong>
                      ⭐⭐⭐⭐⭐ <br />
                      {item.content}
                    </ReviewCard>
                  ))}
                </CardList>
                <LinkText onClick={() => setReviewItems([...reviewItems, { title: t.reviewTitle, content: t.reviewContent }])}>
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
