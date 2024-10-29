import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { type TRequestedConsultationsProps } from '../lib/types';

type ScheduledConsultationListProps = {
  consultations: any[];
};

export default function ScheduledConsultationList({
  consultations,
}: ScheduledConsultationListProps) {
  const [consultationData, setConsultationData] = useState<
    TRequestedConsultationsProps[]
  >([]);
  const [customerName, setCustomerName] = useState<string | null>(null); // customerName 상태 추가
  const { id } = useParams();

  useEffect(() => {
    setConsultationData([]); // ID가 바뀔 때마다 데이터 초기화
    setCustomerName(null); // 고객 이름 초기화

    const fetchNotConsultingData = async () => {
      try {
        const response = await fetch('/data/Consultings.json');
        const data: TRequestedConsultationsProps[] = await response.json();

        // ID가 있을 경우 해당 고객의 데이터만 필터링, 없을 경우 조건에 맞는 모든 데이터 가져오기
        const filteredData = data.filter(
          ({ approvalStatus, finishStatus, customer_id }) =>
            id
              ? approvalStatus === true &&
                finishStatus === false &&
                customer_id === Number(id)
              : approvalStatus === true && finishStatus === false
        );

        setConsultationData(filteredData);

        // ID가 있을 경우 해당 고객의 이름 설정
        if (id) {
          const customer = data.find(
            (consultation) => consultation.customer_id === Number(id)
          );
          setCustomerName(customer ? customer.name : null); // 고객 이름 설정
        }
      } catch (error) {
        console.error('Error fetching consultation data:', error);
      }
    };

    fetchNotConsultingData();
  }, [id, consultations]);

  const allConsultations = [...consultationData, ...consultations];

  return (
    <div className='flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200'>
      <div className='bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 rounded-t-lg pl-5'>
        {id && customerName
          ? `${customerName} 손님의 예정된 상담 일정`
          : 'PB의 예정된 전체 상담 일정'}
      </div>

      <div className='p-4 overflow-auto'>
        {allConsultations.length > 0 ? (
          allConsultations.map(({ name, hopeDay, hopeTime, title }, index) => (
            <div
              key={index}
              className='bg-white rounded-lg p-4 mb-4 border border-gray-200 shadow-lg'
            >
              <div className='flex justify-between text-black text-[1rem]'>
                <span>{name} 손님</span>
                <span>
                  {hopeDay} {hopeTime}
                </span>
              </div>
              <div className='text-black text-[1rem] font-extrabold truncate mt-1'>
                {title}
              </div>
            </div>
          ))
        ) : (
          <div className='text-center text-gray-500 text-[1rem] font-light'>
            일정이 없습니다
          </div>
        )}
      </div>
    </div>
  );
}
