import { useState } from 'react';

type HeightProps = {
  height: string; // height는 string 또는 number 타입으로 지정
};

function ScheduledConsultationList({height}:HeightProps) {
  const consultationData = [
    { name: '조경은', topic: '@성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '@2024.10.22 16:30' },
    { name: '김철수', topic: '#성수 AK프라자 부동산 건 상담요청합니다.ddddddddddddddddddddddddddddd', hopeDay: '#2024.10.22 16:30'  },
    { name: '박지민', topic: '$성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '$2024.10.22 16:30'  },
    { name: '김철수', topic: '#성수 AK프라자 부동산 건 상담요청합니다.ddddddddddddddddddddddddddddd', hopeDay: '#2024.10.22 16:30'  },
    { name: '박지민', topic: '$성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '$2024.10.22 16:30'  },
    { name: '김철수', topic: '#성수 AK프라자 부동산 건 상담요청합니다.ddddddddddddddddddddddddddddd', hopeDay: '#2024.10.22 16:30'  },
    { name: '박지민', topic: '$성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '$2024.10.22 16:30'  },
    { name: '김철수', topic: '#성수 AK프라자 부동산 건 상담요청합니다.ddddddddddddddddddddddddddddd', hopeDay: '#2024.10.22 16:30'  },
    { name: '박지민', topic: '$성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '$2024.10.22 16:30'  },
    // 추가 데이터 생략
  ];

  return (
    <div className={`flex flex-col w-[25rem] bg-[#f4f2e5] rounded-3xl shadow-lg`} style={{ height }}>
      {/* 헤더 */}
      <div className="bg-[#005645] text-[#f2f4f6] text-[1.5rem] font-extrabold p-4 rounded-t-3xl pl-5">
        예정된 상담 일정
      </div>

      {/* 상담 목록 */}
      <div className="p-4 overflow-auto">
        {consultationData.map((consultation, index) => (
          <div key={index} className="bg-[#fcfbf6] rounded-2xl p-4 mb-4 shadow-md">
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

export default ScheduledConsultationList;
