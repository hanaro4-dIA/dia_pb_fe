type ScheduledConsultationListProps = {
  consultations: any[];
}

export default function ScheduledConsultationList({
  consultations,
}: ScheduledConsultationListProps) {
  const defaultConsultationData = [
    {
      name: '가나다',
      topic: '가다다 건 상담요청합니다.',
      hopeDay: '2024.10.22 16:30',
    },
    {
      name: '마바사',
      topic: '마바사 건 상담요청합니다.',
      hopeDay: '2024.10.22 16:30',
    }
  ];

  // 기본 데이터와 추가 데이터를 병합
  const allConsultations = [...defaultConsultationData, ...consultations];

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200">
      {/* 헤더 */}
      <div className="bg-hanaindigo text-[#fff] text-[1.3rem] font-extrabold p-3 rounded-t-lg pl-5">
        예정된 상담 일정
      </div>

      {/* 상담 목록 */}
      <div className="p-4 overflow-auto">
        {allConsultations.map((consultation, index) => (
          <div
            key={index}
            className="bg-[#fff] rounded-lg p-4 mb-4 border border-gray-200 shadow-lg"
          >
            <div className="flex justify-between text-black text-[1rem] font-light">
              <span>{consultation.name} 손님</span>
              <span>{consultation.hopeDay}</span>
            </div>
            <div className="text-black text-[1rem] font-extrabold overflow-hidden text-ellipsis whitespace-nowrap mt-2">
              {consultation.topic}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
