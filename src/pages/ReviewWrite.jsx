import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const texts = {
  ko: {
    title: "리뷰 작성하기",
    placeholder: "이력서를 넣어주세요!",
    rating: "별점",
    reviewTitle: "리뷰 제목",
    reviewTitlePlaceholder: "리뷰 제목을 입력하세요 (최대 50자)",
    reviewContent: "리뷰 내용",
    reviewContentPlaceholder: "리뷰 내용을 입력하세요 (최대 300자)",
    submit: "제출하기",
    scoreUnit: "점",
  },
  en: {
    title: "Write a Review",
    placeholder: "Please upload your resume!",
    rating: "Rating",
    reviewTitle: "Review Title",
    reviewTitlePlaceholder: "Enter review title (max 50 characters)",
    reviewContent: "Review Content",
    reviewContentPlaceholder: "Enter review content (max 300 characters)",
    submit: "Submit",
    scoreUnit: "pts",
  },
};

const ReviewWrite = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "ko");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const t = texts[language]; // ✅ 다국어 텍스트

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <PageWrapper>
      <Header onChangeLanguage={setLanguage} language={language} />

      <Title>{t.title}</Title>

      <ImageSection>
        <ImageBox onClick={handleImageClick}>
          {imagePreview ? (
            <>
              <PreviewImage src={imagePreview} alt="preview" />
              <RemoveButton onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}>×</RemoveButton>
            </>
          ) : (
            <PlaceholderText>{t.placeholder}</PlaceholderText>
          )}
          <HiddenInput type="file" ref={fileInputRef} onChange={handleImageChange} />
        </ImageBox>
      </ImageSection>

      <RatingSection>
        <Label>{t.rating} :</Label>
        <StarBox>
  {[1, 2, 3, 4, 5].map((i) => {
    const full = rating >= i;
    const half = rating >= i - 0.5 && rating < i;

    return (
      <Star
  key={i}
  onClick={(e) => {
    const box = e.currentTarget.getBoundingClientRect();
    const isLeft = e.clientX - box.left < box.width / 2;
    setRating(isLeft ? i - 0.5 : i);
  }}
>
  {full ? (
    <FaStar color="rgb(255, 230, 0)" />
  ) : half ? (
    <FaStarHalfAlt color="rgb(255, 230, 0)" />
  ) : (
    <FaRegStar color="#ccc" />
  )}
</Star>

    );
  })}
</StarBox>
{rating > 0 && <ScoreText>{rating.toFixed(1)}{t.scoreUnit}</ScoreText>}
      </RatingSection>

      <TitleInputSection>
        <Label>{t.reviewTitle}</Label>
        <Input
          type="text"
          maxLength={50}
          placeholder={t.reviewTitlePlaceholder}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </TitleInputSection>

      <ContentInputSection>
        <Label>{t.reviewContent}</Label>
        <Textarea
          maxLength={300}
          placeholder={t.reviewContentPlaceholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </ContentInputSection>

      <SubmitSection>{/*제출하기 버튼 및 백엔드 연동 예정이여서 빈 함수 넣음*/}
  <SubmitButton onClick={() => console.log("제출됨", { title, content, rating })}>
    {t.submit}
  </SubmitButton>
</SubmitSection>

      <Footer language={language} />
    </PageWrapper>
  );
};

export default ReviewWrite;

// ================== 스타일 ==================
const PageWrapper = styled.div`
  background: linear-gradient(to bottom, #88ccf9, #b6e4ff, #d9f3ff, #f1fbff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 28px;
  text-align: center;
  margin-top: 120px;    // ✅ 위 여백 크게
  margin-bottom: 30px; // ✅ 이미지랑 간격 충분히
  color: #000;
`;

// 이미지
const ImageSection = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto 30px;

  @media (max-width: 768px) {
    max-width: 90vw; // ✅ 모바일 화면에 맞게 축소
  }
`;

const ImageBox = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
  background-color:rgb(255, 255, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #555;
  cursor: pointer;
  overflow: hidden;
  position: relative;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  font-size: 16px;
  cursor: pointer;
  z-index: 2;
`;

const PlaceholderText = styled.div`
  font-weight: bold;    // ✅ 굵게
  font-size: 24px;
  color: #555;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HiddenInput = styled.input`
  display: none;
`;

// 별점
const RatingSection = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 30px;
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    max-width: 95vw;
  }
`;

const ScoreText = styled.span`
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;   // ✅ 굵게
  color: #444;
`;

const Label = styled.label`
  margin: 12px 0 5px;
  display: block;
  font-weight: bold;
`;

const StarBox = styled.div`
  display: flex;
  gap: 5px;
`;

const Star = styled.div`
  font-size: 24px;
  cursor: pointer;
  position: relative;
`;

// 제목 입력
const TitleInputSection = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 30px;

  @media (max-width: 768px) {
    max-width: 95vw;
  }
`;

// 내용 입력
const ContentInputSection = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 40px;

  @media (max-width: 768px) {
    max-width: 95vw;
  }
`;

const Input = styled.input`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 12px;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans KR", sans-serif;
  border: 3px solid rgb(129, 215, 255);
  border-radius: 8px;  // ✅ 모서리 둥글게
`;

const Textarea = styled.textarea`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  height: 200px;
  padding: 12px;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans KR", sans-serif;
  resize: none;
  border: 3px solid rgb(129, 215, 255);
  border-radius: 8px;  // ✅ 동일하게 둥글게
`;

const SubmitSection = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto 60px;
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  background-color: rgb(129, 215, 255);
  color: white;
  padding: 12px 32px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #217dbb;
  }
`;

