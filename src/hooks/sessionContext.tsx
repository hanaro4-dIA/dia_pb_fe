import React, { createContext, useContext, useState, useEffect } from 'react';
import { type TPbProps } from '../types/dataTypes';

type SessionContextType = {
  user: TPbProps | null;
  handleLoginEvent: (userData: TPbProps) => void;
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
  const [user, setUser] = useState<TPbProps | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginEvent = (userData: TPbProps) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    alert('오늘 하루도 힘내세요!😊🍀');
  };

  const handleLogoutEvent = () => {
    setUser(null);
    localStorage.removeItem('user');
    alert('오늘 하루도 고생하셨습니다!😊🎉');
    window.location.reload();
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        handleLoginEvent,
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
