import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './adminPages/AdminDashboard';

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
        <Route path="/admin" element={<AdminDashboard language={language} onChangeLanguage={setLanguage} />} />
      </Routes>
    </Router>
  );
}

export default App;
