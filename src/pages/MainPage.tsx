import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/diA.png';
import ConsultationRequest from '../components/ConsultationRequest';
import GuestList from '../components/GuestList';
import PbCalendar from '../components/PbCalendar';
import PbProfile from '../components/PbProfile';
import ScheduledConsultationList from '../components/ScheduledConsultationList';
import { Button } from '../components/ui/button';
import { type TCustomersProps } from '../lib/types';
import { type TRequestedConsultationsProps } from '../lib/types';

export default function MainPage() {
  const [customers, setCustomers] = useState<TCustomersProps[]>([]);
  const [scheduledConsultations, setScheduledConsultations] = useState<TRequestedConsultationsProps[]>(
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
  const handleApproveConsultation = (approvedConsultation: TRequestedConsultationsProps) => {
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
          <Button className='w-full mb-5  bg-white text-black border border-hanaindigo hover:text-white hover:bg-hanagold'>
            키워드 DB 목록 바로가기
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
        <div className='flex items-center  bg-hanaindigo p-3 pl-5 rounded-t-lg'>
          <img src={logo} alt='dIA logo' className='w-8 mr-4 rounded-full' />
          <p className='text-white text-[1.3rem] font-extrabold'>
            전체 상담 일정
          </p>
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
