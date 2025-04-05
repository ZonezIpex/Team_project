// src/adminPages/dashboard/Index.jsx
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { fetchStats } from '../../api/statsApi'; // ✅ 더미 데이터

const Wrapper = styled.div`
  padding: 0 40px;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 1px 2px 10px rgba(0,0,0,0.1);
  padding: 30px 20px;
  width: 200px;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;

  span {
    display: block;
    font-size: 2rem;
    color: #5cbef7;
    margin-top: 8px;
  }
`;

function DashboardMain({ language }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchStats().then(setStats);
  }, []);

  const text = {
    ko: {
      title: '관리자 대시보드',
      statLabels: ['총 사용자 수', '활성 사용자', '등록된 리뷰', '이력서 제출 수'],
    },
    en: {
      title: 'Admin Dashboard',
      statLabels: ['Total Users', 'Active Users', 'Reviews Posted', 'Resumes Submitted'],
    }
  };

  const t = text[language || 'ko'];

  return (
    <Wrapper>
      <SectionTitle>{t.title}</SectionTitle>

      {stats && (
        <CardGrid>
          <StatCard>{t.statLabels[0]}<span>{stats.totalUsers}</span></StatCard>
          <StatCard>{t.statLabels[1]}<span>{stats.activeUsers}</span></StatCard>
          <StatCard>{t.statLabels[2]}<span>{stats.totalReviews}</span></StatCard>
          <StatCard>{t.statLabels[3]}<span>{stats.resumeSubmissions}</span></StatCard>
        </CardGrid>
      )}
    </Wrapper>
  );
}

export default DashboardMain;
