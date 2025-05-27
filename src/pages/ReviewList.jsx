import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import resumeImage from "../assets/이력서이미지.jpg";
import { useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const TOTAL_PER_TYPE = 12;

const allTopReviews = [
  ...Array.from({ length: TOTAL_PER_TYPE }, (_, i) => ({
    id: i,
    title: `인기 리뷰 ${i + 1}`,
    desc: "리뷰 설명이 들어갑니다.",
    image: resumeImage,
    type: "인기",
  })),
  ...Array.from({ length: TOTAL_PER_TYPE }, (_, i) => ({
    id: 100 + i,
    title: `최신 리뷰 ${i + 1}`,
    desc: "리뷰 설명이 들어갑니다.",
    image: resumeImage,
    type: "최신",
  })),
  ...Array.from({ length: TOTAL_PER_TYPE }, (_, i) => ({
    id: 200 + i,
    title: `내 리뷰 ${i + 1}`,
    desc: "리뷰 설명이 들어갑니다.",
    image: resumeImage,
    type: "내",
  })),
];

const bottomReviews = Array.from({ length: 15 }, (_, i) => ({
  id: 300 + i,
  title: `전체 리뷰 ${i + 1}`,
  desc: "하단 독립 리뷰 설명입니다.하단 독립 리뷰 설명입니다하단 독립 리뷰 설명입니다하단 독립 리뷰 설명입니다하단 독립 리뷰 설명입니다하단 독립 리뷰 설명입니다",
  image: resumeImage,
}));

const ReviewList = () => {
  const navigate = useNavigate();

  const [language, setLanguage] = useState(localStorage.getItem("language") || "ko");
  const [page, setPage] = useState(0);
  const [imagesPerPage, setImagesPerPage] = useState(3);
  const [reviewType, setReviewType] = useState("인기");

  const [sliderPopularLiked, setSliderPopularLiked] = useState({});
  const [sliderLatestLiked, setSliderLatestLiked] = useState({});
  const [sliderMyLiked, setSliderMyLiked] = useState({});
  const [bottomLikedMap, setBottomLikedMap] = useState({});

  const [sliderPopularLikes, setSliderPopularLikes] = useState({});
  const [sliderLatestLikes, setSliderLatestLikes] = useState({});
  const [sliderMyLikes, setSliderMyLikes] = useState({});
  const [bottomLikeCountMap, setBottomLikeCountMap] = useState({});

  const [selectedReview, setSelectedReview] = useState(null);

  const [offset, setOffset] = useState(0);


  const text = {
    popular: language === "ko" ? "인기 리뷰" : "Popular",
    latest: language === "ko" ? "최신 리뷰" : "Latest",
    mine: language === "ko" ? "내 리뷰" : "My Review",
    all: language === "ko" ? "전체 리뷰" : "All Reviews",
    write: language === "ko" ? "내 리뷰 작성하러가기" : "Write a Review",
  };
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    const updateImagesPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1200) setImagesPerPage(3);
      else if (width >= 768) setImagesPerPage(2);
      else setImagesPerPage(1);
    };
    updateImagesPerPage();
    window.addEventListener("resize", updateImagesPerPage);
    return () => window.removeEventListener("resize", updateImagesPerPage);
  }, []);

  const popularReviews = allTopReviews.filter(r => r.type === "인기");
  const latestReviews = allTopReviews.filter(r => r.type === "최신");
  const myReviews = allTopReviews.filter(r => r.type === "내");

  const getSliderData = () => {
    if (reviewType === "인기") return [popularReviews, sliderPopularLiked, setSliderPopularLiked, sliderPopularLikes, setSliderPopularLikes];
    if (reviewType === "최신") return [latestReviews, sliderLatestLiked, setSliderLatestLiked, sliderLatestLikes, setSliderLatestLikes];
    return [myReviews, sliderMyLiked, setSliderMyLiked, sliderMyLikes, setSliderMyLikes];
  };

  const [sliderReviews, sliderLikedMap, setSliderLikedMap] = getSliderData();

  const toggleSliderLike = (id) => {
    setSliderLikedMap(prev => {
      const newLiked = !prev[id];
      return { ...prev, [id]: newLiked };
    });
  };

  const toggleBottomLike = (id) => {
    setBottomLikedMap(prev => {
      const newLiked = !prev[id];
      setBottomLikeCountMap(prevCount => ({
        ...prevCount,
        [id]: (prevCount[id] || 0) + (newLiked ? 1 : -1),
      }));
      return { ...prev, [id]: newLiked };
    });
  };

  const handleCardClick = (review) => {
    setSelectedReview(review);
  };
  
  const closeModal = () => {
    setSelectedReview(null);
  };
  
  const tabList = [
    { type: "인기", label: text.popular },
    { type: "최신", label: text.latest },
    { type: "내", label: text.mine }
  ];

  const visibleSlider = sliderReviews.slice(
    page * imagesPerPage,
    page * imagesPerPage + imagesPerPage
  );
  const totalPages = Math.ceil(sliderReviews.length / imagesPerPage);

  useEffect(() => {
    const cardWidth = 240 + 16; // 카드 너비 + gap
    setOffset(page * cardWidth * imagesPerPage);
  }, [page, imagesPerPage]);

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    for (let i = 0; i < full; i++) stars.push(<FaStar color="rgb(255, 230, 0)" key={`full-${i}`} />);
    if (half) stars.push(<FaStarHalfAlt color="rgb(255, 230, 0)" key="half" />);
    for (let i = 0; i < empty; i++) stars.push(<FaRegStar color="#ccc" key={`empty-${i}`} />);

    return stars;
  };


  return (
    <PageWrapper>
      <Header onChangeLanguage={setLanguage} language={language} />
      <Container>
        <TopBoxButtonsWrapper>
          {tabList.map(({ type, label }) => (
            <TopButton key={type} isActive={reviewType === type} onClick={() => {
              setReviewType(type);
              setPage(0);
            }}>
              {label}
            </TopButton>
          ))}
        </TopBoxButtonsWrapper>

        <TopBox>
          <SliderWrapper>
            <NavButton onClick={() => setPage(prev => Math.max(prev - 1, 0))} disabled={page === 0}>◀</NavButton>
            <ImageGrid perPage={imagesPerPage}>
              {visibleSlider.map((review) => (
                <ImageCard onClick={() => handleCardClick(review)} hoverable>
  <img src={review.image} alt={`resume-${review.id}`} />
              
                <SliderCardTextWrapper>
                  <HeartRow>
  <HeartButton onClick={(e) => {
    e.stopPropagation(); // 클릭 이벤트 막기
    toggleSliderLike(review.id);
  }}>
    {sliderLikedMap[review.id] ? <FaHeart /> : <FaRegHeart />}
  </HeartButton>
  <LikeCountText>{sliderLikedMap[review.id] ? "1명" : "0명"}</LikeCountText>
  <RatingWrapper>
    {renderStars(4.5)} {/* ⭐ 별 렌더링 */}
    <RatingValue>4.5</RatingValue> {/* 🔢 점수 텍스트 */}
  </RatingWrapper>
</HeartRow>

              
                  <CardTitle>
  {review.title.length > 10
    ? `${review.title.slice(0, 10)}...`
    : review.title}
</CardTitle>

<CardDesc>
  {review.desc && review.desc.length > 35
    ? `${review.desc.slice(0, 35)}...`
    : review.desc || ""}
</CardDesc>
                </SliderCardTextWrapper>
              </ImageCard>
              ))}
            </ImageGrid>
            <NavButton onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))} disabled={page === totalPages - 1}>▶</NavButton>
          </SliderWrapper>
        </TopBox>
        <CenterLabel>{text.all}</CenterLabel>
        <BottomBox>
          <ScrollableList>
            {bottomReviews.map((review) => (
              <BottomReviewCard key={review.id} onClick={() => handleCardClick(review)}>
              <img src={review.image} alt={`resume-${review.id}`} />
              
              <CardRightContent>
                <HeartRow>
  <HeartButton onClick={(e) => {
    e.stopPropagation(); // 클릭 이벤트 막기
    toggleBottomLike(review.id);
  }}>
    {sliderLikedMap[review.id] ? <FaHeart /> : <FaRegHeart />}
  </HeartButton>
  <LikeCountText>{bottomLikeCountMap[review.id] ? "1명" : "0명"}</LikeCountText>
  <RatingWrapper>
    {renderStars(4.5)} {/* ⭐ 별 렌더링 */}
    <RatingValue>4.5</RatingValue> {/* 🔢 점수 텍스트 */}
  </RatingWrapper>
</HeartRow>

            
                <BottomCardTextWrapper>
  <CardTitle>
    {review.title.length > 10
      ? `${review.title.slice(0, 10)}...`
      : review.title}
  </CardTitle>
  <CardDesc>
  {review.desc?.length > 35
    ? `${review.desc.slice(0, 35)}...`
    : review.desc || ""}
</CardDesc>
</BottomCardTextWrapper>
              </CardRightContent>
            </BottomReviewCard>
            
            ))}
            <BottomPaddingSpacer />
          </ScrollableList>
        </BottomBox>

        <WriteButton onClick={() => navigate("/review/write")}>
          {text.write}
        </WriteButton>

        {selectedReview && (
  <ModalOverlay onClick={closeModal}>
    <ModalContent onClick={(e) => e.stopPropagation()}>
      <img src={selectedReview.image} alt="modal" />
      <h2>{selectedReview.title}</h2>
      <p>{selectedReview.desc}</p> {/* ✅ 이 부분을 text.desc → selectedReview.desc로 수정 */}
      <CloseButton onClick={closeModal}>닫기</CloseButton>
    </ModalContent>
  </ModalOverlay>
)}
      </Container>
      <Footer language={language} />
    </PageWrapper>
  );
};

