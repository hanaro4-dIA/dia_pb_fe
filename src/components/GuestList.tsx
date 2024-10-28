import { IoMdSearch } from 'react-icons/io';
import { useState, useEffect } from 'react';

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

export default function GuestList({
  customers,
  onSelectCustomer,
}: GuestListProps) {
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
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 고객 ID로 해당 메모 찾기
  const getMemo = (customerId: number) => {
    const cMemo = memo.find((c) => c.customer_id === customerId);
    return cMemo ? cMemo.memo : '메모 없음';
  };

  return (
    <div className='flex flex-col h-full bg-white rounded-lg shadow-lg border border-gray-200'>
      {/* 헤더 */}
      <div className='bg-hanaindigo text-white text-xl font-extrabold p-3 pl-5 rounded-t-lg'>
        손님 목록
      </div>

      {/* 검색 입력 필드 */}
      <div className='flex justify-center mt-4'>
        <div className='relative w-11/12'>
          <input
            type='text'
            placeholder='손님 이름 검색'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full h-[2.5rem] bg-white/60 rounded-lg border border-hanaindigo pl-4'
          />
          <IoMdSearch className='absolute right-4 top-1/2 transform -translate-y-1/2 text-hanaindigo' />
        </div>
      </div>

      {/* 필터링된 손님 목록 */}
      <div className='mt-2 p-4 overflow-auto'>
        {filteredCustomers.map((customer) => (
          <div
            key={customer.id}
            className='mb-4'
            onClick={() => onSelectCustomer(customer.id)}
          >
            <div className='bg-[#fff] rounded-lg p-4 border shadow-lg cursor-pointer'>
              {/* 고객 이름 */}
              <div className='text-black text-lg font-bold'>
                {customer.name} 손님
              </div>

              {/* 고객별 메모 내용 */}
              <div className='bg-hanaindigo text-[#fff] p-2 mt-2 rounded-lg'>
                <div
                  className='overflow-hidden text-ellipsis whitespace-nowrap'
                  style={{ maxWidth: '100%' }}
                >
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
