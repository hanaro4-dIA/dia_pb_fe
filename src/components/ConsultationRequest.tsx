import { useState } from 'react';

export default function ConsultationRequest() {
  const [consultationData, setConsultationData] = useState([
    { name: '조경은', topic: '@성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '2024.10.22 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
    { name: '강강강', topic: '조기퇴근 상담요청합니다dadadasdadasdasdad.', hopeDay: '2024.10.23 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
    { name: '강강강', topic: '조기퇴asdadadasd근 상담요청합니다dadadasdadasdasdad.', hopeDay: '2024.10.23 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Done' },
    { name: '조경은', topic: '@성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '2024.10.22 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
    { name: '강강강', topic: '조기퇴근 상담요청합니다dadadasdadasdasdad.', hopeDay: '2024.10.23 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
    { name: '강강강', topic: '조기퇴asdadadasd근 상담요청합니다dadadasdadasdasdad.', hopeDay: '2024.10.23 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Done' },
    { name: '조경은', topic: '@성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '2024.10.22 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
    { name: '강강강', topic: '조기퇴근 상담요청합니다dadadasdadasdasdad.', hopeDay: '2024.10.23 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
    { name: '강강강', topic: '조기퇴asdadadasd근 상담요청합니다dadadasdadasdasdad.', hopeDay: '2024.10.23 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Done' },
  ]);

  // 버튼 클릭 시 approvalStatus를 변경하는 함수
  const toggleApprovalStatus = (index: number) => {
    setConsultationData(prevData => 
      prevData.map((consultation, i) => 
        i === index 
          ? { ...consultation, approvalStatus: consultation.approvalStatus === 'Standby' ? 'Done' : 'Standby' } 
          : consultation
      )
    );
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200">
      {/* 헤더 */}
      <div className="bg-hanaindigo text-[#fff] text-[1.5rem] font-extrabold p-4 rounded-t-lg pl-5">
        들어온 상담 요청
      </div>

      {/* 상담 데이터 리스트 */}
      <div className="overflow-auto p-4">
        {consultationData.map((consultation, index) => (
          <div key={index} className="bg-[#fff] rounded-lg border border-gray-200 p-4 mb-4 shadow-lg ">
            <div className="flex justify-between items-center">
              {/* Topic */}
              <span className="text-[1rem] font-bold text-ellipsis overflow-hidden whitespace-nowrap" style={{ maxWidth: '15rem' }}>
                {consultation.topic}
              </span>

              {/* Button */}
              <button
                className={`w-[6rem] h-[2rem] text-[#fff] text-[1rem] rounded-lg ${consultation.approvalStatus === 'Standby' ? 'bg-hanaindigo' : 'bg-hanasilver'}`}
                onClick={() => toggleApprovalStatus(index)}
              >
                {consultation.approvalStatus === 'Standby' ? '승인대기' : '승인완료'}
              </button>
            </div>

            <div className="flex justify-between text-black text-sm mt-2">
              <span>{consultation.hopeDay} 요청</span>
              <span>{consultation.requestDay}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}