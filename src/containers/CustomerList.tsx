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
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const listRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { data: initialData, error: initialError } =
    useFetch<TCustomerProps[]>(`customers/list`);

  const { data: searchData, error: searchError } = useFetch<TCustomerProps[]>(
    debouncedSearchTerm && `customers/search?name=${debouncedSearchTerm}`
  );

  const [customersList, setCustomersList] = useState<TCustomerProps[] | []>([]);

  useEffect(() => {
    if (debouncedSearchTerm && searchData) {
      setCustomersList(searchData);
    } else if (!debouncedSearchTerm && initialData) {
      setCustomersList(initialData);
    }
  }, [debouncedSearchTerm, searchData, initialData]);

  useEffect(() => {
    if (initialError) {
      console.error('손님 목록 조회 중 발생한 에러: ', initialError);
    }
    if (searchError) {
      console.error('손님 검색 중 발생한 에러: ', searchError);
    }
  }, [initialError, searchError]);

  // 선택된 항목에 대해 scrollIntoView 호출
  if (selectedId) {
    const targetIndex = customersList?.findIndex(
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

  if (customersList.length === 0) {
    return <div>손님 목록을 불러오는 중입니다...</div>;
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
        {customersList && customersList.length > 0 ? (
          customersList.map(({ id, name, memo }, index) => (
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
          <div className='text-center text-hanaindigo text-sm'>
            존재하지 않는 손님입니다.
          </div>
        )}
      </div>
    </Section>
  );
}
