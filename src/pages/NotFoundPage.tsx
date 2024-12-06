import { Link } from 'react-router-dom';
import logo from '../assets/diA_business.png';
import notFoundImg from '../assets/notFound.gif';

export default function NotFoundPage() {
  return (
    <>
      <div className='h-screen w-screen bg-slate-200'>
        <div className='absolute w-2/5 h-f p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='shadow-lg p-6 bg-white'>
            <div className='flex flex-col items-center'>
              <img src={logo} alt='dIA logo' />
              <img src={notFoundImg} className='w-56 ' />
              <span className='text-hanaindigo font-extrabold text-xl'>
                존재하지 않는 페이지입니다.
              </span>
              <span className='flex justify-center mt-5'>
                하나은행의 얼굴이 되어주시는 여러분께 진심으로 감사드립니다.
              </span>
              <span>오늘도 무탈한 하루 되세요:)</span>
              <Link to='/login'>
                <button className='bg-hanagreen text-white rounded mt-5 px-3 py-2'>
                  로그인 페이지로 이동하기
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
