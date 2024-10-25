// 바로 리스트로 만들어서 넣어주기

// import { useState } from 'react';
// import { IoMdSearch } from "react-icons/io";




// function GuestList() {
//   const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
//   const customers = [
//     { name: '조경은', description: '10대 여성. 부동산에 관심. 자산 10억으로 보수적인 사람입니다.' },
//     { name: '김철수', description: '30대 남성. IT에 관심. 자산 5억으로 공격적인 사람입니다.' },
//     { name: '1지민', description: '40대 여성. 금융에 관심. 자산 7억으로 중립적인 성향입니다.' },
//     { name: '2지민', description: '40대 여성. 금융에 관심. 자산 7억으로 중립적인 성향입니다.' },
//     { name: '3지민', description: '40대 여성. 금융에 관심. 자산 7억으로 중립적인 성향입니다.' },
//     { name: '4지민', description: '40대 여성. 금융에 관심. 자산 7억으로 중립적인 성향입니다.' },
//     { name: '5지민', description: '40대 여성. 금융에 관심. 자산 7억으로 중립적인 성향입니다.' },
//   ];

//   // 입력한 검색어에 따라 손님 목록을 필터링하는 함수
//   const filteredCustomers = customers.filter(customer =>
//     customer.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex flex-col h-full bg-[#f4f2e5] rounded-3xl shadow-lg">
//       {/* 헤더 */}
//       <div className="bg-[#005645] text-[#f2f4f6] text-[1.5rem] font-extrabold p-4 rounded-t-3xl pl-5">
//         손님 목록
//       </div>

//       {/* 검색 입력 필드 */}
//       <div className="flex justify-center mt-4">
//         <div className="relative w-[23rem]">
//           <input
//             type="text"
//             placeholder="손님 이름 검색"
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             className="w-full h-[2.5rem] bg-white/60 rounded-lg border border-[#007b62] pl-4"
//           />
//           <IoMdSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#007b62]" />
//         </div>
//       </div>


//       {/* 필터링된 손님 목록 */}
//       <div className="mt-2 p-4 overflow-auto">
//         {filteredCustomers.map((customer, index) => (
//           <div key={index} className="mb-4">
//             <div className="bg-[#fcfbf6] rounded-2xl p-4 shadow-md">
//               {/* 고객 이름 */}
//               <div className="text-black text-lg font-bold">
//                 {customer.name} 손님
//               </div>

//               {/* 고객 설명 */}
//               <div className="bg-[#298478] text-[#f2f4f6] p-2 mt-2 rounded-2xl">
//                 <div className="overflow-hidden text-ellipsis whitespace-nowrap" style={{ maxWidth: '100%' }}>
//                   {customer.description}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default GuestList;



//#############################################################################################
//json에서 불러오기

// import { useState, useEffect } from 'react';
// import { IoMdSearch } from "react-icons/io";

// type Customer = {
//   id: number;
//   name: string;
// };

// type Customer_PB = {
//   customer_id: number;
//   memo: string;
// };

// function GuestList() {
//   const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
//   const [customers, setCustomers] = useState<Customer[]>([]); // 고객 데이터 상태
//   const [memo, setMemo] = useState<Customer_PB[]>([]); // 고객_PB 메모 데이터

//   // 고객 및 상담 데이터를 가져오는 함수
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const customerResponse = await fetch('../../public/data/Customer.json'); // Customer.json 가져오기
//         const customerData = await customerResponse.json();
//         setCustomers(customerData);

//         const consultingMemo = await fetch('../../public/data/Customer_PB.json'); // Customer_PB.json 가져오기
//         const memoData = await consultingMemo.json();
//         setMemo(memoData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   // 입력한 검색어에 따라 손님 목록을 필터링하는 함수
//   const filteredCustomers = customers.filter(customer =>
//     customer.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // 고객 ID로 해당 메모 찾기
//   const getMemo = (customerId: number) => {
//     const cMemo = memo.find(c => c.customer_id === customerId);
//     return cMemo ? cMemo.memo : "메모 없음";
//   };

