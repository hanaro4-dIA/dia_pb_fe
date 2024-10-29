import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';
import ConsultingPage from './pages/ConsultingPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import DictionaryPage from './pages/DictionaryPage';
import MainPage from './pages/MainPage';

// 로그인 상태 확인을 위한 함수 (localStorage 사용)
function isLoggedIn() {
  // return !!localStorage.getItem('isLoggedIn');
  return true;
}

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<MainPage />} />
      <Route path='/customerDetail/:id' element={<CustomerDetailPage />} />
      <Route path='/consulting' element={<ConsultingPage />} />
      <Route path='/dictionary' element={<DictionaryPage />} />
    </Routes>
  );
}

export default App;
