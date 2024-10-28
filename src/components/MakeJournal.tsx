import { Button } from './ui/button';

export default function MakeJoural() {
  return (
    <>
      <div className='flex flex-col justify-between border shadow-lg border-gray-200 w-full'>
        <div className='bg-hanaindigo text-[#fff] text-[1.5rem] font-extrabold p-4 rounded-t-lg pl-5'>
          상담일지 작성하기
        </div>
        <div className='flex flex-col justify-end mt-3'>
          <div className='flex flex-row justify-end mr-3 mb-3'>
            <Button className='bg-hanaindigo mr-5'>상담요청 자세히보기</Button>
            <Button className='bg-hanaindigo'>스크립트 수정</Button>
          </div>

          <div className='bg-white ml-2 mr-2 mb-3'>
            <Button className='bg-hanagold'>키워드버튼</Button>
          </div>
        </div>

        <div className='h-2/3 mb-3 mr-2 ml-2'>
          <textarea className='w-full h-full border resize-none'></textarea>
        </div>
        <div className='flex flex-row justify-between mb-5 mr-2 ml-2'>
          <div>첨부파일</div>
          <div>첨부파일명</div>
        </div>
        <div className='flex flex-row justify-between ml-3 mb-3 mr-3'>
          <div>
            <Button className='bg-hanaindigo'>파일첨부</Button>
          </div>
          <div>
            <Button className='bg-hanaindigo mr-5'>임시저장</Button>
          </div>
          <div>
            <Button className='bg-hanaindigo'>전송</Button>
          </div>
        </div>
      </div>
    </>
  );
}
