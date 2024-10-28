import { useState, useEffect } from 'react';
import CJL from '../components/ConsultationJournalList';
import CI from '../components/CustomerInformation';
import GL from '../components/GuestList';
import SCL from '../components/ScheduledConsultationList';

export default function CustomerDetailPage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null
  );
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('../../public/data/Customer.json');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
      {/* 첫 번째 열: 손님 목록 */}
      <div className='flex flex-col flex-grow w-1/4 h-full'>
        <div className='overflow-y-auto'>
          <GL customers={customers} onSelectCustomer={setSelectedCustomerId} />
        </div>
      </div>

      {/* 두 번째 열: 손님 정보와 상담 일정 */}
      <div className='flex flex-col flex-grow w-1/4 h-full space-y-4'>
        <div className='overflow-y-auto min-h-[500px]'>
          <CI customerId={selectedCustomerId} />
        </div>
        <div className='overflow-y-auto'>{/* <SCL /> */}</div>
      </div>

      {/* 세 번째 열: 상담 일지 */}
      <div className='flex flex-col flex-grow w-1/4 h-full'>
        <div className='overflow-y-auto'>
          <CJL customerId={selectedCustomerId} />
        </div>
      </div>
    </div>
  );
}
