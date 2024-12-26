import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import { SessionProvider } from './hooks/sessionContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <SessionProvider>
    <App />
  </SessionProvider>
  // </StrictMode>
);
