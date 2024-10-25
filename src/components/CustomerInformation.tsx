// // CustomerInformation.tsx
// import React, { useState } from 'react';

// type HeightProps = {
//   height: string;
// };

// type Customer = {
//   id: number;        
//   email: string;    
//   password: string;  
//   name: string;     
//   sex: string;   
//   birth: string;     
//   tel: string;       
//   address: string;   
// };

// type Customer_Pb = {
//   id: number;        
//   customer_id: number;    
//   pb_id: number;  
//   date: string;     
//   count: number;   
//   memo: string;     
// };

// // 단일 고객 정보 예시
// const customer_Data: Customer = {
//   id: 1,
//   email: '이메일@네이버.컴',
//   password: '비번',
//   name: '조경은',
//   sex: '여',
//   birth: '2000.01.01',
//   tel: '010-1234-1234',
//   address: '디지털 하나로',
// };

// let customer_pb_Data: Customer_Pb = { // let으로 변경하여 수정 가능하도록
//   id: 123, 
//   customer_id: 1, 
//   pb_id: 321,
//   date: '2023.12.23 15:00',
//   count: 4, 
//   memo: "수정가능한메모궁시렁궁궁시렁궁궁aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa시렁궁궁시렁궁시렁궁시렁궁시렁궁시렁궁시렁궁시렁궁시렁궁시렁궁시렁궁시렁궁시렁궁시렁궁시렁",
// };

// function CustomerInformation({ height }: HeightProps) {
//   const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
//   const [memo, setMemo] = useState(customer_pb_Data.memo); // 현재 메모 상태

//   const handleEditClick = () => {
//     setIsEditing(true); // 편집 모드로 전환
//   };

//   const handleSaveClick = () => {
//     setIsEditing(false); // 편집 모드 해제
//     customer_pb_Data.memo = memo; // 로컬 데이터 업데이트
//   };

//   const handleCancelClick = () => {
//     setIsEditing(false); // 편집 모드 해제
//     setMemo(customer_pb_Data.memo); // 원래 메모로 되돌리기
//   };

//   return (
//     <div className={`flex flex-col w-[25rem] bg-[#f4f2e5] rounded-3xl shadow-lg`} style={{ height }}>
//       {/* 헤더 */}
//       <div className="bg-[#005645] text-[#f2f4f6] text-[1.5rem] font-extrabold p-4 rounded-t-3xl pl-5">
//         손님 정보
//       </div>

//       {/* 단일 고객 정보 표시 */}
//       <div className="p-4">
//         <div className="bg-[#fcfbf6] rounded-2xl p-4 mb-2 shadow-md">
//           <div className="flex justify-between text-black text-[1rem] font-light">
//             <span>손님과 만난 날짜</span>
//             <span>{customer_pb_Data.date}</span>
//           </div>
//         </div>

//         <div className="bg-[#fcfbf6] rounded-2xl p-4 mb-2 shadow-md">
//           <div className="flex justify-between text-black text-[1rem] font-light">
//             <span>최근 상담 날짜</span>
//             <span>{customer_pb_Data.date}(수정필)</span>
//           </div>
//         </div>

//         <div className="bg-[#fcfbf6] rounded-2xl p-4 mb-2 shadow-md">
//           <div className="flex justify-between text-black text-[1rem] font-light">
//             <span>상담 횟수</span>
//             <span>{customer_pb_Data.count}회</span>
//           </div>
//         </div>

//         <div className="bg-[#fcfbf6] rounded-2xl p-4 mb-2 shadow-md">
//           <div className="flex justify-between text-black text-[1rem] font-light">
//             <span>메모</span>
//               {isEditing ? (
//                 <span className="flex space-x-2">
//                   <button onClick={handleSaveClick} className="bg-green-400 text-white rounded-xl px-2 py-1">저장</button>
//                   <button onClick={handleCancelClick} className="bg-red-400 text-white rounded-xl px-2 py-1">취소</button>
//                 </span>
//               ) : (
//                 <button className='m-1 text-red-500 font-bold' onClick={handleEditClick}>EDIT</button>
//               )}
//           </div>
//           <div className='bg-white rounded-xl p-3 border h-[8rem] overflow-auto mt-1'>
//             {isEditing ? (
//               <textarea
//                 value={memo}
//                 onChange={(e) => setMemo(e.target.value)}
//                 className='w-full h-full rounded-xl resize-none'
//               />
//             ) : (
//               <span>{memo}</span>
//             )}
//           </div>
//         </div>

//       </div>      
//     </div>
//   );
// }

// export default CustomerInformation;
// CustomerInformation.tsx


// 😭😭😭😭😭😭😭😭한 손님이 여러명의 pb와 상담을 한 일지가 나오게끔 수정을 해야해여!
import { useEffect, useState } from 'react';

