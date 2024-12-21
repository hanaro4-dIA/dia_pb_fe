import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { ApprovedConsultationItem } from '../components/ApprovedConsultationItem';
import Section from '../components/Section';
import { useConsultationContext } from '../hooks/consultationsContext';

export default function ApprovedConsultationsList({
  customerName,
}: {
  customerName: string;
}) {
  const { id } = useParams();

  const { approvedConsultations, fetchApprovedConsultations } =
    useConsultationContext();

  useEffect(() => {
    if (id) {
      fetchApprovedConsultations(Number(id));
    } else {
      fetchApprovedConsultations();
    }
  }, [id, fetchApprovedConsultations]);

  // 손님 한 명에 대한 정보 조회하기 위함
  const filteredConsultations = id
    ? approvedConsultations.filter(
        (consultation) => consultation.customerName === customerName
      )
    : approvedConsultations;

  return (
    <Section
      title={
        customerName
          ? `${customerName} 손님의 예정된 상담 일정`
          : '예정된 상담 일정'
      }
      layoutClassName='h-full'
    >
      <div className='w-full p-4'>
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
