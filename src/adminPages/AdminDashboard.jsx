import styled from 'styled-components';
import Header from '../components/Header';

const PageWrapper = styled.div`
  background: linear-gradient(to bottom right, #c0f0ef, #a0d8f1);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  padding: 120px 30px 40px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: #333;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 15px;
  box-shadow: 1px 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
  width: 260px;
  transition: transform 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 2px 4px 12px rgba(0,0,0,0.15);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  color: #666;
`;

function AdminDashboard({ language, onChangeLanguage }) {
  const text = {
    ko: {
      title: '관리자 대시보드',
      cards: [
        { title: '회원 관리', desc: '가입된 사용자 목록, 삭제, 권한 설정 등을 관리합니다.' },
        { title: '리뷰 관리', desc: '등록된 리뷰를 확인하고 삭제하거나 수정 요청을 할 수 있습니다.' },
        { title: '이력서 통계', desc: '작성된 이력서 수, 인기 유형, 평균 작성 시간 등 통계를 확인합니다.' },
        { title: '사이트 설정', desc: '언어 설정, 공지사항, 서비스 안내 등을 관리할 수 있습니다.' },
      ]
    },
    en: {
      title: 'Admin Dashboard',
      cards: [
        { title: 'User Management', desc: 'Manage registered users, deletion, permission settings, etc.' },
        { title: 'Review Management', desc: 'Check and manage submitted reviews or request modifications.' },
        { title: 'Resume Stats', desc: 'View stats like number of resumes, popular types, avg write time.' },
        { title: 'Site Settings', desc: 'Control language, notices, service guides and more.' },
      ]
    }
  };

  const t = text[language || 'ko'];

  return (
    <PageWrapper>
      <Header language={language} onChangeLanguage={onChangeLanguage} />
      <Content>
        <Title>{t.title}</Title>
        <CardGrid>
          {t.cards.map((card, i) => (
            <Card key={i}>
              <CardTitle>{card.title}</CardTitle>
              <CardText>{card.desc}</CardText>
            </Card>
          ))}
        </CardGrid>
      </Content>
    </PageWrapper>
  );
}

export default AdminDashboard;
