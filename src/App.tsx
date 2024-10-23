import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Login from './components/Login';

// 로그인 상태 확인을 위한 함수 (localStorage 사용)
function isLoggedIn() {
  return !!localStorage.getItem('isLoggedIn');
}

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect');
    if (isLoggedIn()) {
      setIsAuth(true);
      navigate('/main'); // 로그인되어 있으면 /main으로 이동
    } else {
      navigate('/login'); // 로그인되어 있지 않으면 /login으로 이동
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

export default App;
