import { Button } from '../components/ui/button';

export default function STT() {
  return (
    <div className='border borelative flex flex-col w-full h-full'>
      {/* 헤더 */}
      <div className='bg-hanaindigo text-white text-[1.5rem] font-extrabold p-3 rounded-t-lg pl-5'>
        STT 자동 작성란
      </div>

      <div className='flex flex-col justify-between p-3 space-y-2 border-x border-b border-gray-200 h-full'>
        {/* 텍스트 입력 영역 */}
        <div className='flex-1'>
          <textarea className=' overflow-y-auto h-full w-full border resize-none rounded-lg p-2 focus:outline-none min-h-[calc(100vh-14rem)]' />
        </div>

        {/* 버튼 */}
        <div className='flex justify-end'>
          <Button className='bg-hanaindigo'>저장</Button>
        </div>
      </div>
    </div>
  );
}