export default ReviewList;


// 기존 styled-components 코드는 그대로 사용
// styled-components
const PageWrapper = styled.div`
  background: linear-gradient(to bottom, #88ccf9, #b6e4ff, #d9f3ff, #f1fbff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  background: linear-gradient(to bottom, #88ccf9, #b6e4ff, #d9f3ff, #f1fbff);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem 0;
`;

const TopBoxButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 90%;
  max-width: 1000px;
  margin-top: 6rem;
  margin-bottom: -32px;
  z-index: 2;
`;

const TopButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: ${({ isActive }) => (isActive ? "rgb(129, 215, 255)" : "#64a8f0")};
  color: white;
  border: none;
  border-radius: 16px 16px 0 0;
  font-size: ${({ isActive }) => (isActive ? "1.05rem" : "0.95rem")};
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
  transform-origin: top left;

  &:hover {
    background-color:rgb(129, 215, 255);
    transform: scaleX(1.1) scaleY(1.1);
  }
`;

const TopBox = styled.div`
  width: 90%;
  max-width: 1000px;
  background-color: rgb(129, 215, 255);
  border-radius: 0 16px 16px 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 2rem 0;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  overflow: visible;
  width: 100%;
  max-width: calc(240px * ${props => props.perPage} + 1rem * (${props => props.perPage} - 1) + 5rem);
`;

