import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import resumeImage from "../assets/resume-1.jpg";

const ReviewList = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState(localStorage.getItem("language") || "ko");

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = {
    popular: language === "ko" ? "인기 리뷰" : "Popular Reviews",
    latest: language === "ko" ? "최신 리뷰" : "Latest Reviews",
    myReviews: language === "ko" ? "내 리뷰" : "My Reviews",
    allReviews: language === "ko" ? "전체 리뷰" : "All Reviews",
    title: language === "ko" ? "리뷰 제목" : "Review Title",
    content: language === "ko" ? "리뷰 내용" : "Review Content",
    myTitle: language === "ko" ? "작성한 리뷰 제목" : "My Review Title",
    myContent: language === "ko" ? "작성한 리뷰 내용" : "My Review Content",
    write: language === "ko" ? "리뷰 작성하기" : "Write Review",
    labelTitle: language === "ko" ? "제목 :" : "Title:"
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const reviewsPerSlide = 4;
  const totalReviews = 8;
  const cardWidth = 260;
  const maxOffset = (totalReviews - reviewsPerSlide) * cardWidth;
  const offset = Math.min(currentIndex * cardWidth * reviewsPerSlide, maxOffset);

  const [activeTab, setActiveTab] = useState("popular");

  const [popularLikedStates, setPopularLikedStates] = useState(Array(8).fill(false));
  const [latestLikedStates, setLatestLikedStates] = useState(Array(8).fill(false));
  const [myLikedStates, setMyLikedStates] = useState(Array(8).fill(false));
  const [bottomLikedStates, setBottomLikedStates] = useState(Array(12).fill(false));

  const toggleLike = (setter) => (index) => {
  setter((prev) => {
    const updated = [...prev];
    updated[index] = !updated[index];
    return updated;
  });
};

  const renderReviews = () => {
    let likedStates = [];
    let toggleFunc;

    if (activeTab === "popular") {
      likedStates = popularLikedStates;
      toggleFunc = (i) => setPopularLikedStates(toggleLike(popularLikedStates, i));
    } else if (activeTab === "latest") {
      likedStates = latestLikedStates;
      toggleFunc = (i) => setLatestLikedStates(toggleLike(latestLikedStates, i));
    } else {
      likedStates = myLikedStates;
      toggleFunc = (i) => setMyLikedStates(toggleLike(myLikedStates, i));
    }

    return [...Array(8)].map((_, i) => (
      <Card key={i}>
        <ResumeImage src={resumeImage} />
        <LikeButton onClick={() => toggleFunc(i)}>
          {likedStates[i] ? <FaHeart style={{ color: "#ff6b6b" }} /> : <FaRegHeart />}
        </LikeButton>
        <ReviewInfo>
          <div>
            {activeTab === "myReviews"
              ? t.myTitle
              : t.title}
          </div>
          <div>
            {activeTab === "myReviews"
              ? t.myContent
              : t.content}
          </div>
        </ReviewInfo>
      </Card>
    ));
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalReviews - reviewsPerSlide) setCurrentIndex(currentIndex + 1);
  };

  return (
    <PageWrapper>
      <Header onChangeLanguage={setLanguage} language={language} />
      <Container>
        <Section>
          <TitleContainer>
            <TitleWrapper>
              <TitleButton active={activeTab === "popular"} onClick={() => setActiveTab("popular")}>{t.popular}</TitleButton>
              <TitleButton active={activeTab === "latest"} onClick={() => setActiveTab("latest")}>{t.latest}</TitleButton>
              <TitleButton active={activeTab === "myReviews"} onClick={() => setActiveTab("myReviews")}>{t.myReviews}</TitleButton>
            </TitleWrapper>
          </TitleContainer>

          <BoxWrapper>
            <LeftArrowButton onClick={handlePrev}>◀</LeftArrowButton>
            <SliderWrapper>
              <Slider offset={offset}>{renderReviews()}</Slider>
            </SliderWrapper>
            <RightArrowButton onClick={handleNext}>▶</RightArrowButton>
          </BoxWrapper>
        </Section>

        <Section>
          <Title>{t.allReviews}</Title>
          <br />
          <br />
          <AllReviewsContainer>
            <VerticalSlider>
              <Grid>
                {[...Array(12)].map((_, i) => (
                  <Card key={i}>
                    <ResumeImage src={resumeImage} />
                    <LikeButton onClick={() => {
                      const updated = [...bottomLikedStates];
                      updated[i] = !updated[i];
                      setBottomLikedStates(updated);
                    }}>
                      {bottomLikedStates[i] ? <FaHeart style={{ color: "#ff6b6b" }} /> : <FaRegHeart />}
                    </LikeButton>
                    <ReviewInfo>
                      <div>{t.labelTitle}</div>
                      <div>{t.content}</div>
                    </ReviewInfo>
                  </Card>
                ))}
              </Grid>
            </VerticalSlider>
          </AllReviewsContainer>
        </Section>

        <WriteButton onClick={() => navigate("/review/write")}>{t.write}</WriteButton>
      </Container>
      <Footer language={language} />
    </PageWrapper>
  );
};

