import { useState, useEffect, useRef } from 'react';
import Section from '../components/Section';
import { Button } from '../components/ui/button';
import useFetch from '../hooks/useFetch';
import { type TCustomerProps } from '../types/dataTypes';

export default function WriteNotification() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<TCustomerProps[]>(
    []
  );

  // 제목과 내용 상태 추가
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // 고객 연결
  const [customers, setCustomers] = useState<TCustomerProps[]>([]);
  const { data: customersData, error: customersError } =
    useFetch<TCustomerProps[]>(`pb/customers/list`);

  useEffect(() => {
    if (customersData) {
      setCustomers(customersData);
    }
  }, [customersData]);
  console.error('손님 전체 목록 조회 중 발생한 에러: ', customersError);

  // 필터링된 고객 리스트
  const filteredCustomers = customers.filter((customer) =>
    customer.name.includes(searchTerm)
  );

  // 전체 선택 핸들러
  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers);
    }
  };

  // 태그 제거 핸들러
  const handleRemoveTag = (customerId: number) => {
    setSelectedCustomers((prev) => prev.filter((c) => c.id !== customerId));
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCustomerSelect = (customer: TCustomerProps) => {
    setSelectedCustomers((prev) => {
      if (prev.some((c) => c.id === customer.id)) {
        return prev.filter((c) => c.id !== customer.id);
      } else {
        return [...prev, customer];
      }
    });
  };

  // 새로운 쪽지 전송하기 POST
  const { fetchData } = useFetch<{ message: string }>(
    'notifications/send',
    'POST'
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const customerIdsQuery = selectedCustomers
      .map((customer) => customer.id)
      .join(',');

    const payload = {
      title,
      content,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      await fetchData(payload, { customerIds: customerIdsQuery });
      alert('쪽지가 성공적으로 전송되었습니다.');
      setTitle('');
      setContent('');
      setSelectedCustomers([]);
    } catch (error) {
      console.error('쪽지 전송 중 발생한 에러: ', error);
    }
  };

  return (
    <Section title='새로운 쪽지 전송하기' layoutClassName='h-full'>
      <form
        onSubmit={handleSubmit}
        className='w-full h-full overflow-auto p-2 flex flex-col'
      >
        {/* 수신인 선택 */}
        <div className='w-full px-4 py-3 flex-none justify-center'>
          <div className='flex items-center justify-between'>
            <span className='flex items-center flex-none'>수신인</span>

            {/* 전체선택 체크박스 */}
            <div
              className='flex items-center gap-2 cursor-pointer'
              onClick={handleSelectAll}
            >
              <input
                type='checkbox'
                checked={
                  !!customers &&
                  selectedCustomers.length === customers.length &&
                  customers.length > 0
                }
                onChange={handleSelectAll}
                className='w-4 h-4'
              />
              <span className='text-sm flex-none'>전체선택</span>
            </div>

            {/* 손님선택 */}
            <div className='flex justify-center w-4/5' ref={dropdownRef}>
              <div className='relative w-full'>
                <input
                  type='text'
                  placeholder='손님 선택'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  className='w-full h-10 px-4 border-b border-gray-200 focus:outline-none'
                />

                {showDropdown && customers && (
                  <div className='absolute z-10 w-full mt-1 bg-white/80 border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                    {filteredCustomers.map((customer) => (
                      <div
                        key={customer.id}
                        className='flex items-center px-4 py-2 hover:bg-gray-200'
                      >
                        <input
                          type='checkbox'
                          id={`customer-${customer.id}`}
                          checked={selectedCustomers.some(
                            (c) => c.id === customer.id
                          )}
                          onChange={() => handleCustomerSelect(customer)}
                          className='w-4 h-4 mr-2'
                        />
                        <label htmlFor={`customer-${customer.id}`}>
                          {customer.name} 손님
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 선택된 고객 태그 */}
          <div className='flex flex-wrap gap-2 mt-2'>
            {selectedCustomers.map(({ id, name }) => (
              <div
                key={id}
                className='flex items-center bg-hanagold/40 rounded-full px-3 py-1 text-sm'
              >
                <span>{name} 손님</span>
                <button
                  onClick={() => handleRemoveTag(id)}
                  className='ml-2 text-gray-500 hover:text-gray-700 focus:outline-none'
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 제목 입력란 */}
        <div className='w-full px-4 py-2 flex items-center mb-2'>
          <label htmlFor='title' className='w-24 flex-none'>
            제목
          </label>
          <input
            id='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='flex-grow border-b border-gray-200 p-2 focus:outline-none'
          />
        </div>

        {/* 내용 입력란 */}
        <div className='w-full p-4 flex flex-grow'>
          <textarea
            placeholder='소중한 마음을 전달해보세요'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='flex-grow h-full p-2 border border-gray-200 rounded-md focus:outline-none resize-none'
          ></textarea>
        </div>

        {/* 전송 버튼 */}
        <div className='w-full p-4 flex justify-end'>
          <Button type='submit' className='bg-hanagold'>
            마음 보내기
          </Button>
        </div>
      </form>
    </Section>
  );
}
