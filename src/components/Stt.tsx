import { Button } from '../components/ui/button';

export default function STT() {
  return (
    <div className='relative flex flex-col w-full h-full'>
      {/* 헤더 */}
        <div className='bg-hanaindigo text-white text-[1.5rem] font-extrabold p-4 rounded-t-lg pl-5'>
          STT 자동 작성란
        </div>
      <div className='border-x border-b border-gray-200'>
        {/* 텍스트 입력 영역 */}
        <div className='flex-1 p-3 overflow-y-auto'>
          <textarea
            className="h-full w-full border resize-none rounded-lg p-2 focus:outline-none min-h-[calc(100vh-14rem)]"/>
        </div>

        {/* 버튼 */}
        <div className='flex justify-end p-3'>
          <Button className='bg-hanaindigo'>저장</Button>
        </div>
      </div>
    </div>
  );
}
