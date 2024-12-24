import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import NavigationBtn from './components/NavigationBtn';
import ConsultingPage from './pages/ConsultingPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import DictionaryPage from './pages/DictionaryPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Naver from './pages/Naver';
import NotFoundPage from './pages/NotFoundPage';
import NotificationPage from './pages/NotificationPage';

const ProtectedLayout = () => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('loginPB');

  useEffect(() => {
    if (!isLogin) {
      navigate('/login', { replace: true });
    }
  }, [isLogin, navigate]);

  if (!isLogin) {
    return null;
  }

  return (
    <>
      <NavigationBtn />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route element={<ProtectedLayout />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/customerDetail/:id' element={<CustomerDetailPage />} />
          <Route path='/consulting/:id' element={<ConsultingPage />} />
          <Route path='/dictionary' element={<DictionaryPage />} />
          <Route path='/notification' element={<NotificationPage />} />
          <Route path='/naver' element={<Naver />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
