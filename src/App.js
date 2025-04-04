import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './adminPages/AdminDashboard';
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
        <Route path="/admin" element={<AdminDashboard language={language} onChangeLanguage={setLanguage} />} />
        <Route path="/step1" element={<Step1 language={language} onChangeLanguage={setLanguage} />} />
        <Route path="/step01" element={<Step01 language={language} onChangeLanguage={setLanguage} />} />
        <Route path="/step02" element={<Step02 language={language} onChangeLanguage={setLanguage} />} />
        <Route path="/step03" element={<Step03 language={language} onChangeLanguage={setLanguage} />} />
        <Route path="/step04" element={<Step04 language={language} onChangeLanguage={setLanguage} />} />
        <Route path="/step05" element={<Step05 language={language} onChangeLanguage={setLanguage} />} />
      </Routes>
    </Router>
  );
}

export default App;
