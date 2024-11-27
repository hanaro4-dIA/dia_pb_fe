import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import NavigationBtn from './components/NavigationBtn';
import ConsultingPage from './pages/ConsultingPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import DictionaryPage from './pages/DictionaryPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NotificationPage from './pages/NotificationPage';

function App() {
  // session 작업 필요
  // const [userInfo] = useRecoilState(userInfoState);
  // const isLogin = userInfo.isLogin;
  const isLogin = false;

  return (
    <BrowserRouter>
      <NavigationBtn />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        {isLogin && (
          <>
            <Route path='/' element={<MainPage />} />
            <Route
              path='/customerDetail/:id'
              element={<CustomerDetailPage />}
            />
            <Route path='/consulting/:id' element={<ConsultingPage />} />
            <Route path='/dictionary' element={<DictionaryPage />} />
            <Route path='/notification' element={<NotificationPage />} />
          </>
        )}
        {/* 로그인 안 했는데 접근이 불가능한 페이지에 접속한 경우 */}
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
