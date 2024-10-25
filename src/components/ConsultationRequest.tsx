// import React, { useState } from 'react';

// function ConsultationRequest() {
//   const [consultationData, setConsultationData] = useState([
//     { name: '조경은', topic: '@성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '2024.10.22 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
//     { name: '강강강', topic: '조기퇴근 상담요청합니다.', hopeDay: '2024.10.23 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Done' },
//     { name: '조경은', topic: '@성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '2024.10.22 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
//     { name: '강강강', topic: '조기퇴근 상담요청합니다.', hopeDay: '2024.10.23 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Done' },
//     { name: '조경은', topic: '@성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '2024.10.22 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
//     { name: '강강강', topic: '조기퇴근 상담요청합니다.', hopeDay: '2024.10.23 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Done' },
//     { name: '조경은', topic: '@성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '2024.10.22 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
//     { name: '강강강', topic: '조기퇴근 상담요청합니다.', hopeDay: '2024.10.23 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Done' },
//   ]);

//   // 버튼 클릭 시 approvalStatus를 변경하는 함수
//   const toggleApprovalStatus = (index: number) => {
//     setConsultationData(prevData => 
//       prevData.map((consultation, i) => 
//         i === index 
//           ? { ...consultation, approvalStatus: consultation.approvalStatus === 'Standby' ? 'Done' : 'Standby' } 
//           : consultation
//       )
//     );
//   };

//   return (
//     <>
//       {/* 1440x1024 크기의 테두리 */}
//       <div className="border-4 border-black w-[1440px] h-[1024px] relative">
//         {/* 헤더 */}
//         <div className="w-[396px] h-[60px] left-0 top-0 absolute bg-[#007b62] rounded-tl-[25px] rounded-tr-[25px]">
//           <div className="w-[300px] h-[34px] left-[26px] top-[17px] absolute text-[#f2f4f6] text-2xl font-extrabold font-['Inter']">
//             들어온 상담 요청
//           </div>
//         </div>

//         {/* 상담 데이터 리스트 (scrollable이 포함된 영역) */}
//         <div className="w-[396px] h-[560px] left-0 top-[60px] absolute bg-[#f4f2e5] rounded-bl-[25px] rounded-br-[25px] shadow">
//           <div className="scrollable h-full p-4">
//             {consultationData.map((consultation, index) => (
//               <div key={index} className="relative mt-4">
//                 <div className="w-[362px] h-[80px] mx-auto bg-[#fcfbf6] rounded-[25px] p-4">
//                   <div className="text-black text-base font-extrabold font-['Inter'] leading-normal flex justify-between items-center"
//                     style={{ width: '330px' }}>
//                     {/* Topic */}
//                     <span className="font-bold overflow-hidden text-ellipsis whitespace-nowrap"
//                       style={{ maxWidth: '250px' }}>
//                       {consultation.topic}
//                     </span>

//                     {/* Button */}
//                     <button
//                       className={`w-[60.34px] h-[22.05px] text-center text-[#f2f4f6] text-[11px] font-normal font-['Inter'] rounded-[25px] ${consultation.approvalStatus === 'Standby' ? 'bg-[#007b62]' : 'bg-[#005645]'}`}
//                       onClick={() => toggleApprovalStatus(index)}
//                     >
//                       {consultation.approvalStatus === 'Standby' ? '승인대기' : '승인완료'}
//                     </button>
//                   </div>

//                   <div className="flex justify-between text-black text-base font-light font-['Inter'] leading-normal">
//                     <span className="font-bold">{consultation.hopeDay} 요청</span>
//                     <span>{consultation.requestDay}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ConsultationRequest;
// import React, { useState } from 'react';

// function ConsultationRequest() {
//   const [consultationData, setConsultationData] = useState([
//     { name: '조경은', topic: '@성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '2024.10.22 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
//     { name: '강강강', topic: '조기퇴근 상담요청합니다dadadasdadasdasdad.', hopeDay: '2024.10.23 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
//     { name: '조경은', topic: '@성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '2024.10.22 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
//     { name: '강강강', topic: '조기퇴근 상담요청합니다.asdasdasdasdasdasdasdasdasdasdadasd', hopeDay: '2024.10.23 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Done' },
//     { name: '조경은', topic: '@성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '2024.10.22 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
//     { name: '강강강', topic: '조기퇴근 상담요청합니다.', hopeDay: '2024.10.23 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Done' },
//     { name: '조경은', topic: '@성수 AK프라자 부동산 건 상담요청합니다.', hopeDay: '2024.10.22 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Standby' },
//     { name: '강강강', topic: '조기퇴근 상담요청합니다.', hopeDay: '2024.10.23 16:30', requestDay: '2024.10.21 09:00:01', approvalStatus: 'Done' },
//   ]);

