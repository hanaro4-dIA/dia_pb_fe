import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import App from './App.tsx';
import NavigationBtn from './components/NavigationBtn.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <NavigationBtn />
      <App />
    </BrowserRouter>
  </StrictMode>
);