type Customer = {
  id: number;        
  name: string;     
  sex: string;     
};

type CustomerPB = {
  id: number;        
  customer_id: number;    
  date: string;     
  count: number;   
  memo: string;     
};

type CustomerInformationProps = {
  customerId: number | null; // 선택된 고객 ID
}

function CustomerInformation({ customerId }: CustomerInformationProps) {
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 상태
  const [customerData, setCustomerData] = useState<Customer | null>(null); // 고객 데이터 상태
  const [memo, setMemo] = useState<string>(''); // 메모 상태
  const [count, setCount] = useState<number | null>(null); // 상담 횟수 상태
  const [meetDate, setMeetDate] = useState<string>(''); // 처음 만난 날짜 상태
  // const [date, setDate] = useState<string>(''); // 최근 상담 날짜 상태

  const handleEditClick = () => {
    setIsEditing(true); // 편집 모드로 전환
  };

  const handleSaveClick = () => {
    setIsEditing(false); // 편집 모드 해제
    // 메모 저장 로직 (필요시 추가)
  };

  const handleCancelClick = () => {
    setIsEditing(false); // 편집 모드 해제
    // 원래 메모로 되돌리기 (필요시 원래 값을 가져올 수 있도록 로직 추가)
  };

  // 고객 정보를 가져오는 함수
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('../../public/data/Customer.json');
        const data = await response.json();
        const customer = data.find((c: Customer) => c.id === customerId);
        setCustomerData(customer || null);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    const fetchMemoData = async () => {
      try {
        const response = await fetch('../../public/data/Customer_PB.json');
        const data = await response.json();
        const customerMemo = data.find((c: CustomerPB) => c.customer_id === customerId);
        if (customerMemo) {
          setMemo(customerMemo.memo); // 메모 상태 업데이트
          setCount(customerMemo.count); // 상담 횟수 상태 업데이트
          setMeetDate(customerMemo.date); // 처음 만난 날짜 상태 업데이트
        } else {
          setMemo('메모 없음'); // 메모가 없는 경우 기본값 설정
          setCount(null); // 상담 횟수가 없는 경우 null 설정
          setMeetDate(''); // 처음 만난 날짜가 없는 경우 기본값 설정
        }
      } catch (error) {
        console.error('Error fetching memo data:', error);
      }
    };

    fetchCustomerData();
    fetchMemoData();
  }, [customerId]);

  return (
    <div className={`flex flex-col w-[25rem] h-[30rem] bg-[#f4f2e5] rounded-3xl shadow-lg`}>
      {/* 헤더 */}
      <div className="bg-[#005645] text-[#f2f4f6] text-[1.5rem] font-extrabold p-4 rounded-t-3xl pl-5">
        {customerData?.name} 손님 정보
      </div>

      {/* 고객 정보 표시 */}
      {customerData ? (
        <div className="p-4">
          <div className="bg-[#fcfbf6] rounded-2xl p-4 mb-2 shadow-md">
            <div className="flex justify-between text-black text-[1rem] font-light">
              <span>손님과 만난 날짜</span>
              <span>{meetDate || '정보 없음'}</span>
            </div>
          </div>

          <div className="bg-[#fcfbf6] rounded-2xl p-4 mb-2 shadow-md">
            <div className="flex justify-between text-black text-[1rem] font-light">
              <span>최근 상담 날짜</span>
              {/* <span>{date || '정보 없음'}</span> */}
              <span>정보 없음</span>
            </div>
          </div>

          <div className="bg-[#fcfbf6] rounded-2xl p-4 mb-2 shadow-md">
            <div className="flex justify-between text-black text-[1rem] font-light">
              <span>상담 횟수</span>
              <span>{count !== null ? count : '정보 없음'}</span>
            </div>
          </div>

          {/* 메모 부분 */}
          <div className="bg-[#fcfbf6] rounded-2xl p-4 mb-2 shadow-md">
            <div className="flex justify-between text-black text-[1rem] font-light">
              <span>메모</span>
              {isEditing ? (
                <span className="flex space-x-2">
                  <button onClick={handleSaveClick} className="bg-green-400 text-white rounded-xl px-2 py-1">저장</button>
                  <button onClick={handleCancelClick} className="bg-red-400 text-white rounded-xl px-2 py-1">취소</button>
                </span>
              ) : (
                <button className='m-1 text-red-500 font-bold' onClick={handleEditClick}>EDIT</button>
              )}
            </div>
            <div className='bg-white rounded-xl p-3 border h-[8rem] overflow-auto mt-1'>
              {isEditing ? (
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className='w-full h-full rounded-xl resize-none'
                />
              ) : (
                <span>{memo}</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 pt-4">손님을 선택해주세요.</div>
      )}
    </div>
  );
}

export default CustomerInformation;

