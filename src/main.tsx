import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.tsx';
import { ConsultationProvider } from './hooks/consultationsContext.tsx';
import { SessionProvider } from './hooks/sessionContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SessionProvider>
      <ConsultationProvider>
        <App />
      </ConsultationProvider>
    </SessionProvider>
  </StrictMode>
);
