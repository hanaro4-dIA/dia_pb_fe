import React, { createContext, useContext, useState, useEffect } from 'react';
import { TPbProps } from '../types/dataTypes';

type SessionContextType = {
  user: TPbProps | null;
  isLogin: boolean;
  handleLoginEvent: (userData: TPbProps) => void;
  handleLogoutEvent: () => void;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<TPbProps | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true); // false로 바꿀 것

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLogin(true);
    }
  }, []);

  const handleLoginEvent = (userData: TPbProps) => {
    setUser(userData);
    setIsLogin(true);
    localStorage.setItem('user', JSON.stringify(userData));
    alert('오늘 하루도 힘내세요!😊🍀');
  };

  const handleLogoutEvent = () => {
    setUser(null);
    setIsLogin(false);
    localStorage.removeItem('user');
    alert('오늘 하루도 고생하셨습니다!😊🎉');
  };

  return (
    <SessionContext.Provider
      value={{ user, isLogin, handleLoginEvent, handleLogoutEvent }}
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
