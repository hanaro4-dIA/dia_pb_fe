import React, { createContext, useContext } from 'react';

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
  const handleLogoutEvent = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_KEY;
      const response = await fetch(`${baseUrl}logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('로그아웃에 실패했습니다.');
      }

      localStorage.removeItem('loginPB');
      alert('오늘 하루도 고생하셨습니다!😊🎉');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
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
