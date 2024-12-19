import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import IteratingListItem from '../components/IteratingListItem';
import { SearchField } from '../components/SearchField';
import Section from '../components/Section';
import useDebounce from '../hooks/useDebounce';
import useFetch from '../hooks/useFetch';
import { type TCustomerProps } from '../types/dataTypes';

export default function CustomerList() {
  const navigate = useNavigate();
  const params = useParams();
  const selectedId = Number(params.id);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const listRefs = useRef<(HTMLDivElement | null)[]>([]);

  const pbId = 1;
  const { data, error } = useFetch<TCustomerProps[]>(
    `pb/customers/list?pbId=${pbId}`
  );

  const [customers, setCustomers] = useState<TCustomerProps[] | null>([]);

  useEffect(() => {
    setCustomers(data);
  }, []);
  console.log('data: ', data);
  console.error(error);
  console.log('customers: ', customers);

  const filteredCustomers = customers?.filter(({ name }) =>
    name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // 선택된 항목에 대해 scrollIntoView 호출
  if (selectedId) {
    const targetIndex = customers?.findIndex(
      (customer) => customer.id === selectedId
    );

    if (targetIndex) {
      const targetElement = listRefs.current[targetIndex];

      targetElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  return (
    <Section title='손님 목록' layoutClassName='h-full'>
      <div className='sticky top-0 z-10 w-full bg-white'>
        <SearchField
          placeholder='손님 이름 검색'
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <div className='w-full h-fit p-4'>
        {filteredCustomers && filteredCustomers.length > 0 ? (
          filteredCustomers.map(({ id, name, memo }, index) => (
            <div ref={(el) => (listRefs.current[index] = el)} key={id}>
              <IteratingListItem
                id={id}
                title={`${name} 손님`}
                content={memo}
                isSelected={id === selectedId}
                onClick={() => navigate(`/customerDetail/${id}`)}
              />
            </div>
          ))
        ) : (
          <div className='text-center text-hanaindigo text-s'>
            존재하지 않는 손님입니다.
          </div>
        )}
      </div>
    </Section>
  );
}