export default ReviewList;

// styled-components 생략 (이전 그대로 유지)
const Title = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  padding: 0;
`;
// 스타일 컴포넌트 (수정 금지)
const PageWrapper = styled.div`
  background: linear-gradient(to bottom, #88ccf9, #b6e4ff, #d9f3ff, #f1fbff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  background: linear-gradient(to bottom, #88ccf9, #b6e4ff, #d9f3ff, #f1fbff);
  width: 100%;
`;

const SliderWrapper = styled.div`
  overflow: hidden;
  width: 100%;
`;

const LeftArrowButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 2rem;
  color: white; // 색상
  cursor: pointer;
  &:hover {
    color: #64a8f0; // 🔹 hover 시 색상 바꾸고 싶으면 여기도 설정 가능
  }
`;

const RightArrowButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 2rem;
  color: white; // 색상
  cursor: pointer;
  &:hover {
    color: #64a8f0; // 🔹 hover 시 색상 바꾸고 싶으면 여기도 설정 가능
  }
`;

const Section = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TitleWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  gap: 0rem;
  margin-bottom: 1rem;
  margin-left: -37rem;
`;

/*인기/최신/내 리뷰 박스*/
const TitleButton = styled.button`
  background-color: ${(props) => (props.active ? "#b6e4ff" : "#64a8f0")};
  color: ${(props) => (props.active ? "#003049" : "#fff")};
  font-size: 1.2rem;
  font-weight: bold;
  padding: 0.6rem 1.4rem;
  border-radius: 16px 16px 0 0;
  margin-top: 20px;
  margin-right: 0rem;
  margin-bottom: -16px;
  border: none;
  cursor: pointer;
`;

const Slider = styled.div`
  display: flex;
  gap: 1.3rem; //수정
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => `-${props.offset}px`});
  width: fit-content;
`;

/*상단 컨테이너*/
const BoxWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  max-width: 1120px; //1120수정
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b6e4ff;
  border-radius: 0px 16px 16px 16px;
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.2rem;
  width: 200px;
  min-height: 280px;
  border: 1.5px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResumeImage = styled.img`
  width: 100%;
  height: 270px;
  object-fit: contain;
  image-rendering: auto; /* 또는 crisp-edges, pixelated 등 테스트 */
  transform: translateZ(0); /* GPU 가속 유도 */
`;

const ReviewInfo = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  text-align: left;
  word-break: keep-all;
  width: 100%;
  max-width: 180px;
`;

const AllReviewsContainer = styled.div`
  background-color: #b6e4ff;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  max-width: 1150px;
  margin: 0 auto;
  height: 630px;
`;

const LikeButton = styled.button`
  margin-top: 0.5rem;
  border: none;
  background: none;
  color: #333;
  cursor: pointer;
  align-self: flex-start;
  font-size: 1.2rem;
`;

const WriteButton = styled.button`
  background-color: #146c94;
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 999px;
  font-size: 1rem;
  border: none;
  display: block;
  margin: 2rem auto 1rem auto;
  cursor: pointer;
  transform: translateX(390%);

  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: white;
    color: #146c94;
  }
`;

const VerticalSlider = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 600px;
  overflow-y: auto;
  padding-bottom: 0.5rem;

  &::-webkit-scrollbar {
    width: 10px; /* 스크롤바 너비 */
  }

  &::-webkit-scrollbar-track {
    background: #e0f3ff; /* 트랙 배경색 */
    border-radius: 9px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #64a8f0; /* 슬라이더 색상 */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color:rgb(68, 115, 165); /* hover 시 색상 */
  }
`;
