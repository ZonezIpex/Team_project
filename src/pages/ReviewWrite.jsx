import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ReviewWrite = () => {
  const [rating, setRating] = useState(5);
  const [language, setLanguage] = useState(localStorage.getItem("language") || "ko");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const maxTitleLength = 30;
  const [content, setContent] = useState("");
  const maxContentLength = 300;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // 다국어 텍스트 정의
  const text = {
    pageTitle: language === "ko" ? "리뷰 작성하기" : "Write a Review",
    placeholder: language === "ko" ? "이력서 사진 넣기" : "Upload Resume Image",
    rating: language === "ko" ? "별점" : "Rating",
    titleLabel: language === "ko" ? "리뷰 제목" : "Title",
    contentLabel: language === "ko" ? "리뷰 내용" : "Content",
    contentPlaceholder: language === "ko" ? "✏️ 리뷰를 작성해주세요." : "✏️ Write your review here.",
    submit: language === "ko" ? "등록하기" : "Submit",
  };

  return (
    <PageWrapper>
      <Header onChangeLanguage={setLanguage} language={language} />
      <Content>
        <Title>{text.pageTitle}</Title>

        <ImageBox>
          <ImageLabel htmlFor="imageUpload">
            {image ? (
              <PreviewImage src={image} alt="preview" />
            ) : (
              <PlaceholderText>{text.placeholder}</PlaceholderText>
            )}
          </ImageLabel>
          <input type="file" id="imageUpload" accept="image/*" onChange={handleImageChange} hidden />
        </ImageBox>

        <RatingBox>
          <Label>{text.rating}</Label>
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              filled={index < rating}
              onClick={() => setRating(index + 1)}
            >
              <FaStar />
            </Star>
          ))}
        </RatingBox>

        <InputBox>
          <Label>{text.titleLabel}</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= maxTitleLength) {
                setTitle(e.target.value);
              }
            }}
          />
          <CharCount>{title.length} / {maxTitleLength}</CharCount>
        </InputBox>

        <InputBox>
          <Label>{text.contentLabel}</Label>
          <Textarea
            placeholder={text.contentPlaceholder}
            value={content}
            onChange={(e) => {
              if (e.target.value.length <= maxContentLength) {
                setContent(e.target.value);
              }
            }}
          />
          <CharCount>{content.length} / {maxContentLength}</CharCount>
        </InputBox>

        <SubmitButton>{text.submit}</SubmitButton>
      </Content>
      <Footer language={language} />
    </PageWrapper>
  );
};

export default ReviewWrite;

// 스타일 컴포넌트
const PageWrapper = styled.div`
  background: linear-gradient(to bottom, #88ccf9, #b6e4ff, #d9f3ff, #f1fbff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ImageLabel = styled.label`
  width: 400px;
  height: 600px;
  background-color: white;
  border-radius: 8px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
`;

const Star = styled.span`
  color: ${(props) => (props.filled ? "#FFD700" : "#ccc")};
  font-size: 1.8rem;
  margin-right: 0.3rem;
  cursor: pointer;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

const PlaceholderText = styled.div`
  color: #999;
`;

const CharCount = styled.div`
  text-align: right;
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.3rem;
`;

const Content = styled.div`
  flex: 1;
  padding: 3rem 4rem;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
`;

const Title = styled.h1`
  margin-top: 3rem;
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const RatingBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-right: 1rem;
`;

const InputBox = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 160px;
  padding: 0.7rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
  font-family: inherit;
`;

const SubmitButton = styled.button`
  background-color: #157aac;
  color: white;
  padding: 0.8rem 2rem;
  border: none;
  border-radius: 999px;
  display: block;
  margin: 0 auto;
  font-size: 1rem;
  cursor: pointer;

  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: white;
    color: #146c94;
  }
`;
