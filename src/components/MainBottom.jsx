import styled from 'styled-components';
import profile1 from '../assets/profile1.jpg';
import profile2 from '../assets/profile2.jpg';
import profile3 from '../assets/profile3.jpg';

const BottomSection = styled.section`
  min-height: 70vh;
  padding: 10vh 5vw 4vh; // 아래 패딩 줄임
  text-align: center;
`;


const SectionTitle = styled.h2`
  font-size: clamp(1.6rem, 3vw, 2.5rem);
  margin-bottom: 30px;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 80px;
    height: 3px;
    margin: 10px auto 0;
    background-color: #88bff5;
    border-radius: 2px;
  }
`;

const ReviewContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: clamp(20px, 3vw, 40px);
  margin-top: 30px;
`;

const ReviewCard = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: clamp(1.2rem, 2vw, 2rem);
  width: clamp(250px, 28vw, 300px);
  min-height: 280px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.15);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.25);
  }
`;


const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const Nickname = styled.p`
  font-weight: bold;
  color: black;
  margin: 5px 0;
  font-size: clamp(1rem, 1.3vw, 1.2rem);
`;

const Stars = styled.p`
  color: gold;
  font-size: clamp(1rem, 1.3vw, 1.2rem);
  margin-bottom: 10px;
`;

const ReviewText = styled.p`
  font-size: clamp(1rem, 1.2vw, 1.1rem);
  color: #333;
  line-height: 1.5;
`;

function MainBottom({ language }) {
    const reviews = [
      { img: profile1, name: '서지원 님' },
      { img: profile2, name: '낭뇽녕냥 님' },
      { img: profile3, name: '윤석혈 님' },
    ];
  
    const text = {
      ko: {
        title: '리뷰',
        reviewText: '진짜 정말 너무 이력서 초기 작성하는데 도움이 너무너무 되었어요. 최고다 최고',
      },
      en: {
        title: 'Reviews',
        reviewText: 'It really helped me get started on my resume. Absolutely amazing!',
      },
    };
  
    return (
      <BottomSection>
        <SectionTitle>{text[language].title}</SectionTitle>
        <ReviewContainer>
          {reviews.map((r, i) => (
            <ReviewCard key={i}>
              <ProfileImg src={r.img} alt="프로필" />
              <Nickname>{r.name}</Nickname>
              <Stars>★★★★★</Stars>
              <ReviewText>{text[language].reviewText}</ReviewText>
            </ReviewCard>
          ))}
        </ReviewContainer>
      </BottomSection>
    );
  }
  

export default MainBottom;
