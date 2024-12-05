import { useState } from 'react';
import Section from '../components/Section';
import ConsultationRequest from '../containers/ConsultationRequest';
import GuestList from '../containers/GuestList';
import PbCalendar from '../containers/PbCalendar';
import PbProfile from '../containers/PbProfile';
import ScheduledConsultationList from '../containers/ScheduledConsultationList';
import { type TConsultingProps } from '../types/dataTypes';

export default function MainPage() {
  const [scheduledConsultations, setScheduledConsultations] = useState<
    TConsultingProps[]
  >([]);

  // 상담 요청을 예정된 일정에 추가하는 함수
  const handleApproveConsultation = (
    approvedConsultation: TConsultingProps
  ) => {
    setScheduledConsultations((prev) => [...prev, approvedConsultation]);
  };

  return (
    <div className='flex flex-row justify-between w-full h-screen p-5 gap-5'>
      {/* 첫 번째 열 */}
      <div className='flex flex-col flex-grow w-1/4 h-full space-y-5'>
        {/* 프로필 */}
        <div className='overflow-y-auto w-full h-3/5'>
          <PbProfile />
        </div>
        {/* 들어온 상담 요청 */}
        <div className='overflow-y-auto h-full'>
          <ConsultationRequest onApprove={handleApproveConsultation} />
        </div>
      </div>

      {/* 두 번째 열 */}
      <div className='flex flex-col w-5/12 h-full space-y-5'>
        {/* 캘린더 */}
        <Section title='전체 상담 일정' logoImg={true}>
          <PbCalendar />
        </Section>

        {/* 예정된 상담 일정 */}
        <div className='flex flex-col h-3/4 overflow-y-auto'>
          <ScheduledConsultationList consultations={scheduledConsultations} />
        </div>
      </div>

      {/* 세 번째 열 */}
      <div className='flex flex-col w-1/4 h-full'>
        <div className='w-full h-full overflow-y-auto'>
          <GuestList />
        </div>
      </div>
    </div>
  );
}
