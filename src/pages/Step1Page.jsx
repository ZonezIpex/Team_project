import React, { useState } from "react";
import styled from "styled-components";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";

export default function Step1Page({ language, onChangeLanguage, selectedTemplate, setSelectedTemplate }) {
  const [templateDescription, setTemplateDescription] = useState(""); // 템플릿 설명 상태
  const navigate = useNavigate();

  const text = {
    title: {
      ko: "이력서 양식 선택",
      en: "Select Resume Template",
    },
    steps: {
      ko: ["이력서\n양식", "신상\n정보", "경력", "수정", "완성"],
      en: ["Template", "Personal\nInfo", "Experience", "Edit", "Complete"],
    },
    exampleTitle: {
      ko: "이력서 양식 예시",
      en: "Resume Template Examples",
    },
    recentTitle: {
      ko: "최근 사용",
      en: "Recently Used",
    },
    templateLabel: {
      ko: (n) => `양식 ${n}`,
      en: (n) => `Template ${n}`,
    },
    recentLabel: {
      ko: (n) => `최근 ${n}`,
      en: (n) => `Recent ${n}`,
    },
    next: {
      ko: "다음",
      en: "Next",
    },
    select: {
      ko: "선택",
      en: "Select",
    },
  };

  const handleTemplateSelect = (n) => {
    setSelectedTemplate(n);  // 템플릿을 선택하면 selectedTemplate 상태를 업데이트
    setTemplateDescription(`템플릿 ${n}에 대한 설명입니다.`);
  };

  const handleNext = () => {
    if (selectedTemplate) {
      navigate('/step2page', { state: { selectedTemplate } });    // 템플릿을 선택한 경우에만 다음 페이지로 이동
    } else {
      alert('템플릿을 선택해주세요.');
    }
  };

  return (
    <PageWrapper>
      <Header language={language} onChangeLanguage={onChangeLanguage} />
      <Container>
        <Title>{text.title[language]}</Title>

        <Stepper>
          {text.steps[language].map((step, index) => (
            <Step key={step}>
              <Circle active={index === 0}>{step}</Circle>
              {index < text.steps[language].length - 1 && <Line />}
            </Step>
          ))}
        </Stepper>

        <Section>
          <SectionTitle>{text.exampleTitle[language]}</SectionTitle>
          <TemplateGrid>
            {[1, 2, 3].map((n) => (
              <Template
                key={n}
                onClick={() => handleTemplateSelect(n)}
                style={{
                  backgroundColor: selectedTemplate === n ? "#d1e9f7" : "#fff",
                }}
              >
                {text.templateLabel[language](n)}
              </Template>
            ))}
            <TemplateAdd>+</TemplateAdd>
          </TemplateGrid>
        </Section>

        <Section>
          <SectionTitle>{text.recentTitle[language]}</SectionTitle>
          <TemplateBox>
            <TemplateGrid>
              {[1, 2, 3].map((n) => (
                <Template key={n} style={{ backgroundColor: "#f1f1f1" }}>
                  {text.recentLabel[language](n)}
                </Template>
              ))}
            </TemplateGrid>
          </TemplateBox>
        </Section>

        {/* 선택된 템플릿과 설명을 보여주는 영역 */}
        <SelectedTemplateContainer display={selectedTemplate ? 'flex' : 'none'}>
          <SelectedTemplateWrapper>
            <SelectedTemplateImage>
              <img
                src={`template${selectedTemplate}.png`}
                alt={`Template ${selectedTemplate}`}
                width="300px"
              />
            </SelectedTemplateImage>
            <SelectedTemplateDescription>
              <h3>{text.templateLabel[language](selectedTemplate)}</h3>
              <p>{templateDescription}</p>
            </SelectedTemplateDescription>
          </SelectedTemplateWrapper>
          <Button onClick={handleNext}>
            {text.select[language]}
          </Button>
        </SelectedTemplateContainer>

        <ButtonWrapper>
          <Button onClick={handleNext}>
            {text.next[language]}
          </Button>
        </ButtonWrapper>
      </Container>
      <Footer language={language} />
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  background: linear-gradient(to bottom, #88ccf9, #b6e4ff, #d9f3ff, #f1fbff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  color: white;
  margin-top: 100px;
  margin-bottom: 30px;
`;

const Stepper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
`;

const Circle = styled.div`
  min-width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#146c94' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#146c94')};
  border: 3px solid #146c94;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  text-align: center;
  white-space: pre-line;
  padding: 5px;
  box-sizing: border-box;
`;

const Line = styled.div`
  width: 30px;
  height: 5px;
  background-color: #146c94;
`;

const Section = styled.div`
  width: 100%;
  max-width: 900px;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  text-align: left;
  margin: 2rem 0 1rem 0;
  border-bottom: 3px solid #176B87;
  padding-bottom: 0.3rem;
`;

const TemplateBox = styled.div`
  background: rgba(243, 251, 255, 0.8);
  padding: 20px 70px;
  border-radius: 10px;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 20px;
  justify-items: center;
`;

const Template = styled.div`
  width: 100%;
  max-width: 150px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TemplateAdd = styled(Template)`
  border: 2px dashed #aaa;
  font-size: 24px;
  color: #aaa;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 40px;
  margin-bottom: 60px;
`;

const Button = styled.button`
  color: white;
  background-color: #146c94;
  border: 1px solid #146c94;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  padding: 8px 20px;

  &:hover {
    color: #146c94;
    background-color: white;
  }
`;

const SelectedTemplateContainer = styled.div`
  position: fixed;  // 페이지 전체에서 고정 위치
  top: 50%;  // 화면 세로 가운데
  left: 50%;  // 화면 가로 가운데
  transform: translate(-50%, -50%);  // 정확하게 가운데 정렬
  width: 80%;  // 원하는 너비
  max-width: 900px;
  height: 70%;
  max-height: 900px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9);  // 배경색을 반투명하게
  border-radius: 10px;
  z-index: 100;  // 다른 요소들 위에 표시되도록
  display: ${(props) => (props.display === 'flex' ? 'flex' : 'none')};
  justify-content: center;  // 내용이 가로로 가운데 정렬
  align-items: center;  // 내용이 세로로 가운데 정렬
`;

const SelectedTemplateWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SelectedTemplateImage = styled.div`
  flex: 1;
  text-align: center;
`;

const SelectedTemplateDescription = styled.div`
  flex: 2;
  padding-left: 20px;
  text-align: left;
`;