const NavButton = styled.button`
  font-size: 1.8rem;
  padding: 0.5rem;
  background: none;
  color: rgb(255, 255, 255);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: rgb(0, 174, 255);
    transform: scale(1.2);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
    transform: none;
  }
`;

const ImageGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;
  width: calc(240px * ${props => props.perPage} + 1rem * (${props => props.perPage} - 1));
  transform: translateX(${props => `-${props.offset}px`});
  transition: transform 0.4s ease-in-out; /* ✅ 부드럽게 이동 */
`;

const ImageCard = styled.div`
  position: relative;
  width: 240px;
  height: 340px;
  background-color: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 100%;
    height: 180px;
    object-fit: contain;
  }

  cursor: pointer;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.03);
    z-index: 10;                // 위로 띄움
  }
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  font-size: 1.3rem;
  color: rgb(255, 0, 0);
  cursor: pointer;
  align-self: flex-start;
  margin: 0.4rem 0 0 0.5rem;

  &:hover {
    transform: scale(1.2);
  }
`;

const HeartRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-left: 0.5rem;
`;

const LikeCountText = styled.span`
  font-size: 0.85rem;
  color: rgb(0, 0, 0);
  margin-top: 0.2rem;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  margin-left: 0.4rem;
`;

const RatingValue = styled.span`
  font-size: 0.85rem;
  color: rgb(0, 0, 0);
  font-weight: bold;
`;

