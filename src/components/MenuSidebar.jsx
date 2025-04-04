import styled from 'styled-components';
import { Home, MessageCircle, User, LogOut } from 'lucide-react'; // 아이콘 라이브러리 사용 시

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-280px')};
  width: 280px;
  height: 100vh;
  background: linear-gradient(to bottom, #f0f8ff, #e6f0fb);
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.15);
  transition: right 0.3s ease, opacity 0.3s ease;
  z-index: 150;
  display: flex;
  flex-direction: column;
  padding: 80px 20px 30px;
  gap: 16px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
`;

const Overlay = styled.div`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 70px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 70px);
  z-index: 100;
`;

const MenuButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 14px;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.08);
  transition: 0.2s;

  &:hover {
    background-color: #dbeeff;
    transform: translateX(-4px);
  }
`;

const SidebarTitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  padding-left: 6px;
`;

function MenuSidebar({ isOpen, innerRef, language }) {
  const text = {
    home: language === 'en' ? 'Home' : '홈',
    review: language === 'en' ? 'Reviews' : '리뷰',
    mypage: language === 'en' ? 'My Page' : '마이페이지',
    logout: language === 'en' ? 'Logout' : '로그아웃',
    welcome: language === 'en' ? 'Welcome!' : '환영합니다!',
  };

  return (
    <>
      <Overlay isOpen={isOpen} />
      <SidebarWrapper ref={innerRef} isOpen={isOpen}>
        <SidebarTitle>{text.welcome}</SidebarTitle>
        <MenuButton onClick={() => (window.location.href = '/')}>
          <Home size={18} /> {text.home}
        </MenuButton>
        <MenuButton onClick={() => (window.location.href = '/reviews')}>
          <MessageCircle size={18} /> {text.review}
        </MenuButton>
        <MenuButton onClick={() => (window.location.href = '/mypage')}>
          <User size={18} /> {text.mypage}
        </MenuButton>
        <MenuButton
          onClick={() => {
            localStorage.removeItem('loggedIn');
            window.location.href = '/login';
          }}
        >
          <LogOut size={18} /> {text.logout}
        </MenuButton>
      </SidebarWrapper>
    </>
  );
}

export default MenuSidebar;
