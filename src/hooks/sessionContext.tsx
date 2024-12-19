import React, { createContext, useContext, useState } from 'react';
import { type TPbDataProps } from '../types/dataTypes';

type SessionContextType = {
  handleLogoutEvent: () => void;
};

export const SessionContext = createContext<SessionContextType | undefined>(
  undefined
);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [_, setPbData] = useState<TPbDataProps | null>(null);

  const handleLogoutEvent = () => {
    setPbData(null);
    localStorage.removeItem('loginPB');
    alert('오늘 하루도 고생하셨습니다!😊🎉');
    window.location.reload();
  };

  return (
    <SessionContext.Provider
      value={{
        handleLogoutEvent,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession, SessionProvider 사용 중 오류가 발생했습니다.');
  }
  return context;
};
