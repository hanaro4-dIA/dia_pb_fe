import { useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { ApprovedConsultationItem } from '../components/ApprovedConsultationItem';
import Section from '../components/Section';
import { useConsultationContext } from '../hooks/consultationsContext';

export default function ApprovedConsultationsList() {
  const { id } = useParams();
  const { approvedConsultations, fetchApprovedConsultations } =
    useConsultationContext();

  useEffect(() => {
    fetchApprovedConsultations();
  }, []);

  const memoizedFetchApprovedConsultations = useCallback(() => {
    fetchApprovedConsultations();
  }, []);

  useEffect(() => {
    memoizedFetchApprovedConsultations();
  }, [memoizedFetchApprovedConsultations, approvedConsultations]);

  const filteredConsultations = id
    ? approvedConsultations.filter(
        (consultation) => consultation.id !== Number(id)
      )
    : approvedConsultations;

  return (
    <Section
      title={id ? `${id} 손님의 예정된 상담 일정` : '예정된 상담 일정'}
      layoutClassName='h-full'
    >
      <div className='w-full p-4 '>
        {filteredConsultations.length > 0 ? (
          filteredConsultations.map((consultationData) => (
            <ApprovedConsultationItem
              key={consultationData.id}
              {...consultationData}
            />
          ))
        ) : (
          <div className='text-center text-hanaindigo text-sm'>
            일정이 없습니다.
          </div>
        )}
      </div>
    </Section>
  );
}
