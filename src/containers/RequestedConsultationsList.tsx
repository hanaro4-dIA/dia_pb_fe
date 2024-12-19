import { useCallback, useEffect } from 'react';
import clearAllRequests from '../assets/clearAllRequests.gif';
import { RequestedConsultationItem } from '../components/RequestedConsultationItem';
import Section from '../components/Section';
import { useConsultationContext } from '../hooks/consultationsContext';

export default function RequestedConsultationsList() {
  const { requestedConsultations, fetchRequestedConsultations } =
    useConsultationContext();

  const memoizedFetchRequestedConsultations = useCallback(() => {
    fetchRequestedConsultations();
  }, [fetchRequestedConsultations]);

  useEffect(() => {
    memoizedFetchRequestedConsultations();
  }, [fetchRequestedConsultations, requestedConsultations]);

  console.log('requestedConsultations: ', requestedConsultations);

  return (
    <Section title='들어온 상담 요청' layoutClassName='h-full'>
      {requestedConsultations.length > 0 ? (
        <div className='w-full h-fit p-4'>
          {requestedConsultations.map((consultation) => (
            <RequestedConsultationItem
              key={consultation.id}
              {...consultation}
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
          <span className='text-center text-hanaindigo h-full text-s py-3'>
            모든 상담 요청이 승인되었습니다:)
          </span>
        </div>
      )}
    </Section>
  );
}
