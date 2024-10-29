import { Button } from './ui/button';

export default function MakeJournal() {
  return (
    <div className='flex flex-col border shadow-lg border-gray-200 w-full h-full rounded-t-lg'>
      <div className='bg-hanaindigo text-white text-[1.5rem] font-extrabold p-3 rounded-t-lg pl-5'>
        상담일지 작성하기
      </div>

      <div className='p-3 border h-full flex flex-col justify-between'>
        <div className='flex flex-col justify-end mb-2'>
          {/* 상담요청 내용 관련 데이터 */}
          <>
            <div className='flex justify-between items-center border-b border-black py-1'>
              <label className='text-xs'>[상담 제목]</label>
              <input
                type='text'
                maxLength={15}
                defaultValue={'title'}
                className='text-sm font-bold w-[83%] px-2 hover:bg-hanagold/30 focus:outline-none rounded-xl'
              />
            </div>
            <div className='flex justify-start items-center border-b border-black py-1 space-x-2'>
              <div className='flex items-center justify-between w-1/2'>
                <label className='text-xs'>[카테고리]</label>
                <input
                  type='text'
                  maxLength={5}
                  defaultValue={'카테고리'}
                  className='text-sm font-bold w-2/3 px-2 hover:bg-hanagold/30 focus:outline-none rounded-xl'
                />
              </div>
              <div className='flex items-center justify-between w-1/2'>
                <label className='text-xs'>[손님]</label>
                <input
                  type='text'
                  maxLength={10}
                  defaultValue={'손님이름'}
                  className='text-sm font-bold w-2/3 px-2 hover:bg-hanagold/30 focus:outline-none rounded-xl'
                />
              </div>
            </div>
            <div className='flex justify-start items-center border-b border-black py-1 space-x-2'>
              <div className='flex items-center justify-between w-1/2'>
                <label className='text-xs'>[담당PB]</label>
                <input
                  type='text'
                  maxLength={5}
                  defaultValue={'PB'}
                  className='text-sm font-bold w-2/3 px-2 hover:bg-hanagold/30 focus:outline-none rounded-xl'
                />
              </div>
              <div className='flex items-center justify-between w-1/2'>
                <label className='text-xs'>[상담일]</label>
                <input
                  type='text'
                  maxLength={20}
                  defaultValue={'상담일'}
                  className='text-sm font-bold w-2/3 px-2 hover:bg-hanagold/30 focus:outline-none rounded-xl'
                />
              </div>
            </div>
          </>
        </div>

        {/* 도큐먼트 작성란 */}
        <div className='border border-blue-400 h-1/3 mb-3'>
          <span>PB의 기록</span>
          {/* <textarea className='w-full h-full border resize-none overflow-y-auto' /> */}
        </div>

        {/* 스크립트 기입란 */}
        <div className='border border-blue-400 h-1/3 mb-3'>
          <span>상담 스크립트</span>
          {/* <textarea className='w-full h-full border resize-none overflow-y-auto' /> */}
        </div>

        <div className='flex items-center mb-2 '>
          <span className='text-xs mr-2'>[첨부파일]</span>
          <input type='file' className='text-xs' />
        </div>

        {/* 최하단 버튼 */}
        <div className='flex justify-end'>
          <div>
            <Button className='bg-hanasilver w-20 mr-5 px-2 rounded-xl'>
              임시저장
            </Button>
          </div>
          <div>
            <Button className='bg-hanaindigo w-20 px-2 rounded-xl'>전송</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
