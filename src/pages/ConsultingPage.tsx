import CJL from '../components/ConsultationJournalList';
import CI from '../components/CustomerInformation';
import MakeJournal from '../components/MakeJournal';
import S from '../components/Stt';
import { Button } from '../components/ui/button';

export default function ConsultingPage() {
  return (
    <>
      <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
        {/* 프로필과 들어온 상담 요청 */}
        <div className='flex flex-col flex-grow w-1/4 h-full space-y-4'>
          <div className='flex justify-between p-3 items-center border-b border-black'>
            <div className='text-2xl font-bold text-hanagold'>조경은 손님</div>
            <div>
              <Button className='border border-hanaindigo bg-white text-black hover:text-white'>
                전화
              </Button>
            </div>
          </div>

          {/* 손님 정보 */}
          <div className='overflow-y-auto min-h-[300px]'>
            <CI customerId={1} />
          </div>

          {/* 상담일지 리스트 */}
          <div className='overflow-y-auto'>
            <CJL customerId={1} />
          </div>
        </div>

        {/* STT 자동 작성란 */}
        <div className='flex flex-col flex-grow w-1/4 h-full'>
          <div className='overflow-y-auto'>
            <S />
          </div>
        </div>

        {/* 상담일지 작성하기 */}
        <div className='flex flex-col flex-grow w-1/4 h-full'>
          {/* <div className='overflow-y-auto h-full'> */}
          <MakeJournal />
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
