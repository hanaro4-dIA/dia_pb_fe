import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { UpcomingConsultationItem } from '../components/ApprovedConsultationItem';
import Section from '../components/Section';
import { type TConsultingProps } from '../types/dataTypes';

type ScheduledConsultationListProps = {
  consultations: TConsultingProps[];
};

// 예정된 상담 일정
export default function ApprovedConsultationsList({
  consultations,
}: ScheduledConsultationListProps) {
  const [consultationData, setConsultationData] = useState<TConsultingProps[]>(
    []
  );
  const { id } = useParams();

  useEffect(() => {
    const fetchNotConsultingData = async () => {
      try {
        const response = await fetch('/data/Consultings.json');
        const data: TConsultingProps[] = await response.json();

        // approve가 아직 true 인 것들 중에
        // title이 '빠른 상담 요청'인 항목을 우선 정렬하고, 그 다음 requestDay 기준으로 오름차순 정렬
        const filteredData = data
          .filter(({ approve, customer_id }) =>
            id ? approve && customer_id === Number(id) : approve
          )
          .sort((a, b) => {
            if (a.title === '삐른 상담 요청' && !(b.title === '삐른 상담 요청'))
              return -1;
            if (!(a.title === '삐른 상담 요청') && b.title === '삐른 상담 요청')
              return 1;
            return (
              new Date(a.hope_date).getTime() - new Date(b.hope_date).getTime()
            );
          });

        setConsultationData(filteredData);
      } catch (error) {
        console.error('Error fetching consultation data: ', error);
      }
    };

    fetchNotConsultingData();
  }, [id, consultations]);

  const allConsultations = [...consultationData, ...consultations].sort(
    (a, b) => {
      if (a.title === '삐른 상담 요청' && !(b.title === '삐른 상담 요청'))
        return -1;
      if (!(a.title === '삐른 상담 요청') && b.title === '삐른 상담 요청')
        return 1;
      return new Date(a.hope_date).getTime() - new Date(b.hope_date).getTime();
    }
  );

  return (
    <Section
      title={
        id
          ? `${consultationData[0]?.customer_id || id} 손님의 예정된 상담 일정`
          : '예정된 상담 일정'
      }
      layoutClassName='h-full'
    >
      <div className='w-full p-4 '>
        {allConsultations.length > 0 ? (
          allConsultations.map((consultation, index) => (
            <UpcomingConsultationItem key={index} {...consultation} />
          ))
        ) : (
          <div className='text-center text-hanaindigo text-xl'>
            일정이 없습니다.
          </div>
        )}
      </div>
    </Section>
  );
}
