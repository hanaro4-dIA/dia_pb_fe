import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Section from '../components/Section';
import { type TRequestedConsultationsProps } from '../lib/types';
import { UpcomingConsultationItem } from '../components/UpcomingConsultationItem';



type ScheduledConsultationListProps = {
  consultations: TRequestedConsultationsProps[];
};

export default function ScheduledConsultationList({
  consultations,
}: ScheduledConsultationListProps) {
  const [consultationData, setConsultationData] = useState<
    TRequestedConsultationsProps[]
  >([]);
  const [customerName, setCustomerName] = useState<string>('');
  const { id } = useParams();

  useEffect(() => {
    const fetchNotConsultingData = async () => {
      try {
        const response = await fetch('/data/Consultings.json');
        const data: TRequestedConsultationsProps[] = await response.json();

        const filteredData = data
          .filter(({ approvalStatus, finishStatus, customer_id }) =>
            id
              ? approvalStatus && !finishStatus && customer_id === Number(id)
              : approvalStatus && !finishStatus
          )
          .sort((a, b) => {
            if (a.quick && !b.quick) return -1;
            if (!a.quick && b.quick) return 1;
            return (
              new Date(a.hopeDay).getTime() - new Date(b.hopeDay).getTime()
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
        alert('Error fetching consultation data.');
      }
    };

    fetchNotConsultingData();
  }, [id, consultations]);

  const allConsultations = [...consultationData, ...consultations].sort(
    (a, b) => {
      if (a.quick && !b.quick) return -1;
      if (!a.quick && b.quick) return 1;
      return new Date(a.hopeDay).getTime() - new Date(b.hopeDay).getTime();
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
              <UpcomingConsultationItem
                key={index}
                {...consultation}
              />
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
