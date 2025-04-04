import styled from 'styled-components';
import { useState } from 'react';
import { users as userList } from '../../testUserProfile/users';

const Wrapper = styled.div`
  padding: 40px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
`;

const SearchInput = styled.input`
  padding: 10px 14px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 260px;
  box-shadow: 1px 1px 4px rgba(0,0,0,0.05);
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
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function UsersPage() {
  const [search, setSearch] = useState('');

  const filteredUsers = userList.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

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
              <button>수정</button>
              <button>삭제</button>
            </div>
          </UserCard>
        ))}
        {filteredUsers.length === 0 && <div>검색 결과가 없습니다.</div>}
      </UserList>
    </Wrapper>
  );
}

export default UsersPage;
