import { Button } from './ui/button';

export default function MakeJournal() {
  return (
    <div className='flex flex-col border shadow-lg border-gray-200 w-full h-full rounded-t-lg'>
      <div className='bg-hanaindigo text-white text-[1.5rem] font-extrabold p-3 rounded-t-lg pl-5'>
        상담일지 작성하기
      </div>

      <div className='p-3 border h-full flex flex-col justify-between'>
        <div className='flex flex-col h-[90%] space-y-3 mb-2'>
          {/* 상담요청 내용 관련 데이터 */}
          <>
            <div className='flex justify-between items-center border-b border-black py-1'>
              <label className='text-xs'>[상담 제목]</label>
              <div className='text-sm font-bold w-[84%] px-2 focus:outline-none rounded-xl'>
                제목!!!!!!
              </div>
            </div>
            <div className='flex justify-start items-center border-b border-black py-1 space-x-2'>
              <div className='flex items-center justify-between w-1/2'>
                <label className='text-xs'>[카테고리]</label>
                <div className='text-sm font-bold w-2/3 px-2 focus:outline-none rounded-xl'>
                  카테고리
                </div>
              </div>
              <div className='flex items-center justify-between w-1/2'>
                <label className='text-xs'>[손님]</label>
                <div className='text-sm font-bold w-2/3 px-2 focus:outline-none rounded-xl'>
                  손님이름
                </div>
              </div>
            </div>
            <div className='flex justify-start items-center border-b border-black py-1 space-x-2'>
              <div className='flex items-center justify-between w-1/2'>
                <label className='text-xs'>[담당PB]</label>
                <div className='text-sm font-bold w-2/3 px-2 focus:outline-none rounded-xl'>
                  담당 PB 이름
                </div>
              </div>
              <div className='flex items-center justify-between w-1/2'>
                <label className='text-xs'>[상담일]</label>
                <div className='text-sm font-bold w-2/3 px-2 focus:outline-none rounded-xl'>
                  상담일
                </div>
              </div>
            </div>
          </>

          <div className=' flex flex-col flex-grow overflow-y-auto'>
            {/* 도큐먼트 작성란 */}
            <div className='h-1/3 mb-3'>
              <span className='text-sm mb-2'>[PB의 기록]</span>
              <textarea className='w-full h-[90%] p-2 border resize-none overflow-y-auto focus:outline-hanasilver' />
            </div>

            {/* 추천 상품 */}
            <div className='h-1/3 mb-3'>
              <span className='text-sm mb-2'>[PB의 추천 상품]</span>
              <textarea className='w-full h-[90%] p-2 border resize-none overflow-y-auto focus:outline-hanasilver' />
            </div>

            {/* 스크립트 기입란 */}
            <div className='h-1/3 mb-3'>
              <span className='text-sm mb-2'>[상담 스크립트]</span>
              <textarea className='w-full h-[90%] p-2 border resize-none overflow-y-auto focus:outline-hanasilver' />
            </div>
          </div>
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
