import { Button } from './ui/button';

export default function Consulting() {
  return (
    <>
      <div className='w-screen h-screen'>
        <div className='absolute flex flex-row justify-between w-11/12 h-5/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='flex flex-col justify-between w-2/3'>
            <div className='flex flex-row justify-between border-b-2 border-gray-200 mb-3 mr-3 p-2'>
              <div className='text-xl font-bold text-hanagold'>조경은 손님</div>
              <div>
                <Button className='border border-hanaindigo bg-white text-black'>
                  전화
                </Button>
              </div>
            </div>
            <div className='flex flex-col h-full  mb-3 mr-3 border shadow-lg border-gray-200'>
              <div className='p-3 font-bold text-white bg-hanaindigo'>
                손님 정보
              </div>
              <div className='p-2 divide-y-2'>
                <div className='flex flex-row justify-between p-2 mb-2 bg-white'>
                  <div>손님과 만난 날짜</div>
                  <div>만난 날짜</div>
                </div>
                <div className='flex flex-row justify-between p-2 mb-2 bg-white'>
                  <div>최근 상담 날짜</div>
                  <div>상담 날짜</div>
                </div>
                <div className='flex flex-row justify-between p-2 mb-2 bg-white'>
                  <div>상담 횟수</div>
                  <div>상담 횟수 데이터</div>
                </div>
                <div className='flex flex-col h-3/5 justify-between p-2'>
                  <div className='text-center items-center'>메모</div>
                  <div className='mb-2 h-full w-full border'>
                    <textarea className='h-full w-full'></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col h-2/3 mr-3 border shadow-lg border-gray-200'>
              <div className=' p-3 font-bold  text-white bg-hanaindigo'>
                상담일지 리스트
              </div>
              <div className='p-2'>리스트 데이터</div>
            </div>
          </div>
          <div className='relative flex flex-col w-full mr-3 border shadow-lg border-gray-200'>
            <div className='text-xl font-bold p-3 text-white bg-hanaindigo'>
              STT 자동 작성란
            </div>
            <div className='h-full w-full p-2'>
              <textarea className='h-full w-full border'></textarea>
            </div>
            <div className='absolute bottom-0 right-6 mb-6'>
              <Button className='bg-hanaindigo'>저장</Button>
            </div>
          </div>

          <div className='flex flex-col justify-between border shadow-lg border-gray-200 w-full'>
            <div className='text-xl p-3 font-bold text-white bg-hanaindigo'>
              상담일지 작성하기
            </div>
            <div className='flex flex-col justify-end mt-3'>
              <div className='flex flex-row justify-end mr-3 mb-3'>
                <Button className='bg-hanaindigo mr-5'>
                  상담요청 자세히보기
                </Button>
                <Button className='bg-hanaindigo'>스크립트 수정</Button>
              </div>

              <div className='bg-white ml-2 mr-2 mb-3'>
                <Button className='bg-hanagold'>키워드버튼</Button>
              </div>
            </div>

            <div className='h-2/3 mb-3 mr-2 ml-2'>
              <textarea className='w-full h-full border'></textarea>
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
        </div>
      </div>
    </>
  );
}
