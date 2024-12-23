import { useEffect, useState } from 'react';
import clearAllRequests from '../assets/clearAllRequests.gif';
import { RequestedConsultationItem } from '../components/RequestedConsultationItem';
import Section from '../components/Section';
import useFetch from '../hooks/useFetch';
import { TConsultationProps } from '../types/dataTypes';

export default function RequestedConsultationsList() {
  const { data, error } = useFetch<TConsultationProps[]>(
    `reserves?status=false`
  );

  const [requestedConsultations, setRequestedConsultations] = useState<
    TConsultationProps[] | []
  >([]);

  useEffect(() => {
    setRequestedConsultations(data || []);
  }, [data]);

  const handleApprove = (id: string) => {
    setRequestedConsultations((prev) =>
      prev.filter((consultation) => consultation.id !== Number(id))
    );
  };

  useEffect(() => {
    if (error) {
      console.error('들어온 상담 요청 조회 중 발생한 에러: ', error);
    }
  }, [error]);

  return (
    <Section title='들어온 상담 요청' layoutClassName='h-full'>
      {requestedConsultations.length > 0 ? (
        <div className='w-full h-fit p-4'>
          {requestedConsultations.map((consultation) => (
            <RequestedConsultationItem
              key={consultation.id}
              {...consultation}
              onApprove={handleApprove} // Pass handleApprove here
            />
          ))}
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center mt-7'>
          <img
            src={clearAllRequests}
            className='w-4/5 h-4/5 items-center'
            alt='모든 요청 처리됨'
          />
          <span className='text-center text-hanaindigo h-full text-sm py-3'>
            모든 상담 요청이 승인되었습니다:)
          </span>
        </div>
      )}
    </Section>
  );
}
