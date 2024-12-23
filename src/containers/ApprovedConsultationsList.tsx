import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ApprovedConsultationItem } from '../components/ApprovedConsultationItem';
import Section from '../components/Section';
import useFetch from '../hooks/useFetch';
import { type TConsultationProps } from '../types/dataTypes';

export default function ApprovedConsultationsList({
  isRefetch,
  customerName,
}: {
  isRefetch?: boolean;
  customerName?: string;
}) {
  const { id } = useParams();
  const { data, error } = useFetch<TConsultationProps[]>(
    `reserves?status=true&type=upcoming&refetch=${isRefetch}`
  );

  useEffect(() => {
    if (error) {
      console.error('예정된 상담요청 조회 중 발생한 에러: ', error);
    }
  }, [error]);

  const [approvedConsultations, setApprovedConsultations] = useState<
    TConsultationProps[] | []
  >([]);

  useEffect(() => {
    setApprovedConsultations(data || []);
  }, [data, isRefetch]);

  // 손님 한 명에 대한 정보 조회하기 위함
  const filteredConsultations = id
    ? approvedConsultations.filter(
        (consultation) =>
          consultation.customerName.toLowerCase() ===
          customerName?.toLowerCase()
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
