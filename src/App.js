import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

import MainPage from './pages/MainPage'; // ✅ 메인 페이지
import MyPage from './pages/MyPage'; // ✅ 마이페이지
import LoginPage from './pages/LoginPage'; // ✅ 로그인 페이지
import SignupPage from './pages/SignupPage'; // ✅ 회원가입 페이지
import ProfilePage from './pages/ProfilePage'; // ✅ 프로필 페이지

import ReviewList from './pages/ReviewList'; // ✅ 리뷰 리스트 페이지
import ReviewWrite from './pages/ReviewWrite'; // ✅ 리뷰 작성 페이지

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

import Step1Page from './pages/Step1Page';
import Step2Page from './pages/Step2Page';
import Step3 from './pages/Step3';
import Step4 from './pages/Step4';
import Step5 from './pages/Step5';


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
          <Route path="/profilepage" element={<ProfilePage language={language} onChangeLanguage={setLanguage} />} />

          {/* ✅ 이력서 작성 단계 경로들 */}
          <Route path="/step1page" element={<Step1Page language={language} onChangeLanguage={setLanguage} />} />
          <Route path="/step2page" element={<Step2 language={language} onChangeLanguage={setLanguage} />} />
          <Route path="/step3" element={<Step3 language={language} onChangeLanguage={setLanguage} />} />
          <Route path="/step4" element={<Step4 language={language} onChangeLanguage={setLanguage} />} />
          <Route path="/step5" element={<Step5 language={language} onChangeLanguage={setLanguage} />} />

          {/* ✅ 리뷰 관련 라우트 추가 (친구 작업 반영) */}
          <Route path="/review" element={<ReviewList language={language} onChangeLanguage={setLanguage} />} />
          <Route path="/review/write" element={<ReviewWrite language={language} onChangeLanguage={setLanguage} />} />

          {/* 어드민 라우트 */}
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
