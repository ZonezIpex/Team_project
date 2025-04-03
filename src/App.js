import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} /> {/* ✅ 이 줄만 추가하면 끝 */}
      </Routes>
    </Router>
  );
}

export default App;
