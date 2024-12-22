import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '../components/ui/button';
import { type TPbDataProps } from '../types/dataTypes';

export default function Login() {
  const [isValidLoginInfo, setIsValidLoginInfo] = useState(true); // 유효성 상태
  const loginIdRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginId = loginIdRef.current?.value || '';
    const password = passwordRef.current?.value || '';

    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/pb/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id: loginId, pw: password }),
      });

      if (!response.ok) {
        throw new Error('로그인 실패');
      }

      const data: { message: string; pbData: TPbDataProps } =
        await response.json();

      if (data.message === 'Login successful') {
        localStorage.setItem('loginPB', JSON.stringify(data.pbData));
        alert('오늘 하루도 힘내세요!😊🍀');
        navigate('/');
      } else {
        throw new Error('로그인 실패');
      }
    } catch (error) {
      console.error('로그인 에러: ', error);
      setIsValidLoginInfo(false);
      loginIdRef.current?.focus();
    }
  };

  useEffect(() => {
    loginIdRef.current?.focus();
  }, []);

  return (
    <form
      onSubmit={handleLoginSubmit}
      className='flex flex-col w-full h-2/3 gap-3'
    >
      <div className='flex flex-col mt-2'>
        <input
          className='border border-gray-300 py-3 pl-3'
          type='text'
          placeholder='사원번호 입력'
          ref={loginIdRef}
          maxLength={40}
          required
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              '사원번호를 입력해주세요.'
            )
          }
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
        />
        <input
          className='border border-t-0 border-gray-300 py-3 pl-3'
          type='password'
          placeholder='비밀번호 입력'
          ref={passwordRef}
          maxLength={20}
          required
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              '비밀번호를 입력해주세요.'
            )
          }
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')}
        />
      </div>
      <div
        className={`text-red-400 p-1 text-sm ${
          isValidLoginInfo ? 'invisible' : 'visible'
        }`}
        style={{ fontFamily: 'noto-bold, sans-serif' }}
      >
        유효하지 않은 사원번호 또는 비밀번호입니다.
      </div>
      <Button className='bg-hanaindigo text-xl' type='submit'>
        로그인
      </Button>
    </form>
  );
}
