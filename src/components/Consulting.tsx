import { Button } from '../stories/Button';

export default function Consulting() {
  return (
    <>
      <div className='w-screen h-screen'>
        <div className='absolute flex flex-row justify-between w-11/12 h-5/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <div className='flex flex-col justify-between w-2/3'>
            <div className='flex flex-row justify-between border border-gray-200 mb-3 mr-3 p-2 rounded-2xl bg-green-600 shadow-lg'>
              <div className='text-xl font-bold text-white'>조경은 손님</div>
              <div>
                <Button label={'전화'} size='small'></Button>
              </div>
            </div>
            <div className='flex flex-col h-full rounded-2xl mb-3 mr-3 border shadow-lg border-gray-200 bg-yellow-50'>
              <div className='rounded-t-2xl p-3 font-bold text-white bg-green-600'>
                손님 정보
              </div>
              <div className='p-2'>
                <div className='flex flex-row justify-between p-2 mb-2 rounded-2xl bg-white'>
                  <div>손님과 만난 날짜</div>
                  <div>만난 날짜</div>
                </div>
                <div className='flex flex-row justify-between p-2 mb-2 rounded-2xl bg-white'>
                  <div>최근 상담 날짜</div>
                  <div>상담 날짜</div>
                </div>
                <div className='flex flex-row justify-between p-2 mb-2 rounded-2xl bg-white'>
                  <div>상담 횟수</div>
                  <div>상담 횟수 데이터</div>
                </div>
                <div className='flex flex-col h-3/5 justify-between p-2 rounded-2xl bg-white'>
                  <div className='text-center'>메모</div>
                  <div className='mb-2 h-full w-full'>
                    <input></input>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col h-2/3 rounded-2xl mr-3 border shadow-lg border-gray-200 bg-yellow-50'>
              <div className='rounded-t-2xl p-3 font-bold  text-white bg-green-600'>
                상담일지 리스트
              </div>
              <div className='p-2'>리스트 데이터</div>
            </div>
          </div>
          <div className='relative flex flex-col w-full mr-3 rounded-2xl border shadow-lg border-gray-200 bg-yellow-50'>
            <div className='text-xl font-bold p-2 rounded-t-2xl text-white bg-green-600'>
              STT 자동 작성란
            </div>
            <div>stt 채팅 영역</div>
            <div className='absolute bottom-0 right-4 mb-6'>
              <Button label={'저장'}></Button>
            </div>
          </div>

          <div className='flex flex-col justify-between border shadow-lg border-gray-200 rounded-2xl w-full bg-yellow-50'>
            <div className='rounded-t-2xl p-3 font-bold text-white bg-green-600'>
              상담일지 작성하기
            </div>
            <div className='flex flex-col justify-end mt-3'>
              <div className='flex flex-row justify-end mr-3'>
                <Button
                  label={'상담요청 자세히보기'}
                  backgroundColor='green'
                ></Button>
                <Button
                  label={'스크립트 수정'}
                  backgroundColor='green'
                ></Button>
              </div>

              <div className='bg-white ml-2 mr-2'>
                <Button label={'키워드 버튼'} backgroundColor='yellow'></Button>
              </div>
            </div>

            <div className='bg-slate-200 h-2/3 mb-3 mr-2 ml-2'>
              일지 작성 영역
            </div>
            <div className='flex flex-row justify-between mb-5 mr-2 ml-2'>
              <div>첨부파일</div>
              <div>첨부파일명</div>
              <div>
                {' '}
                <Button label={'파일첨부'}></Button>
              </div>
            </div>
            <div className='flex flex-row justify-end mb-2 mr-2'>
              <div>
                <Button label={'임시저장'} backgroundColor='green'></Button>
              </div>
              <div>
                <Button label={'전송'} backgroundColor='green'></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
