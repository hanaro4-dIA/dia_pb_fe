import Login from '../components/Login';
import { Label } from '../components/ui/label';

export default function LoginPage() {
  return (
    <>
      <div className='h-screen w-screen bg-slate-200'>
        <div className='absolute w-2/5 h-f p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='flex flex-col h-full justify-between'>
            <div className='flex flex-col border border-gray-300 shadow-lg p-5 h-full bg-white'>
              <div className='flex justify-center'>
                <img src='/logo.png' alt='dIA logo' />
              </div>
              <div className='text-3xl text-hanaindigo mb-7'>LOGIN</div>
              <Login />
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