//   return (
//     <div className="flex flex-col h-full bg-[#f4f2e5] rounded-3xl shadow-lg">
//       {/* 헤더 */}
//       <div className="bg-[#005645] text-[#f2f4f6] text-[1.5rem] font-extrabold p-4 rounded-t-3xl pl-5">
//         손님 목록
//       </div>

//       {/* 검색 입력 필드 */}
//       <div className="flex justify-center mt-4">
//         <div className="relative w-[23rem]">
//           <input
//             type="text"
//             placeholder="손님 이름 검색"
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//             className="w-full h-[2.5rem] bg-white/60 rounded-lg border border-[#007b62] pl-4"
//           />
//           <IoMdSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#007b62]" />
//         </div>
//       </div>

//       {/* 필터링된 손님 목록 */}
//       <div className="mt-2 p-4 overflow-auto">
//         {filteredCustomers.map((customer) => (
//           <div key={customer.id} className="mb-4">
//             <div className="bg-[#fcfbf6] rounded-2xl p-4 shadow-md">
//               {/* 고객 이름 */}
//               <div className="text-black text-lg font-bold">
//                 {customer.name} 손님
//               </div>
              
//               {/* 고객별 메모 내용 */}
//               <div className="bg-[#298478] text-[#f2f4f6] p-2 mt-2 rounded-2xl">
//                 <div className="overflow-hidden text-ellipsis whitespace-nowrap" style={{ maxWidth: '100%' }}>
//                   {getMemo(customer.id)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default GuestList;
// GuestList.tsx
// GuestList.tsx
import { useState, useEffect } from 'react';
import { IoMdSearch } from "react-icons/io";

type Customer = {
  id: number;
  name: string;
};

type Customer_PB = {
  customer_id: number;
  memo: string;
};

interface GuestListProps {
  customers: Customer[];
  onSelectCustomer: (id: number) => void; // 선택된 고객 ID를 부모에 전달하는 함수
}

function GuestList({ customers, onSelectCustomer }: GuestListProps) {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [memo, setMemo] = useState<Customer_PB[]>([]); // 고객_PB 메모 데이터

  // 고객 및 상담 메모 데이터를 가져오는 함수
  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const memoResponse = await fetch('../../public/data/Customer_PB.json'); // Customer_PB.json 가져오기
        const memoData = await memoResponse.json();
        setMemo(memoData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMemos();
  }, []);

  // 입력한 검색어에 따라 손님 목록을 필터링하는 함수
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 고객 ID로 해당 메모 찾기
  const getMemo = (customerId: number) => {
    const cMemo = memo.find(c => c.customer_id === customerId);
    return cMemo ? cMemo.memo : "메모 없음";
  };

  return (
    <div className="flex flex-col h-full bg-[#f4f2e5] rounded-3xl shadow-lg">
      {/* 헤더 */}
      <div className="bg-[#005645] text-[#f2f4f6] text-[1.5rem] font-extrabold p-4 rounded-t-3xl pl-5">
        손님 목록
      </div>

      {/* 검색 입력 필드 */}
      <div className="flex justify-center mt-4">
        <div className="relative w-[23rem]">
          <input
            type="text"
            placeholder="손님 이름 검색"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full h-[2.5rem] bg-white/60 rounded-lg border border-[#007b62] pl-4"
          />
          <IoMdSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#007b62]" />
        </div>
      </div>

      {/* 필터링된 손님 목록 */}
      <div className="mt-2 p-4 overflow-auto">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="mb-4" onClick={() => onSelectCustomer(customer.id)}>
            <div className="bg-[#fcfbf6] rounded-2xl p-4 shadow-md cursor-pointer">
              {/* 고객 이름 */}
              <div className="text-black text-lg font-bold">
                {customer.name} 손님
              </div>
              
              {/* 고객별 메모 내용 */}
              <div className="bg-[#298478] text-[#f2f4f6] p-2 mt-2 rounded-2xl">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap" style={{ maxWidth: '100%' }}>
                  {getMemo(customer.id)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuestList;
