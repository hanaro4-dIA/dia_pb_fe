import { useState } from 'react';
import ScheduledConsultationList from '../containers/ApprovedConsultationsList';
import ConsultationJournalList from '../containers/ConsultationJournalList';
import CustomerInformation from '../containers/CustomerInformation';
import CustomerList from '../containers/CustomerList';
import { type TConsultingProps } from '../types/dataTypes';

export default function CustomerDetailPage() {
  const [scheduledConsultations] = useState<TConsultingProps[]>([]);

  return (
    <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
      {/* 첫 번째 열: 손님 목록 */}
      <div className='flex flex-col flex-grow w-1/4 h-full overflow-y-auto'>
        <CustomerList />
      </div>

      {/* 두 번째 열: 손님 정보와 상담 일정 */}
      <div className='flex flex-col flex-grow w-1/4 h-full space-y-4'>
        <div>
          <CustomerInformation />
        </div>
        <div className='flex-grow h-full overflow-y-auto'>
          <ScheduledConsultationList consultations={scheduledConsultations} />
        </div>
      </div>

      {/* 세 번째 열: 상담 일지 */}
      <div className='flex flex-col flex-grow w-1/4 h-full'>
        <ConsultationJournalList />
      </div>
    </div>
  );
}
