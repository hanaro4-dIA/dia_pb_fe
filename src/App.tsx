import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import ConsultingPage from './pages/ConsultingPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import DictionaryPage from './pages/DictionaryPage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

// session 작업 필요
function App() {
  return (
    <Routes>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/' element={<MainPage />} />
      <Route path='/customerDetail/:id' element={<CustomerDetailPage />} />
      <Route path='/consulting' element={<ConsultingPage />} />
      <Route path='/dictionary' element={<DictionaryPage />} />
    </Routes>
  );
}

export default App;
