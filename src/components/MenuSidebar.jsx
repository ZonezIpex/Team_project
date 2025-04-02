import styled from 'styled-components';

const SidebarWrapper = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-250px')};
  width: 250px;
  height: 100vh;
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease, opacity 0.3s ease;
  z-index: 150;
  display: flex;
  flex-direction: column;
  padding: 80px 20px 30px;
  gap: 20px;
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
  z-index: 150;
`;

const MenuButton = styled.button`
  background-color: #f0f4f8;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  text-align: center;
  padding: 12px 0;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #d6eaf8;
    transform: scale(1.02);
  }
`;

function MenuSidebar({ isOpen, innerRef, language }) {
  const text = {
    home: language === 'en' ? 'Home' : '홈',
    review: language === 'en' ? 'Reviews' : '리뷰',
    mypage: language === 'en' ? 'My Page' : '마이페이지',
    logout: language === 'en' ? 'Logout' : '로그아웃',
  };

  return (
    <>
      <Overlay isOpen={isOpen} />
      <SidebarWrapper ref={innerRef} isOpen={isOpen}>
        <MenuButton onClick={() => (window.location.href = '/')}>{text.home}</MenuButton>
        <MenuButton onClick={() => (window.location.href = '/reviews')}>{text.review}</MenuButton>
        <MenuButton onClick={() => (window.location.href = '/mypage')}>{text.mypage}</MenuButton>
        <MenuButton
          onClick={() => {
            localStorage.removeItem('loggedIn');
            window.location.href = '/login';
          }}
        >
          {text.logout}
        </MenuButton>
      </SidebarWrapper>
    </>
  );
}

export default MenuSidebar;
