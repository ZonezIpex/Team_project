import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';

import AdminDashboard from './adminPages/AdminDashboard';
import DashboardMain from './adminPages/dashboard/Index'; // ✅ 대시보드 본문
import UsersPage from './adminPages/users/UsersPage';
import ReviewsPage from './adminPages/reviews/ReviewsPage';

import Error400 from './errorPages/Error400';
import Error401 from './errorPages/Error401';
import Error403 from './errorPages/Error403';
import Error404 from './errorPages/Error404';
import Error500 from './errorPages/Error500';
import Error503 from './errorPages/Error503';

function App() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'ko');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage language={language} onChangeLanguage={setLanguage} />} />
        <Route path="/mypage" element={<MyPage language={language} onChangeLanguage={setLanguage} />} />
        <Route path="/login" element={<LoginPage language={language} onChangeLanguage={setLanguage} />} />
        <Route path="/signup" element={<SignupPage language={language} onChangeLanguage={setLanguage} />} />
        <Route path="/profile" element={< ProfilePage language={language} onChangeLanguage={setLanguage} />} />

        {/* ✅ 어드민 레이아웃 + 중첩된 경로들 */}
        <Route path="/admin" element={<AdminDashboard language={language} onChangeLanguage={setLanguage} />}>
          <Route path="dashboard" element={<DashboardMain language={language} />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
        </Route>

        {/* 에러 페이지 */}
        <Route path="/error/400" element={<Error400 />} />
        <Route path="/error/401" element={<Error401 />} />
        <Route path="/error/403" element={<Error403 />} />
        <Route path="/error/500" element={<Error500 />} />
        <Route path="/error/503" element={<Error503 />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
