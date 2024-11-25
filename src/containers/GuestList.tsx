import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SearchField } from '../components/SearchField';
import Section from '../components/Section';
import { type TCustomersProps } from '../lib/types';
import { type TCustomerPbProps } from '../lib/types';

type TGuestListProps = {
  customers: TCustomersProps[];
};

export default function GuestList({ customers }: TGuestListProps) {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [memo, setMemo] = useState<TCustomerPbProps[]>([]); // 손님_PB 메모 데이터
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
  const filteredCustomers = customers.filter(({ name }) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 손님 ID로 해당 메모 찾기
  const getMemo = (customerId: number) => {
    const cMemo = memo.find((c) => c.customer_id === customerId);
    return cMemo ? cMemo.memo : '메모 없음';
  };

  return (
    <Section title='손님 목록'>
      <div className='sticky top-0 z-10 w-full bg-white'>
        <SearchField
          placeholder='손님 이름 검색'
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <div className='w-full h-fit p-4'>
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map(({ id, name }) => (
            <div
              key={id}
              className='w-full mb-4'
              onClick={() => navigate(`/customerDetail/${id}`)}
            >
              {/* 현재 보고 있는 손님일 경우 */}
              {id === Number(params.id) ? (
                <div className='border-2 border-hanaindigo rounded-lg p-4 shadow-lg cursor-pointer'>
                  {/* 손님 이름 */}
                  <div className='text-lg font-bold'>{name} 손님</div>

                  {/* 손님별 메모 내용 */}
                  <div className=' bg-hanagold/60 text-black p-2 mt-2 rounded-lg'>
                    <div className='truncate w-full'>{getMemo(id)}</div>
                  </div>
                </div>
              ) : (
                <div className='bg-white rounded-lg p-4 border shadow-lg cursor-pointer'>
                  <div className='text-black text-lg font-bold'>
                    {name} 손님
                  </div>

                  <div className='bg-hanagold/40 text-black p-3 mt-2 rounded-lg'>
                    <div className='truncate w-full'>{getMemo(id)}</div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className='text-center text-hanaindigo text-xl'>
            존재하지 않는 손님입니다.
          </div>
        )}
      </div>
    </Section>
  );
}
