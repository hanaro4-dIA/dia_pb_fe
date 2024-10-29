// PR TEST
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ConsultationRequest from '../components/ConsultationRequest';
import GuestList from '../components/GuestList';
import PbCalendar from '../components/PbCalendar';
import ScheduledConsultationList from '../components/ScheduledConsultationList';
import PbProfile from '../components/pbProfile';
import { Button } from '../components/ui/button';

export default function MainPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [scheduledConsultations, setScheduledConsultations] = useState<any[]>(
    []
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/data/Customers.json');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        alert('Error fetching data:');
      }
    };

    fetchCustomers();
  }, []);

  // 상담 요청을 예정된 일정에 추가하는 함수
  const handleApproveConsultation = (approvedConsultation: any) => {
    setScheduledConsultations((prev) => [...prev, approvedConsultation]);
  };

  return (
    <div className='flex flex-row justify-between w-full h-screen p-5'>
      {/* 프로필과 들어온 상담 요청 */}
      <div className='flex flex-col flex-grow w-1/4 h-full mr-10'>
        {/* 프로필 */}
        <div className='overflow-y-auto w-full h-3/5 mb-5'>
          <PbProfile />
        </div>
        {/* Dictionary 버튼 */}
        <Link className='w-full' to={'/dictionary'}>
          <Button className='w-full mb-5 bg-white text-black border border-hanaindigo hover:text-white hover:bg-hanagold'>
            딕셔너리 바로가기
          </Button>
        </Link>
        {/* 들어온 상담 요청 */}
        <div className='overflow-y-auto h-full'>
          <ConsultationRequest onApprove={handleApproveConsultation} />
        </div>
      </div>

      {/* 캘린더와 예정된 상담 일정 */}
      <div className='flex flex-col w-5/12 h-full mr-10'>
        {/* 캘린더 */}
        <div className='flex items-center justify-between bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 pl-5 rounded-t-lg'>
          캘린더
        </div>
        <div className='flex w-full h-1/2 mb-5'>
          <PbCalendar />
        </div>
        {/* 예정된 상담 일정 */}
        <div className='flex flex-col h-1/2 overflow-y-auto'>
          <ScheduledConsultationList consultations={scheduledConsultations} />
        </div>
      </div>

      {/* 손님 목록 */}
      <div className='flex flex-col w-1/4 h-full'>
        {/* 손님 목록 */}
        <div className='overflow-y-auto'>
          <GuestList customers={customers} />
        </div>
      </div>
    </div>
  );
}
