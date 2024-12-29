import copyright from '../assets/copyright.png';
import logo from '../assets/diA_business.png';
import Login from '../containers/Login';

export default function LoginPage() {
  return (
    <>
      <div className='h-screen w-screen bg-slate-200'>
        <div className='absolute w-2/5 h-f p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='flex flex-col h-full justify-between'>
            <div className='flex flex-col border border-gray-300 shadow-lg p-6 h-full bg-white'>
              <div className='flex justify-center'>
                <img src={logo} alt='dIA logo' />
              </div>
              <div className='text-3xl text-hanaindigo mb-4'>LOGIN</div>
              <Login />
              <div className='flex justify-center'>
                <img className='w-20' src={copyright} alt='copyright' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
