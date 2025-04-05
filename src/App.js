import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import MainPage from './pages/MainPage'; // ✅ 메인 페이지
import MyPage from './pages/MyPage'; // ✅ 마이페이지
import LoginPage from './pages/LoginPage'; // ✅ 로그인 페이지
import SignupPage from './pages/SignupPage'; // ✅ 회원가입 페이지
import ProfilePage from './pages/ProfilePage'; // ✅ 프로필 페이지

import AdminDashboard from './adminPages/AdminDashboard'; // ✅ 어드민 대시보드 레이아웃
import DashboardMain from './adminPages/dashboard/Index'; // ✅ 대시보드 본문
import UsersPage from './adminPages/users/UsersPage'; // ✅ 유저 관리 페이지
import ReviewsPage from './adminPages/reviews/ReviewsPage'; // ✅ 리뷰 관리 페이지

import Error400 from './errorPages/Error400'; // ✅ 에러 페이지들
import Error401 from './errorPages/Error401';
import Error403 from './errorPages/Error403';
import Error404 from './errorPages/Error404';
import Error500 from './errorPages/Error500';
import Error503 from './errorPages/Error503';

import Step1 from './pages/Step1Page'; 
import Step01 from './pages/Step1';
import Step02 from './pages/Step2';
import Step03 from './pages/Step3';
import Step04 from './pages/Step4';
import Step05 from './pages/Step5';

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

        <Route path="/profilepage" element={< ProfilePage language={language} onChangeLanguage={setLanguage} />} />

        {/* ✅ 어드민 레이아웃 + 중첩된 경로들 */}
        <Route path="/admin" element={<AdminDashboard language={language} onChangeLanguage={setLanguage} />}>
          <Route path="/step1" element={<Step1 language={language} onChangeLanguage={setLanguage} />} />
          <Route path="/step01" element={<Step01 language={language} onChangeLanguage={setLanguage} />} />
          <Route path="/step02" element={<Step02 language={language} onChangeLanguage={setLanguage} />} />
          <Route path="/step03" element={<Step03 language={language} onChangeLanguage={setLanguage} />} />
          <Route path="/step04" element={<Step04 language={language} onChangeLanguage={setLanguage} />} />
          <Route path="/step05" element={<Step05 language={language} onChangeLanguage={setLanguage} />} />
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
