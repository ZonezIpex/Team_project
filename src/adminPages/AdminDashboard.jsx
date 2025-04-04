import styled from 'styled-components';
import Header from '../components/Header';
import AdminSidebar from './components/AdminSidebar';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const PageWrapper = styled.div`
  background: linear-gradient(to bottom right, #c0f0ef, #a0d8f1);
  min-height: 100vh;
  display: flex;
`;

const MainContent = styled.div`
  flex-grow: 1;
  padding: 120px 40px 40px;
  margin-left: 240px;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  left: 240px;
  right: 0;
  top: 0;
  z-index: 300;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 1px 2px 10px rgba(0,0,0,0.1);
  padding: 20px;
  width: 260px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 2px 4px 12px rgba(0,0,0,0.15);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 10px;
  font-weight: bold;
`;

const CardText = styled.p`
  font-size: 0.95rem;
  color: #555;
`;

function AdminDashboard({ language, onChangeLanguage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminHome = location.pathname === '/admin';
  const adminName = localStorage.getItem('adminName') || '홍길동';

  const pageText = {
    ko: {
      greeting: `${adminName} 관리자님, 어서 오세요 👋`,
      userPages: '전체 사용자용 페이지 미리보기',
      previews: [
        { path: '/', label: '메인 화면 (Lobby)' },
        { path: '/login', label: '로그인 페이지' },
        { path: '/signup', label: '회원가입 페이지' },
        { path: '/mypage', label: '마이페이지' },
        { path: '/reviews', label: '리뷰 목록 페이지' },
        { path: '/error/404', label: '404 에러 페이지' },
        { path: '/error/500', label: '500 에러 페이지' },
      ]
    },
    en: {
      greeting: `Welcome, ${adminName} Admin 👋`,
      userPages: 'Preview of all user-facing pages',
      previews: [
        { path: '/', label: 'Main Page (Lobby)' },
        { path: '/login', label: 'Login Page' },
        { path: '/signup', label: 'Signup Page' },
        { path: '/mypage', label: 'My Page' },
        { path: '/reviews', label: 'Review List Page' },
        { path: '/error/404', label: 'Error 404 Page' },
        { path: '/error/500', label: 'Error 500 Page' },
      ]
    }
  };

  const t = pageText[language || 'ko'];

  return (
    <PageWrapper>
      <AdminSidebar language={language} />

      <HeaderWrapper>
        <Header language={language} onChangeLanguage={onChangeLanguage} />
      </HeaderWrapper>

      <MainContent>
        <div style={{ fontSize: '1.4rem', fontWeight: '500', marginBottom: '30px' }}>
          {t.greeting}
        </div>

        {isAdminHome && (
          <>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>{t.userPages}</h2>
            <CardGrid>
              {t.previews.map((p) => (
                <Card key={p.path} onClick={() => navigate(p.path)}>
                  <CardTitle>{p.label}</CardTitle>
                  <CardText>{p.path}</CardText>
                </Card>
              ))}
            </CardGrid>
          </>
        )}

        {/* 유저관리/리뷰 등 중첩 라우트용 */}
        <Outlet />
      </MainContent>
    </PageWrapper>
  );
}

export default AdminDashboard;
