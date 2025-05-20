import React from "react";
import styled from "styled-components";
import Header from '../components/Header';
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom';


const ResumeWrapper = styled.div`
  width: 800px;
  padding: 40px;
  font-family: 'Noto Sans KR', sans-serif;
  color: #222;
  background: #fff;
  display: flex;
  border: 1px solid #ccc;
`;

const LeftColumn = styled.div`
  width: 30%;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
`;

const RightColumn = styled.div`
  width: 70%;
  padding-left: 20px;
`;

const NameBox = styled.div`
  text-align: right;
  margin-bottom: 20px;
`;

const Name = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const Slogan = styled.p`
  font-size: 14px;
  color: #555;
  margin: 0;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  border-bottom: 1px solid #000;
  margin-bottom: 8px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.span`
  font-weight: bold;
`;

const Table = styled.table`
  width: 100%;
  border-spacing: 4px;
  font-size: 14px;

  td {
    padding: 4px 0;
  }
`;

const Dot = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  background: ${props => props.filled ? '#000' : '#ccc'};
  border-radius: 50%;
  margin-right: 2px;
`;

const ResumePreview = ({ data }) => {
  return (
    <ResumeWrapper>
      <LeftColumn>
        <ProfileImage src={data.photoUrl || '/default-photo.png'} />
        <Section>
          <Label>기본사항</Label>
          <p>{data.birth} ({data.age}세)</p>
          <p>{data.phone}</p>
          <p>{data.email}</p>
        </Section>
      </LeftColumn>

      <RightColumn>
        <NameBox>
          <Slogan>{data.slogan}</Slogan>
          <Name>{data.name}</Name>
        </NameBox>

        <Section>
          <SectionTitle>자격증</SectionTitle>
          <Table>
            {data.licenses.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.year}</td>
                <td>{item.issuer}</td>
              </tr>
            ))}
          </Table>
        </Section>

        <Section>
          <SectionTitle>학력사항</SectionTitle>
          <Table>
            {data.education.map((item, i) => (
              <tr key={i}>
                <td>{item.period}</td>
                <td>{item.school}</td>
                <td>{item.major}</td>
              </tr>
            ))}
          </Table>
        </Section>

        <Section>
          <SectionTitle>기술</SectionTitle>
          <Table>
            {data.skills.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>
                  {[1, 2, 3, 4, 5].map(level => (
                    <Dot key={level} filled={level <= item.level} />
                  ))}
                </td>
              </tr>
            ))}
          </Table>
        </Section>

        <Section>
          <SectionTitle>대외활동</SectionTitle>
          <Table>
            {data.experience.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.period}</td>
                <td>{item.detail}</td>
              </tr>
            ))}
          </Table>
        </Section>

        <Section>
          <SectionTitle>경력사항</SectionTitle>
          <Table>
            {data.career.map((item, i) => (
              <tr key={i}>
                <td>{item.company} ({item.position})</td>
                <td>{item.period}</td>
                <td>{item.duty}</td>
              </tr>
            ))}
          </Table>
        </Section>
      </RightColumn>
    </ResumeWrapper>
  );
};

export default ResumePreview;
