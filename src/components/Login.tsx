import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import PbJsonData from '../../public/data/PB.json';
import { Button } from './ui/button';

export default function Login() {
  const businessIdRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  let [isValidLoginInfo, setIsValidLoginInfo] = useState(true);
  const navigate = useNavigate();

  const pbData = PbJsonData;

  const handleSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit 동작!!');
    handleLogin();
  };

  // 로그인 로직
  const handleLogin = () => {
    console.log('로그인 로직 들어옴');
    const businessId = businessIdRef.current?.value;
    const password = passwordRef.current?.value;
    console.log('ref :', businessId, password);

    if (validCheck(+businessId!, password!) === 1) {
      navigate('/');
    } else {
      setIsValidLoginInfo(false);
    }
  };

  // 로그인 체크 로직
  const validCheck = (businessId: number, password: string) => {
    const checked = pbData.filter(
      (data) => data.businessId === businessId && data.password === password
    );
    return checked.length;
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full h-2/3 gap-3'>
      <div className='flex flex-col mt-2'>
        <input
          className='border border-gray-300 p-3'
          type='text'
          placeholder='사원번호 입력'
          ref={businessIdRef}
        ></input>
        <input
          className='border border-t-0 border-gray-300 p-3'
          type='password'
          placeholder='비밀번호 입력'
          ref={passwordRef}
        ></input>
      </div>
      <div
        className={`text-red-400 font-bold mb-5 ${isValidLoginInfo ? 'invisible' : 'visible '}`}
      >
        유효하지 않은 사원번호 또는 비밀번호 입니다.
      </div>
      <Button className='bg-hanaindigo text-xl' type='submit'>
        로그인
      </Button>
    </form>
  );
}
