// src/adminPages/users/UsersPage.jsx
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import api from '../../api/axios';


const Wrapper = styled.div`
  padding: 40px;
  background: linear-gradient(to bottom right, #d1f3ff, #a3e4ff);
  min-height: 100vh;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  padding: 10px 14px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 260px;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.1);

`;

const FilterButton = styled.button`
  padding: 8px 14px;
  background-color: #e0f7fa;
  border: 1px solid #00acc1;
  color: #007c91;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #b2ebf2;
  }
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const UserCard = styled.div`
  background: ${(props) =>
    props.role === 'ADMIN' ? '#d0f0c0' : props.isApproved ? 'white' : '#ffe0e0'};
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
const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
`;

const ApproveButton = styled(ActionButton)`
  background-color: #157aac;
  color: white;
`;

const DeleteButton = styled(ActionButton)`
  background-color: #e74c3c;
  color: white;
`;

const RoleButton = styled(ActionButton)`
  background-color: #f1c40f;
  color: black;
`;

function UsersPage() {
  const [search, setSearch] = useState('');
  const [userList, setUserList] = useState([]);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await api.get('/api/user');
    setUserList(response.data);
  };

  const approveUser = async (userNo) => {
    try {
      await api.post(`/api/user/approve-user/${userNo}`);
      alert('승인되었습니다!');
      fetchUsers();
    } catch (err) {
      console.error('Error approving user:', err.message);
      alert('승인 실패');
    }
  };

  const deleteUser = async (userNo) => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      await api.delete(`/api/user/${userNo}`);
      alert('삭제되었습니다!');
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err.message);
      alert('삭제 실패');
    }
  };

  const toggleRole = (userNo) => {
    setUserList(prevList =>
      prevList.map(user =>
        user.userNo === userNo
          ? { ...user, userRole: user.userRole === 'USER' ? 'ADMIN' : 'USER' }
          : user
      )
    );
  };

  const filteredUsers = userList.filter(user => {
    const matchesSearch = user.userName.toLowerCase().includes(search.toLowerCase()) || user.userEmail.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === 'ALL' ||
      (filter === 'ADMIN' && user.userRole === 'ADMIN') ||
      (filter === 'USER' && user.userRole === 'USER') ||
      (filter === 'NOT_APPROVED' && !user.isApproved);
    return matchesSearch && matchesFilter;
  });

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
        <FilterWrapper>
          <FilterButton onClick={() => setFilter('ALL')}>전체</FilterButton>
          <FilterButton onClick={() => setFilter('ADMIN')}>관리자</FilterButton>
          <FilterButton onClick={() => setFilter('USER')}>유저</FilterButton>
          <FilterButton onClick={() => setFilter('NOT_APPROVED')}>미승인</FilterButton>
          <SearchInput
            type="text"
            placeholder="이름 또는 이메일 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FilterWrapper>
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

        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard key={user.userNo} isApproved={user.isApproved} role={user.userRole}>
              <div>
                <div><strong>{user.userName}</strong> ({user.userEmail})</div>
                <div>상태: {user.isApproved ? '승인됨' : '미승인'}</div>
              </div>
              <ButtonGroup>
                {/* ✅ 승인된 사용자만 역할 변경 버튼 보이게 */}
                {user.isApproved && (
                  <RoleButton onClick={() => toggleRole(user.userNo)}>
                    {user.userRole === 'ADMIN' ? '관리자' : '유저'}
                  </RoleButton>
                )}

                {/* ✅ 미승인된 사용자만 승인 버튼 보이게 */}
                {!user.isApproved && (
                  <ApproveButton onClick={() => approveUser(user.userNo)}>승인</ApproveButton>
                )}

                {/* ✅ 삭제 버튼은 모두 보이게 */}
                <DeleteButton onClick={() => deleteUser(user.userNo)}>삭제</DeleteButton>
              </ButtonGroup>
            </UserCard>
          ))
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}

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
}
export default UsersPage;
