import { Label } from '@radix-ui/react-label';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Login() {
  return (
    <>
      <div className='h-screen w-screen'>
        <div className='absolute w-2/5 h-2/3 p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-2/3'>
          <div className='flex flex-col h-full justify-between mb-5'>
            <div className='flex justify-center'>
              <img src='/logo.png' alt='dIA logo' />
            </div>
            <div className='flex flex-col gap-5 justify-between p-7 h-full'>
              <div className='text-3xl text-hanaindigo mb-5'>LOG-IN</div>
              <Input
                className='mb-2 border-gray-300'
                type='text'
                placeholder='사원번호 입력'
              ></Input>
              <Input
                className='mb-2 border-gray-300'
                type='password'
                placeholder='비밀번호 입력'
              ></Input>
              <Button className='bg-hanaindigo text-xl'>로그인</Button>
              <Label className='text-xs text-center text-gray-300'>
                copyright @dIA
              </Label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
