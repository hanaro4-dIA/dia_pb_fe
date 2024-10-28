import { useEffect, useState } from 'react';
import { type TRequestedConsultationsProps } from '../lib/types';

type TConsultationRequestProps = {
  onApprove: (consultation: TRequestedConsultationsProps) => void;
};

export default function ConsultationRequest({
  onApprove,
}: TConsultationRequestProps) {
  const [consultationData, setConsultationData] = useState<
    TRequestedConsultationsProps[]
  >([]);

  useEffect(() => {
    const fetchNotConsultingData = async () => {
      try {
        const response = await fetch('/data/Consultings.json');
        const data: TRequestedConsultationsProps[] = await response.json();

        // 필터 조건: Standby 상태이면서 finishStatus가 false인 항목만
        const filteredData = data.filter(
          (consultation) =>
            consultation.approvalStatus === 'Standby' &&
            consultation.finishStatus === false
        );

        setConsultationData(filteredData);
      } catch (error) {
        console.error('Error fetching consultation data:', error);
      }
    };

    fetchNotConsultingData();
  }, []);

  // 승인 버튼 클릭 시 상태 변경
  const toggleApprovalStatus = (index: number) => {
    setConsultationData((prevData) =>
      prevData.filter((consultation, i) => {
        if (i === index && consultation.approvalStatus === 'Standby') {
          const updatedConsultation = {
            ...consultation,
            approvalStatus: 'Approved',
          };
          onApprove(updatedConsultation); // 승인된 상담을 전달
          return false; // 승인된 항목을 제거
        }
        return true;
      })
    );
  };

  return (
    <div className='flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200'>
      <div className='bg-hanaindigo text-[#fff] text-[1.3rem] font-extrabold p-3 rounded-t-lg pl-5'>
        들어온 상담 요청
      </div>

      {consultationData.length > 0 ? (
        <div className='overflow-auto p-4'>
          {consultationData.map((consultation, index) => (
            <div
              key={index}
              className='bg-[#fff] rounded-lg border border-gray-200 p-4 mb-4 shadow-lg'
            >
              <div className='flex justify-between items-center'>
                <span
                  className='text-[1rem] font-bold text-ellipsis overflow-hidden whitespace-nowrap'
                  style={{ maxWidth: '15rem' }}
                >
                  {consultation.topic}
                </span>
                <button
                  className={`w-[6rem] h-[2rem] text-[#fff] text-[1rem] rounded-lg ${consultation.approvalStatus === 'Standby' ? 'bg-hanaindigo' : 'bg-hanasilver'}`}
                  onClick={() => toggleApprovalStatus(index)}
                >
                  {consultation.approvalStatus === 'Standby'
                    ? '승인대기'
                    : '승인완료'}
                </button>
              </div>
              <div className='flex justify-between text-black text-sm mt-2'>
                <span>{consultation.hopeDay} 요청</span>
                <span>{consultation.requestDay}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-center text-hanaindigo p-4 text-xl'>
          모든 상담 요청이 승인되었습니다.
        </div>
      )}
    </div>
  );
}
