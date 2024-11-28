import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import PbJsonData from '../../public/data/PB.json';
import { Button } from '../components/ui/button';
import { useSession } from '../hooks/sessionContext';
import { type TPbProps } from '../types/dataTypes';

export default function Login() {
  const { handleLoginEvent } = useSession();
  const pbData = PbJsonData;

  const businessIdRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  let [isValidLoginInfo, setIsValidLoginInfo] = useState(true);
  const navigate = useNavigate();

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const businessId = businessIdRef.current?.value;
    const password = passwordRef.current?.value;

    if (businessId && password) {
      const loginUser = validCheck(businessId, password);
      if (loginUser) {
        handleLoginEvent(loginUser);
        navigate('/');
      } else {
        setIsValidLoginInfo(false);
        businessIdRef.current?.focus();
      }
    }
  };

  // 로그인 체크 로직
  const validCheck = (
    inputBusinessId: string,
    inputPassword: string
  ): TPbProps | null => {
    // 정규식 패턴
    const businessIdPattern = /^Hana\d{9}$/;
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    // 정규식 체크
    if (
      !businessIdPattern.test(inputBusinessId) ||
      !passwordPattern.test(inputPassword)
    ) {
      return null;
    }

    // 존재 여부
    const loginUser = pbData.find(
      ({ business_id, password }) =>
        business_id === inputBusinessId && password === inputPassword
    );

    console.log('로그인한 PB 정보 >>', loginUser);
    return loginUser || null;
  };

  useEffect(() => {
    businessIdRef.current?.focus();
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
          ref={businessIdRef}
          maxLength={40}
          required
          onInvalid={(e) =>
            (e.target as HTMLInputElement).setCustomValidity(
              '사원번호를 입력해주세요.'
            )
          }
          onInput={(e) => (e.target as HTMLInputElement).setCustomValidity('')} // 입력 시 메시지 초기화
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
        className={`text-red-400 font-bold p-1 text-sm ${isValidLoginInfo ? 'invisible' : 'visible '}`}
      >
        유효하지 않은 사원번호 또는 비밀번호 입니다.
      </div>
      <Button className='bg-hanaindigo text-xl' type='submit'>
        로그인
      </Button>
    </form>
  );
}
