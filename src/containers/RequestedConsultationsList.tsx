import { useEffect } from 'react';
import clearAllRequests from '../assets/clearAllRequests.gif';
import { RequestedConsultationItem } from '../components/RequestedConsultationItem';
import Section from '../components/Section';
import { useConsultationContext } from '../hooks/consultationsContext';

export default function RequestedConsultationsList() {
  const { requestedConsultations, fetchRequestedConsultations } =
    useConsultationContext();

  useEffect(() => {
    fetchRequestedConsultations();
  }, [requestedConsultations]);

  console.log('requestedConsultations: ', requestedConsultations);

  return (
    <Section title='들어온 상담 요청' layoutClassName='h-full'>
      <div className='w-full h-fit p-4'>
        {requestedConsultations.length > 0 ? (
          requestedConsultations.map((consultation) => (
            <RequestedConsultationItem
              key={consultation.id}
              {...consultation}
            />
          ))
        ) : (
          <div className='flex flex-col justify-center items-center'>
            <img
              src={clearAllRequests}
              className='w-4/5 h-4/5'
              alt='모든 요청 처리됨'
            />
            <span className='text-center text-hanaindigo h-full text-s py-3'>
              모든 상담 요청이 승인되었습니다:)
            </span>
          </div>
        )}
      </div>
    </Section>
  );
}
