

// function ConsultationJournalList() {
//   const consultationJourData = [
//     { name: '안유진', topic: '@성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '@2024.10.22 16:30' },
//     { name: '안유진', topic: '#성수 AK프라자 부동산 건 상담요청합니다.ddddddddddddddddddddddddddddd', hopeDay: '#2024.10.22 16:30'  },
//     { name: '안유진', topic: '$성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '$2024.10.22 16:30'  },
//     { name: '안유진', topic: '#성수 AK프라자 부동산 건 상담요청합니다.ddddddddddddddddddddddddddddd', hopeDay: '#2024.10.22 16:30'  },
//     { name: '안유진', topic: '$성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '$2024.10.22 16:30'  },
//     { name: '안유진', topic: '#성수 AK프라자 부동산 건 상담요청합니다.ddddddddddddddddddddddddddddd', hopeDay: '#2024.10.22 16:30'  },
//     { name: '안유진', topic: '$성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '$2024.10.22 16:30'  },
//     { name: '안유진', topic: '#성수 AK프라자 부동산 건 상담요청합니다.ddddddddddddddddddddddddddddd', hopeDay: '#2024.10.22 16:30'  },
//     { name: '안유진', topic: '$성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '$2024.10.22 16:30'  },
//     // 추가 데이터 생략
//   ];

//   return (
//     <div className="flex flex-col w-[25rem] h-[56rem] bg-[#f4f2e5] rounded-3xl shadow-lg">
//       {/* 헤더 */}
//       <div className="bg-[#005645] text-[#f2f4f6] text-[1.5rem] font-extrabold p-4 rounded-t-3xl pl-5">
//         상담일지 리스트
//       </div>

//       {/* 상담 일지 목록 */}
// <div className="p-4 overflow-auto">
//   {consultationJourData.map((consultation, index) => (
//     <div key={index} className="bg-[#fcfbf6] rounded-2xl p-4 mb-4 shadow-md flex items-center"> {/* flex 컨테이너 추가 */}
//       {/* 왼쪽에 번호 표시 */}
//       <div className="text-[#005645] text-[1rem] font-bold mr-4">{index + 1}</div> {/* 왼쪽 번호, 간격 조정을 위한 mr-4 */}
      
//       {/* 오른쪽 내용 */}
//       <div className="flex-1">
//         <div className="flex justify-between text-black text-[1rem] font-light">
//           <span>{consultation.name} PB</span>
//           <span>{consultation.hopeDay}</span>
//         </div>
//         <div className="text-[1rem] font-bold text-ellipsis overflow-hidden whitespace-nowrap" style={{ maxWidth: '20rem' }}>
//           {consultation.topic}
//         </div>
//       </div>
//     </div>
//   ))}
// </div>

//     </div>
//   );
// }

// export default ConsultationJournalList;










import { useEffect, useState } from 'react';

type CustomerPB = {
  id: number;        // PB ID
  customer_id: number; // 고객 ID
};

type PB = {
  id: number;
  name: string;
};

type ConsultationJournal = {
  customer_pb_id: number; // PB ID
  category_id: number;
  status_id: number;
  title: string;
  date: string;
  content: string;
};

type ConsultationJournalListProps = {
  customerId: number | null; // 선택된 고객 ID
};

function ConsultationJournalList({ customerId }: ConsultationJournalListProps) {
  const [consultationJourData, setConsultationJourData] = useState<ConsultationJournal[]>([]); // 상담 일지 데이터 상태
  const [pbName, setPbName] = useState<string | null>(null); // PB 이름 상태
  const [pbId, setPbId] = useState<number | null>(null); // 선택된 PB ID 상태

  // 고객 PB ID 가져오는 함수
  const fetchCustomerPB = async () => {
    try {
      const response = await fetch('../../public/data/Customer_PB.json');
      const customerPBData = await response.json();
      const customerPB = customerPBData.find((pb: CustomerPB) => pb.customer_id === customerId);
      
      if (customerPB) {
        setPbId(customerPB.id); // PB ID 설정
        fetchPBName(customerPB.pb_id); // PB 이름을 가져오는 함수 호출
      }
    } catch (error) {
      console.error('Error fetching Customer PB data:', error);
    }
  };

  // PB 이름 가져오는 함수
  const fetchPBName = async (pbId: number) => {
    try {
      const response = await fetch('../../public/data/PB.json');
      const pbData = await response.json();
      const pb = pbData.find((pb: PB) => pb.id === pbId);

      if (pb) {
        setPbName(pb.name); // PB 이름 설정
      }
    } catch (error) {
      console.error('Error fetching PB data:', error);
    }
  };

  // 상담 일지 데이터를 가져오는 함수
  const fetchConsultationData = async () => {
    if (pbId === null) return; // PB ID가 없으면 종료

    try {
      const response = await fetch('../../public/data/Consulting.json');
      const data = await response.json();
      const filteredData = data.filter((consultation: ConsultationJournal) => consultation.customer_pb_id === pbId); // PB ID로 필터링
      setConsultationJourData(filteredData); // 필터링된 상담 일지 데이터 설정
    } catch (error) {
      console.error('Error fetching consultation data:', error);
    }
  };

  // 컴포넌트가 마운트될 때 고객 PB 정보를 가져오고, 상담 데이터를 가져옵니다.
  useEffect(() => {
    fetchCustomerPB();
  }, [customerId]);

  useEffect(() => {
    fetchConsultationData();
  }, [pbId]);

  return (
    <div className="flex flex-col w-[25rem] h-[56rem] bg-[#f4f2e5] rounded-3xl shadow-lg">
      {/* 헤더 */}
      <div className="bg-[#005645] text-[#f2f4f6] text-[1.5rem] font-extrabold p-4 rounded-t-3xl pl-5">
        상담일지 리스트
      </div>

      {/* 상담 일지 목록 */}
      <div className="p-4 overflow-auto">
        {consultationJourData.length > 0 ? (
          consultationJourData.map((consultation, index) => (
            <div key={index} className="bg-[#fcfbf6] rounded-2xl p-4 mb-4 shadow-md flex items-center">
              {/* 왼쪽에 번호 표시 */}
              <div className="text-[#005645] text-[1rem] font-bold mr-4">{index + 1}</div>
              
              {/* 오른쪽 내용 */}
              <div className="flex-1">
                <div className="flex justify-between text-black text-[1rem] font-light">
                  {/* PB 이름 표시 */}
                  <span>{pbName ? pbName : 'PB 이름 없음'}</span> {/* PB 이름을 표시, 없으면 기본값 */}
                  <span>{consultation.date}</span>
                </div>
                <div className="text-[1rem] font-bold text-ellipsis overflow-hidden whitespace-nowrap" style={{ maxWidth: '20rem' }}>
                  {consultation.content}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">상담 일지가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default ConsultationJournalList;
