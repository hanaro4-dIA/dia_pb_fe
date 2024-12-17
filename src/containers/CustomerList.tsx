import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import IteratingListItem from '../components/IteratingListItem';
import { SearchField } from '../components/SearchField';
import Section from '../components/Section';
import useDebounce from '../hooks/useDebounce';
import { type TCustomerProps } from '../types/dataTypes';

export default function CustomerList() {
  const navigate = useNavigate();
  const params = useParams();
  const selectedId = Number(params.id);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [customers, setCustomers] = useState<TCustomerProps[]>([]);
  const listRefs = useRef<(HTMLDivElement | null)[]>([]);
  console.log('listRefs: ', listRefs.current);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/data/Customers.json');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(({ name }) =>
    name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // 선택된 항목에 대해 scrollIntoView 호출
  useEffect(() => {
    if (selectedId) {
      const targetIndex = customers.findIndex(
        (customer) => customer.id === selectedId
      );

      const targetElement = listRefs.current[targetIndex];
      console.log('targetElement: ', targetElement);

      targetElement?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    return;
  });

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
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map(({ id, name, memo }, index) => (
            <div
              ref={(el) => (listRefs.current[index] = el)} // 각 항목에 ref 설정
              key={id}
            >
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
          <div className='text-center text-hanaindigo text-xl'>
            존재하지 않는 손님입니다.
          </div>
        )}
      </div>
    </Section>
  );
}
