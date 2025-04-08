import styled from 'styled-components';
import { useState, useEffect  } from 'react';
import axios from 'axios'; // axios import 추가


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
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers(); // 페이지 로드 시 유저 목록 불러오기
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem("token"); // JWT 토큰 가져오기
    try {
        const response = await axios.get('http://sarm-server.duckdns.org:8888/api/user', {
            headers: {
                Authorization: `Bearer ${token}`, // 토큰 추가
            },
        });
        setUserList(response.data); // 모든 유저 데이터를 상태에 저장
        setLoading(false); // 로딩 상태를 false로 변경
    } catch (err) {
        console.error('Error fetching users:', err.message);
        setError('Failed to load users.');
        setLoading(false); // 로딩 상태를 false로 변경
    }
};

const approveUser = async (user_no) => {
  const token = localStorage.getItem("token"); // JWT 토큰 가져오기
  try {
      await axios.post(`http://sarm-server.duckdns.org:8888/api/user/approve-user/${user_no}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
      });
      alert('User approved successfully!');
      fetchUsers();
  } catch (err) {
      console.error('Error approving user:', err.message);
      alert('Failed to approve user.');
  }
};


  // 검색 필터링
  const filteredUsers = userList.filter(user =>
    user.userName.toLowerCase().includes(search.toLowerCase()) ||
    user.userEmail.toLowerCase().includes(search.toLowerCase())
  );

  // 로딩 중일 때 표시할 텍스트
  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard key={user.userNo}>
              <div>
                <div><strong>{user.userName}</strong> ({user.userEmail})</div>
                <div>상태: {user.isApproved ? '승인됨' : '미승인'}</div>
              </div>
              <div>
                {!user.isApproved && (
                  <button onClick={() => approveUser(user.userNo)}>승인</button>
                )}
              </div>
            </UserCard>
          ))
        ) : (
          <div>검색 결과가 없습니다.</div>
        )}
      </UserList>
    </Wrapper>
  );
}

export default UsersPage;
