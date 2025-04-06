import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/review" element={<ReviewList />} />
        <Route path="/review/write" element={<ReviewWrite />} />
      </Routes>
    </Router>
  );
}

export default App;
