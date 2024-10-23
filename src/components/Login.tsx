import { Button } from '../stories/Button';

export default function Login() {
  return (
    <>
      <div className='bg-green-100 h-screen w-screen'>
        <div className='absolute w-2/5 h-2/3 p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='bg-yellow-400 mb-5'>
            <h1 className='text-center'>dIA</h1>
          </div>

          <div className='flex flex-row'>
            <div className='flex flex-col justify-center w-full p-4 rounded-xl shadow-md bg-white'>
              <div className='text-center'>
                <h1 className='text-2xl text-green-500 mt-5 mb-10'>LOG IN</h1>
                <input
                  className='p-3 mb-8 border w-2/3 outline-0 border-white border-b-gray-400'
                  type='text'
                  placeholder='사원번호를 입력해주세요.'
                />
                <input
                  className='p-3 mb-8 border w-2/3 outline-0 border-white border-b-gray-400'
                  type='password'
                  placeholder='비밀번호를 입력해주세요.'
                />
              </div>

              <div className='text-center'>
                <Button label={'Log In'}></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
