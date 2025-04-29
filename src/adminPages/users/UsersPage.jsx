import styled from 'styled-components';
import { useState } from 'react';
import { users as userList } from '../../testUserProfile/users';


const Wrapper = styled.div`
  padding: 40px;
  background: linear-gradient(to bottom right, #d1f3ff, #a3e4ff);
  min-height: 100vh;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

const SearchInput = styled.input`
  padding: 10px 14px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 260px;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.1);
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const UserCard = styled.div`
  background: white;
  padding: 16px 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  margin-left: 8px;
  padding: 8px 14px;
  font-size: 0.9rem;
  border: 1px solid #007bff;
  background-color: white;
  color: #007bff;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 40px 30px;
  border-radius: 16px;
  text-align: center;
  width: 340px;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h3`
  margin-bottom: 30px;
  font-size: 1.8rem;
  font-weight: bold;
  color: #222;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const RoleButton = styled.button`
  padding: 10px 22px;
  font-size: 1rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;


const CancelButton = styled.button`
  padding: 10px 22px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: white;
  color: #555;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f2f2f2;
  }
`;


function UsersPage() {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = userList.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleRoleChange = (role) => {
    console.log(`${selectedUser.username}의 역할을 ${role}로 변경합니다.`);
    // 서버 업데이트 코드 추가 가능
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Wrapper>
      <TopBar>
        <Title>회원 관리</Title>
        <SearchInput
          type="text"
          placeholder="이름 또는 이메일 검색"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </TopBar>

      <UserList>
        {filteredUsers.map(user => (
          <UserCard key={user.id}>
            <div>
              <div><strong>{user.username}</strong> ({user.email})</div>
              <div>상태: {user.status === 'active' ? '활성' : '비활성'}</div>
            </div>
            <div>
              <Button onClick={() => handleEditClick(user)}>수정</Button>
              <Button>삭제</Button>
            </div>
          </UserCard>
        ))}
        {filteredUsers.length === 0 && <div>검색 결과가 없습니다.</div>}
      </UserList>

      {isModalOpen && (
  <ModalBackground onClick={closeModal}>
    <ModalContainer onClick={(e) => e.stopPropagation()}>
      <ModalTitle>{selectedUser?.username} 역할 설정</ModalTitle>
      <ButtonGroup>
        <RoleButton onClick={() => handleRoleChange('회원')}>회원</RoleButton>
        <RoleButton onClick={() => handleRoleChange('관리자')}>관리자</RoleButton>
        <CancelButton onClick={closeModal}>취소</CancelButton>
      </ButtonGroup>
    </ModalContainer>
  </ModalBackground>
)}

    </Wrapper>
  );
}

export default UsersPage;
