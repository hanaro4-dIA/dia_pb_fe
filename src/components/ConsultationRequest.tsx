import { useState } from 'react';

type ConsultationRequestProps = {
  onApprove: (consultation: any) => void;
}

export default function ConsultationRequest({ onApprove }: ConsultationRequestProps) {
  const [consultationData, setConsultationData] = useState([
    {
      name: '1번이름',
      topic: '1번주제',
      hopeDay: '2024.10.22 16:30',
      requestDay: '2024.10.21 09:00:01',
      approvalStatus: 'Standby',
    },
    {
      name: '2번이름',
      topic: '2번주제',
      hopeDay: '2024.10.23 16:30',
      requestDay: '2024.10.21 09:00:01',
      approvalStatus: 'Standby',
    },
    {
      name: '3번이름',
      topic: '3번주제',
      hopeDay: '2024.10.22 16:30',
      requestDay: '2024.10.21 09:00:01',
      approvalStatus: 'Standby',
    },
    {
      name: '4번이름',
      topic: '4번주제',
      hopeDay: '2024.10.23 16:30',
      requestDay: '2024.10.21 09:00:01',
      approvalStatus: 'Standby',
    },
  ]);

  // 버튼 클릭 시 approvalStatus를 변경하는 함수
  const toggleApprovalStatus = (index: number) => {
    setConsultationData((prevData) =>
      prevData.filter((consultation, i) => {
        if (i === index && consultation.approvalStatus === 'Standby') {
          onApprove(consultation);  // 승인된 상담을 MainPage로 전달
          return false;  // 해당 상담을 리스트에서 제거
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

      { consultationData.length > 0 ? (
      <div className='overflow-auto p-4'>
        {consultationData.map((consultation, index) => (
          <div key={index} className='bg-[#fff] rounded-lg border border-gray-200 p-4 mb-4 shadow-lg'>
            <div className='flex justify-between items-center'>
              <span className='text-[1rem] font-bold text-ellipsis overflow-hidden whitespace-nowrap' style={{ maxWidth: '15rem' }}>
                {consultation.topic}
              </span>
              <button
                className={`w-[6rem] h-[2rem] text-[#fff] text-[1rem] rounded-lg ${consultation.approvalStatus === 'Standby' ? 'bg-hanaindigo' : 'bg-hanasilver'}`}
                onClick={() => toggleApprovalStatus(index)}
              >
                {consultation.approvalStatus === 'Standby' ? '승인대기' : '승인완료'}
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
      )
      }
    </div>
  );
}