const RatingText = styled.span`
  font-size: 0.85rem;
  color: rgb(255, 230, 0);
  margin-left: 0.3rem;
`;

// 상단 슬라이더용 텍스트 영역
const SliderCardTextWrapper = styled.div`
  padding: 0.5rem;
  width: 100%;
  text-align: left;
  padding-left: 2rem;
`;

// 하단 리뷰용 텍스트 영역 (기존 그대로)
const BottomCardTextWrapper = styled.div`
  padding: 0.5rem;
  width: 100%;
  text-align: left;
  padding-left: 2rem;
`;

const CardTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #003049;
`;

const CardDesc = styled.div`
  font-size: 0.95rem;
  color: #555;
  margin-top: 0.3rem;
  word-break: break-word;     // ✅ 단어 중간이라도 잘라서 줄바꿈
  overflow-wrap: break-word;  // ✅ 긴 단어 자동 줄바꿈
  overflow: hidden;           // ✅ 넘친 텍스트 숨김
  text-overflow: ellipsis;    // ✅ 가능한 경우 말줄임표
`;

const CenterLabel = styled.h2`
  font-size: 1.8rem;
  color: #003049;
  margin: 1rem 0;
  text-align: center;
`;

const BottomBox = styled.div`
  width: 90%;
  max-width: 1000px;
  height: 460px;
  background-color: rgb(129, 215, 255);
  border-radius: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
`;

const ScrollableList = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  padding-bottom: 0rem;

  &::-webkit-scrollbar {
    width: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgb(129, 215, 255);
    border-radius: 16px;
    border: 4px solid transparent;
    background-clip: content-box;
    transition: background-color 0.2s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #3a91d8;
  }

  &::-webkit-scrollbar-track {
    background-color: #f1fbff;
    border-radius: 4px;
  }
`;

const BottomPaddingSpacer = styled.div`
  height: 2.5rem;
  flex-shrink: 0;
  pointer-events: none;
`;

const BottomReviewCard = styled.div`
  cursor: pointer; /* 👈 이거 추가 */
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
  padding: 1.25rem;
  min-height: 120px;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.2s ease; /* ✅ 추가 */
  overflow: hidden; /* ✅ 글자나 요소 넘침 방지 */

  img {
    width: 100px;
    height: 80px;
    object-fit: contain;
    border-radius: 8px;
  }

   &:hover {
    transform: scale(1.02); /* 선택사항: hover 시 살짝 커지게 */
    transition: transform 0.2s ease;
  }

  flex-shrink: 0;
`;

const CardRightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const WriteButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.8rem 1.6rem;
  background-color: rgb(129, 215, 255);
  color: white;
  border: none;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #217dbb;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh; /* ✅ 최대 높이 제한 */
  overflow-y: auto;  /* ✅ 내부 스크롤 가능하게 */
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  text-align: center;
  box-sizing: border-box; /* ✅ 중요 */

  img {
    width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }

  /* ✅ 스크롤바 꾸미기 */
  &::-webkit-scrollbar {
    width: 12px;                  /* 스크롤바 너비 */
  }

  &::-webkit-scrollbar-track {
    background:rgb(255, 255, 255);          /* 트랙 배경색 */
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(129, 215, 255);       /* 스크롤바 색 */
    border-radius: 12px;
    border: 1.5px solid white;      /* 안쪽 간격처럼 보이게 */
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #217dbb;          /* hover 시 색 변경 */
  }
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgb(129, 215, 255);
  border: none;
  border-radius: 999px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;    // ✅ 부드럽게 색 전환

  &:hover {
    background-color: #217dbb;
  }
`;
