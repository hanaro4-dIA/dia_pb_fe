// PR TEST
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CR from '../components/ConsultationRequest';
import GL from '../components/GuestList';
import PP from '../components/PbProfile';
import SCL from '../components/ScheduledConsultationList';
import { Button } from '../components/ui/button';

export default function MainPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [scheduledConsultations, setScheduledConsultations] = useState<any[]>(
    []
  );


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

  // 상담 요청을 예정된 일정에 추가하는 함수
  const handleApproveConsultation = (approvedConsultation: any) => {
    setScheduledConsultations((prev) => [...prev, approvedConsultation]);
  };

  return (
    <div className='flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden'>
      {/* 프로필과 들어온 상담 요청 */}
      <div className='flex flex-col flex-grow w-1/4 h-full space-y-4'>
        {/* 프로필 */}
        <div className='overflow-y-auto min-h-[250px]'>
          <PP />
        </div>
        {/* Dictionary 버튼 */}
        <Link className='w-full' to={'/dictionary'}>
          <Button className='w-full bg-white text-black border border-hanaindigo hover:text-white hover:bg-hanagold'>
            딕셔너리 바로가기
          </Button>
        </Link>
        {/* 들어온 상담 요청 */}
        <div className='overflow-y-auto'>
          <CR onApprove={handleApproveConsultation} />
        </div>
      </div>

      {/* 캘린더와 예정된 상담 일정 */}
      <div className='flex flex-col flex-grow w-1/4 h-full space-y-4'>
        {/* 캘린더 */}
        <div className='overflow-y-auto min-h-[400px] bg-red-600'>캘린더</div>
        {/* 예정된 상담 일정 */}
        <div className='overflow-y-auto'>
          <SCL consultations={scheduledConsultations} />
        </div>
      </div>

      {/* 손님 목록 */}
      <div className='flex flex-col flex-grow w-1/4 h-full'>
        {/* 손님 목록 */}
        <div className='overflow-y-auto'>
          <GL customers={customers}/>
        </div>
      </div>
    </div>
  );
}
