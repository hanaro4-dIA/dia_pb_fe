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

        // 필터 및 정렬 조건: approvalStatus가 false이면서 finishStatus가 false인 항목만, requestDay 기준으로 오름차순 정렬
        const filteredData = data
          .filter(
            ({ approvalStatus, finishStatus }) =>
              approvalStatus === false && finishStatus === false
          )
          .sort((a, b) => new Date(a.requestDay).getTime() - new Date(b.requestDay).getTime());

        setConsultationData(filteredData);
      } catch (error) {
        alert('Error fetching consultation data:');
      }
    };

    fetchNotConsultingData();
  }, []);

  // 승인 버튼 클릭 시 상태 변경
  const toggleApprovalStatus = (id: number) => {
    setConsultationData((prevData) =>
      prevData.filter((consultation) => {
        if (consultation.id === id && consultation.approvalStatus === false) {
          const updatedConsultation = { ...consultation, approvalStatus: true };
          onApprove(updatedConsultation); // 승인된 상담을 전달
          return false; // 승인된 항목을 제거
        }
        return true;
      })
    );
  };

  return (
    <div className='flex flex-col h-full bg-white '>
      <div className='flex items-center justify-between bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 pl-5 rounded-t-lg'>
        들어온 상담 요청
      </div>
      {consultationData.length > 0 ? (
        <div className='overflow-auto p-4 border-x border-b border-gray-200'>
          {consultationData.map(
            ({
              id,
              name,
              title,
              hopeDay,
              hopeTime,
              requestDay,
              approvalStatus,
            }) => (
              <article key={id} className='w-full flex flex-col justify-end mb-4 items-start'>
                <small className='ml-2'>{requestDay}</small>
                <div className='bg-white rounded-lg border border-gray-200 p-4 shadow-lg w-full'>
                  <div className='flex justify-between items-center'>
                    <div className='flex flex-col w-[70%]'>
                      <span className='w-[95%] text-[1rem] font-bold truncate	'>
                        {name} 손님
                      </span>
                      <span className='w-[95%] font-bold truncate	'>
                        {title}
                      </span>
                      <span className='text-[0.8rem] font-bold'>
                        요청일: {hopeDay} {hopeTime}
                      </span>
                    </div>

                    <button
                      className='w-[6rem] h-[2rem] text-white text-[1rem] rounded-lg bg-hanaindigo hover:bg-hanagold'
                      onClick={() => toggleApprovalStatus(id)}
                    >
                      {!approvalStatus && '승인대기'}
                    </button>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      ) : (
        <div className='text-center text-hanaindigo p-4 text-xl'>
          모든 상담 요청이 승인되었습니다.
        </div>
      )}
    </div>
  );
}