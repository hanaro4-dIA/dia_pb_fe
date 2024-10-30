import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ConsultationJournalList from '../components/ConsultationJournalList';
import CustomerInformation from '../components/CustomerInformation';
import GuestList from '../components/GuestList';
import ScheduledConsultationList from '../components/ScheduledConsultationList';
import { type TCustomersProps } from '../lib/types';
import { type TRequestedConsultationsProps } from '../lib/types';

export default function CustomerDetailPage() {
  const [customers, setCustomers] = useState<TCustomersProps[]>([]);
  const [scheduledConsultations] = useState<TRequestedConsultationsProps[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/data/Customers.json');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        alert('손님 정보를 불러오지 못했습니다.');
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
      {/* 첫 번째 열: 손님 목록 */}
      <div className='flex flex-col flex-grow w-1/4 h-full'>
        <div className='overflow-y-auto'>
          <GuestList customers={customers} />
        </div>
      </div>

      {/* 두 번째 열: 손님 정보와 상담 일정 */}
      <div className='flex flex-col flex-grow w-1/4 h-full space-y-4'>
        <div>
          <CustomerInformation customerId={Number(id)} />
        </div>
        <div className='flex-grow flex-shrink-0 min-h-0 overflow-y-auto'>
          <ScheduledConsultationList consultations={scheduledConsultations} />
        </div>
      </div>

      {/* 세 번째 열: 상담 일지 */}
      <div className='flex flex-col flex-grow w-1/4 h-full'>
        <ConsultationJournalList customerId={Number(id)} />
      </div>
    </div>
  );
}
