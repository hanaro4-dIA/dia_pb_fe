import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import NavigationBtn from './components/NavigationBtn';
import ConsultingPage from './pages/ConsultingPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import DictionaryPage from './pages/DictionaryPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import NotificationPage from './pages/NotificationPage';

function App() {
  // session 작업 필요
  // const [userInfo] = useRecoilState(userInfoState);
  // const isLogin = userInfo.isLogin;
  const isLogin = false;

  const ProtectedLayout = () => {
    if (!isLogin) {
      return <Navigate to='/login' replace />;
    }
    return (
      <>
        <NavigationBtn />
        <Outlet />
      </>
    );
  };

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
        </Route>
        {/* 로그인 안했는데 접근 불가능한 페이지 접속한 경우 */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
