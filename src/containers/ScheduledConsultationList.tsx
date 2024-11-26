import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Section from '../components/Section';
import { type TRequestedConsultationsProps } from '../lib/types';

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
  const navigate = useNavigate();

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
              return new Date(a.hopeDay).getTime() - new Date(b.hopeDay).getTime()
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

  const allConsultations = [...consultationData, ...consultations].sort((a, b) => {
  if (a.quick && !b.quick) return -1;
  if (!a.quick && b.quick) return 1;
  return new Date(a.hopeDay).getTime() - new Date(b.hopeDay).getTime();
});

  const handleConsultationClick = (consultationId: number) => {
    navigate(`/consulting/${consultationId}`);
  };

  // 빠른 상담 요청 여부에 따른 테두리 변경
  const getBorderColorClass = (quick : boolean) => {
    return quick ? 'border-red-500 border-4' : 'border-gray-200';
  };

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
            allConsultations.map(
              ({ name, title, customer_id, hopeDay, hopeTime, quick }, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-lg p-4 mb-4 border ${getBorderColorClass(quick)} shadow-lg`}
                >
                  <div className='flex justify-between text-black text-[1rem] font-light'>
                    <span>{name} 손님</span>
                    <span>
                      {hopeDay} {hopeTime}
                    </span>
                  </div>
                  <div className='flex justify-between text-black text-[1rem] font-extrabold truncate mt-2'>
                    {title}
                    <button
                      className='border border-hanaindigo rounded-md px-1 text-[0.8rem] text-white bg-hanadeepgreen'
                      onClick={() => handleConsultationClick(customer_id)}
                    >
                      상담하기
                    </button>
                  </div>
                </div>
              )
            )
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
