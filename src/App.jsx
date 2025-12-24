import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChristmasPage from './pages/ChristmasPage';
import PhotoBook from './pages/PhotoBook';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChristmasPage />} />
        <Route path="/photobook" element={<PhotoBook />} />
      </Routes>
    </Router>
  );
}

export default App;
