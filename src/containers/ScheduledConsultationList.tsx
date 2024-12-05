import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Section from '../components/Section';
import { UpcomingConsultationItem } from '../components/UpcomingConsultationItem';
import { type TConsultingProps } from '../types/dataTypes';

type ScheduledConsultationListProps = {
  consultations: TConsultingProps[];
};

export default function ScheduledConsultationList({
  consultations,
}: ScheduledConsultationListProps) {
  const [consultationData, setConsultationData] = useState<TConsultingProps[]>(
    []
  );
  const [customerName, setCustomerName] = useState<string>('');
  const { id } = useParams();

  useEffect(() => {
    const fetchNotConsultingData = async () => {
      try {
        const response = await fetch('/data/Consultings.json');
        const data: TConsultingProps[] = await response.json();

        const filteredData = data
          .filter(({ approve, finishStatus, customer_id }) =>
            id
              ? approve && !finishStatus && customer_id === Number(id)
              : approve && !finishStatus
          )
          .sort((a, b) => {
            if (a.quick && !b.quick) return -1;
            if (!a.quick && b.quick) return 1;
            return (
              new Date(a.hope_date).getTime() - new Date(b.hope_date).getTime()
            );
          });

        setConsultationData(filteredData);

        if (id) {
          const customer = data.find(
            ({ customer_id }) => customer_id === Number(id)
          );
          setCustomerName(customer ? customer.name : '');
        }
      } catch (error) {
        console.error('Error fetching consultation data.');
      }
    };

    fetchNotConsultingData();
  }, [id, consultations]);

  const allConsultations = [...consultationData, ...consultations].sort(
    (a, b) => {
      if (a.quick && !b.quick) return -1;
      if (!a.quick && b.quick) return 1;
      return new Date(a.hope_date).getTime() - new Date(b.hope_date).getTime();
    }
  );

  return (
    <>
      <Section
        title={
          id && customerName
            ? `${customerName} 손님의 예정된 상담 일정`
            : '예정된 상담 일정'
        }
      >
        <div className='w-full h-fit p-4'>
          {allConsultations.length > 0 ? (
            allConsultations.map((consultation, index) => (
              <UpcomingConsultationItem key={index} {...consultation} />
            ))
          ) : (
            <div className='text-center text-hanaindigo text-xl'>
              일정이 없습니다
            </div>
          )}
        </div>
      </Section>
    </>
  );
}
