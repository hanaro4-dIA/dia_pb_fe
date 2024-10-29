import { useEffect, useState } from 'react';
import { type TRequestedConsultationsProps } from '../lib/types';
import { useParams, useNavigate } from 'react-router-dom';

type ScheduledConsultationListProps = {
  consultations: any[];
};

export default function ScheduledConsultationList({
  consultations,
}: ScheduledConsultationListProps) {
  const [consultationData, setConsultationData] = useState<TRequestedConsultationsProps[]>([]);
  const [customerName, setCustomerName] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setConsultationData([]);
    setCustomerName(null);

    const fetchNotConsultingData = async () => {
      try {
        const response = await fetch('/data/Consultings.json');
        const data: TRequestedConsultationsProps[] = await response.json();

        const filteredData = data
          .filter(
            ({ approvalStatus, finishStatus, customer_id }) =>
              id
                ? approvalStatus === true &&
                  finishStatus === false &&
                  customer_id === Number(id)
                : approvalStatus === true && finishStatus === false
          )
          .sort((a, b) => new Date(a.hopeDay).getTime() - new Date(b.hopeDay).getTime());

        setConsultationData(filteredData);

        if (id) {
          const customer = data.find((consultation) => consultation.customer_id === Number(id));
          setCustomerName(customer ? customer.name : null);
        }
      } catch (error) {
        alert('Error fetching consultation data:');
      }
    };

    fetchNotConsultingData();
  }, [id, consultations]);

  // 모든 상담 데이터 합쳐서 hopeDay 기준 오름차순 정렬
  const allConsultations = [...consultationData, ...consultations].sort(
    (a, b) => new Date(a.hopeDay).getTime() - new Date(b.hopeDay).getTime()
  );

  const handleConsultationClick = (consultationId: number) => {
    navigate(`/consulting/${consultationId}`);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 rounded-t-lg pl-5">
        {id && customerName ? `${customerName} 손님의 예정된 상담 일정` : 'PB의 예정된 전체 상담 일정'}
      </div>

      <div className="p-4 overflow-auto border-x border-b border-gray-200">
        {allConsultations.length > 0 ? (
          allConsultations.map((consultation, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-4 mb-4 border border-gray-200 shadow-lg"
            >
              <div className="flex justify-between text-black text-[1rem] font-light">
                <span>{consultation.name} 손님</span>
                <span>{consultation.hopeDay}</span>
              </div>
              <div className="flex justify-between text-black text-[1rem] font-extrabold truncate mt-2">
                {consultation.title}
                <button
                  className="border border-hanaindigo rounded-md px-1 text-[0.8rem] text-white bg-hanadeepgreen"
                  onClick={() => handleConsultationClick(consultation.customer_id)}
                >
                  상담하기
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-[1rem] font-light">
            일정이 없습니다
          </div>
        )}
      </div>
    </div>
  );
}