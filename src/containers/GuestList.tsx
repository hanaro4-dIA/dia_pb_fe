import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import IteratingListItem from '../components/IteratingListItem';
import { SearchField } from '../components/SearchField';
import Section from '../components/Section';
import useDebounce from '../hooks/useDebounce';
import { type TCustomersProps } from '../types/dataTypes';
import { type TCustomerPbProps } from '../types/dataTypes';

type TGuestListProps = {
  customers: TCustomersProps[];
};

export default function GuestList({ customers }: TGuestListProps) {
  const [memo, setMemo] = useState<TCustomerPbProps[]>([]);
  const navigate = useNavigate();
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

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
    name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // 손님 ID로 해당 메모 찾기
  const getMemo = (customerId: number) => {
    const cMemo = memo.find((c) => c.customer_id === customerId);
    return cMemo ? cMemo.memo : '메모 없음';
  };

  return (
    <Section title='손님 목록'>
      <div className='top-0 z-10 w-full bg-white'>
        <SearchField
          placeholder='손님 이름 검색'
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <div className='w-full h-fit p-4'>
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map(({ id, name }) => (
            <IteratingListItem
              key={id}
              id={id}
              title={`${name} 손님`}
              content={getMemo(id)}
              isSelected={id === Number(params.id)}
              onClick={() => navigate(`/customerDetail/${id}`)}
            />
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
