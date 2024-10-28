import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CJL from '../components/ConsultationJournalList';
import CI from '../components/CustomerInformation';
import GL from '../components/GuestList';
import SCL from '../components/ScheduledConsultationList';

export default function CustomerDetailPage() {
  const location = useLocation();
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [customers, setCustomers] = useState<any[]>([]);
  const [scheduledConsultations, setScheduledConsultations] = useState<any[]>([]);

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

  // 페이지가 로드될 때, 메인 페이지에서 선택된 손님 ID를 가져옵니다.
  useEffect(() => {
    const state = location.state as { selectedCustomerId: number | null };
    if (state && state.selectedCustomerId) {
      setSelectedCustomerId(state.selectedCustomerId);
    }
  }, [location.state]);

  // selectedCustomerId가 변경될 때마다 상담 일정을 가져오는 useEffect 추가
  useEffect(() => {
    const fetchScheduledConsultations = async () => {
      if (selectedCustomerId) {
        // 상담 일정을 가져오는 로직을 추가해야 함 (가상의 URL 사용)
        try {
          const response = await fetch(`../../public/data/ScheduledConsultations.json`);
          const data = await response.json();
          const filteredConsultations = data.filter(
            (consultation: any) => consultation.customerId === selectedCustomerId
          );
          setScheduledConsultations(filteredConsultations);
        } catch (error) {
          console.error('Error fetching scheduled consultations:', error);
        }
      }
    };

    fetchScheduledConsultations();
  }, [selectedCustomerId]);

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
        <div className='overflow-y-auto'>
          <CI customerId={selectedCustomerId} />
        </div>
        <div className='overflow-y-auto'>
          <SCL consultations={scheduledConsultations} />
        </div>
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