//   // 버튼 클릭 시 approvalStatus를 변경하는 함수
//   const toggleApprovalStatus = (index: number) => {
//     setConsultationData(prevData => 
//       prevData.map((consultation, i) => 
//         i === index 
//           ? { ...consultation, approvalStatus: consultation.approvalStatus === 'Standby' ? 'Done' : 'Standby' } 
//           : consultation
//       )
//     );
//   };

//   return (
//     <>
//       {/* 1440x1024 크기의 테두리 */}
//       {/* <div className="border-4 border-black w-[100vw] h-[100vh] relative"> */}
//         {/* 헤더 */}
//         <div className="w-[27.5vw] h-[6vh] left-0 top-0 absolute bg-[#007b62] rounded-tl-[2vw] rounded-tr-[2vw]">
//           <div className="w-[20vw] h-[3vh] left-[2vw] top-[1.5vh] absolute text-[#f2f4f6] text-[1.8vw] font-extrabold font-['Inter']">
//             들어온 상담 요청
//           </div>
//         </div>

//         {/* 상담 데이터 리스트 (scrollable이 포함된 영역) */}
//         <div className="w-[27.5vw] h-[55vh] left-0 top-[6vh] absolute bg-[#f4f2e5] rounded-bl-[2vw] rounded-br-[2vw] shadow">
//           <div className="scrollable h-full p-[1vh]">
//             {consultationData.map((consultation, index) => (
//               <div key={index} className="relative mt-[1.95vh]">
//                 <div className="w-[25vw] h-[10vh] mx-auto bg-[#fcfbf6] rounded-[2vw] p-[2vh]">
//                   <div className="text-black text-base font-extrabold font-['Inter'] leading-normal flex justify-between items-center"
//                     style={{ width: '23vw' }}>
//                     {/* Topic */}
//                     <span className="font-bold overflow-hidden text-ellipsis whitespace-nowrap"
//                       style={{ maxWidth: '17vw' }}>
//                       {consultation.topic}
//                     </span>

//                     {/* Button */}
//                     <button
//                       className={`w-[6vw] h-[3.5vh] text-center text-[#f2f4f6] text-[0.9vw] font-normal font-['Inter'] rounded-[2vw] ${consultation.approvalStatus === 'Standby' ? 'bg-[#007b62]' : 'bg-[#005645]'}`}
//                       onClick={() => toggleApprovalStatus(index)}
//                     >
//                       {consultation.approvalStatus === 'Standby' ? '승인대기' : '승인완료'}
//                     </button>

//                   </div>

//                   <div className="flex justify-between text-black text-base font-light font-['Inter'] leading-normal">
//                     <span className="font-bold">{consultation.hopeDay} 요청</span>
//                     <span>{consultation.requestDay}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       {/* </div> */}
//     </>
//   );
// }

// export default ConsultationRequest;







import { useState } from 'react';

function ConsultationRequest() {
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
    <div className="flex flex-col w-[25rem] h-[39rem] bg-[#f4f2e5] rounded-3xl shadow-lg">
      {/* 헤더 */}
      <div className="bg-[#005645] text-[#f2f4f6] text-[1.5rem] font-extrabold p-4 rounded-t-3xl pl-5">
        들어온 상담 요청
      </div>

      {/* 상담 데이터 리스트 */}
      <div className="flex-1 overflow-auto p-4">
        {consultationData.map((consultation, index) => (
          <div key={index} className="bg-[#fcfbf6] rounded-2xl p-4 mb-4 shadow-md">
            <div className="flex justify-between items-center">
              {/* Topic */}
              <span className="text-[1rem] font-bold text-ellipsis overflow-hidden whitespace-nowrap" style={{ maxWidth: '15rem' }}>
                {consultation.topic}
              </span>

              {/* Button */}
              <button
                className={`w-[6rem] h-[2rem] text-[#f2f4f6] text-[1rem] rounded-2xl ${consultation.approvalStatus === 'Standby' ? 'bg-[#007b62]' : 'bg-[#005645]'}`}
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

export default ConsultationRequest;
