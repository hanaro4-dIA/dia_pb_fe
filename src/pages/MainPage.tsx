// import { useState, useEffect } from 'react';
// import GL from '../components/GuestList';
// import SCL from '../components/ScheduledConsultationList';
// import CR from '../components/ConsultationRequest';
// import PP from '../components/pbProfile';

// export default function MainPage() {
//   const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null); // 선택된 고객 ID 상태
//   const [customers, setCustomers] = useState<any[]>([]); // 고객 데이터 상태

//   // 고객 데이터를 가져오는 함수
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await fetch('../../public/data/Customer.json');
//         const data = await response.json();
//         setCustomers(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   return (
//     <div className="flex items-start justify-center bg-gray-100 w-full h-screen p-5">
        
        
        
//         <div className="flex flex-col mr-5 mb-5">
//             <div className="w-[25rem] h-[16rem] bg-white rounded-3xl shadow-lg ml-2 mr-2">
//                 <PP/> {/* 프로필 */}
//             </div>
//             <div className="w-[25rem] h-[39rem] bg-white rounded-3xl shadow-lg ml-2 mr-2 mt-4">
//                 <CR /> {/* 들어온 상담 요청 */}
//             </div>
//         </div>

//         <div className="flex flex-col mr-5 mb-5">
//             <div className="w-[25rem] h-[19rem] bg-white rounded-3xl shadow-lg ml-2 mr-2">
//                 캘린더 {/* 캘린더 */}
//             </div>
//             <div className="w-[25rem] h-[36rem] bg-white rounded-3xl shadow-lg ml-2 mr-2 mt-4">
//                 <SCL height="36rem"/> {/* 예정된 상담 일정 */}
//             </div>
//         </div>
              
//         <div className="flex flex-col">
//             <div className="w-[25rem] h-[56rem] bg-white rounded-3xl shadow-lg">
//                 <GL customers={customers} onSelectCustomer={setSelectedCustomerId} />{/* 손님 목록 */}
//             </div>
//         </div>
        
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import GL from '../components/GuestList';
import SCL from '../components/ScheduledConsultationList';
import CR from '../components/ConsultationRequest';
import PP from '../components/PbProfile';

export default function MainPage() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('../../public/data/Customer.json');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    
    <div className="flex items-start justify-center w-full h-screen p-5 space-x-4 overflow-hidden">
      {/* 프로필과 들어온 상담 요청 */}
      <div className="flex flex-col flex-grow w-1/4 h-full space-y-4">
        <div className="overflow-y-auto min-h-[250px]">
          <PP /> {/* 프로필 */}
        </div>
        <div className="overflow-y-auto">
          <CR /> {/* 들어온 상담 요청 */}
        </div>
      </div>

      {/* 캘린더와 예정된 상담 일정 */}
      <div className="flex flex-col flex-grow w-1/4 h-full space-y-4">
        <div className="overflow-y-auto min-h-[400px] bg-red-600">
          캘린더 {/* 캘린더 */}
        </div>
        <div className="overflow-y-auto">
          <SCL /> {/* 예정된 상담 일정 */}
        </div>
      </div>

      {/* 손님 목록 */}
      <div className="flex flex-col flex-grow w-1/4 h-full">
        <div className="overflow-y-auto">
          <GL customers={customers} onSelectCustomer={setSelectedCustomerId} />{/* 손님 목록 */}
        </div>
      </div>
    </div>
  );
}
