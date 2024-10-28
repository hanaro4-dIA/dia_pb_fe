export default function ScheduledConsultationList() {
  const consultationData = [
    {
      name: '조경은',
      topic: '@성수 AK프라자 부동산 건 상담요청합니다.',
      hopeDay: '@2024.10.22 16:30',
    },
    {
      name: '김철수',
      topic:
        '#성수 AK프라자 부동산 건 상담요청합니다.ddddddddddddddddddddddddddddd',
      hopeDay: '#2024.10.22 16:30',
    },
    {
      name: '박지민',
      topic: '$성수 AK프라자 부동산 건 상담요청합니다.',
      hopeDay: '$2024.10.22 16:30',
    },
    {
      name: '김철수',
      topic:
        '#성수 AK프라자 부동산 건 상담요청합니다.ddddddddddddddddddddddddddddd',
      hopeDay: '#2024.10.22 16:30',
    },
    {
      name: '박지민',
      topic: '$성수 AK프라자 부동산 건 상담요청합니다.',
      hopeDay: '$2024.10.22 16:30',
    },
    {
      name: '김철수',
      topic:
        '#성수 AK프라자 부동산 건 상담요청합니다.ddddddddddddddddddddddddddddd',
      hopeDay: '#2024.10.22 16:30',
    },
    {
      name: '박지민',
      topic: '$성수 AK프라자 부동산 건 상담요청합니다.',
      hopeDay: '$2024.10.22 16:30',
    },
    {
      name: '김철수',
      topic:
        '#성수 AK프라자 부동산 건 상담요청합니다.ddddddddddddddddddddddddddddd',
      hopeDay: '#2024.10.22 16:30',
    },
    {
      name: '박지민',
      topic: '$성수 AK프라자 부동산 건 상담요청합니다.',
      hopeDay: '$2024.10.22 16:30',
    },
    // 추가 데이터 생략
  ];

  return (
    <div
      className={`flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200`}
    >
      {/* 헤더 */}
      <div className='bg-hanaindigo text-[#fff] text-[1.3rem] font-extrabold p-3 rounded-t-lg pl-5'>
        예정된 상담 일정
      </div>

      {/* 상담 목록 */}
      <div className='p-4 overflow-auto'>
        {consultationData.map((consultation, index) => (
          <div
            key={index}
            className='bg-[#fff] rounded-lg p-4 mb-4 border border-gray-200 shadow-lg'
          >
            <div className='flex justify-between text-black text-[1rem] font-light'>
              <span>{consultation.name} 손님</span>
              <span>{consultation.hopeDay}</span>
            </div>
            <div className='text-black text-[1rem] font-extrabold overflow-hidden text-ellipsis whitespace-nowrap mt-2'>
              {consultation.topic}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
