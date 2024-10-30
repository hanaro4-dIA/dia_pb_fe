import { IoMdSearch } from 'react-icons/io';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

type TCustomer = {
  id: number;
  name: string;
};

type TCustomerPb = {
  customer_id: number;
  memo: string;
};

type TGuestListProps = {
  customers: TCustomer[];
};

export default function GuestList({ customers }: TGuestListProps) {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [memo, setMemo] = useState<TCustomerPb[]>([]); // 손님_PB 메모 데이터
  const navigate = useNavigate();
  const params = useParams();

  // 손님 및 상담 메모 데이터를 가져오는 함수
  useEffect(() => {
    const fetchMemos = async () => {
      try {
        const memoResponse = await fetch('/data/Customer_PB.json');
        const memoData = await memoResponse.json();
        setMemo(memoData);
      } catch (error) {
        alert('Error fetching data:');
      }
    };

    fetchMemos();
  }, []);

  // 입력한 검색어에 따라 손님 목록을 필터링하는 함수
  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 손님 ID로 해당 메모 찾기
  const getMemo = (customerId: number) => {
    const cMemo = memo.find((c) => c.customer_id === customerId);
    return cMemo ? cMemo.memo : '메모 없음';
  };

  return (
    <div className='flex flex-col h-full bg-white'>
      {/* 헤더 */}
      <div className='flex items-center justify-between bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 pl-5 rounded-t-lg'>
        손님 목록
      </div>
      <div className='overflow-auto border-x border-b border-gray-200'>
        {/* 검색 입력 필드 */}
        <div className='flex justify-center mt-4 '>
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
        <div className='mt-2 p-4'>
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className='mb-4'
              onClick={() => navigate(`/customerDetail/${customer.id}`)}
            >
              {/* 현재 보고 있는 손님일 경우 */}
              {customer.id === Number(params.id) ? (
                <div className='border-2 border-hanaindigo rounded-lg p-4 shadow-lg cursor-pointer'>
                  {/* 손님 이름 */}
                  <div className='text-lg font-bold'>{customer.name} 손님</div>

                  {/* 손님별 메모 내용 */}
                  <div className=' bg-hanagold/60 text-black p-2 mt-2 rounded-lg'>
                    <div className='truncate w-full'>
                      {getMemo(customer.id)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className='bg-white rounded-lg p-4 border shadow-lg cursor-pointer'>
                  {/* 손님 이름 */}
                  <div className='text-black text-lg font-bold'>
                    {customer.name} 손님
                  </div>

                  {/* 손님별 메모 내용 */}
                  <div className='bg-hanagold/40 text-black p-3 mt-2 rounded-lg'>
                    <div className='truncate w-full'>
                      {getMemo(customer.id)}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
