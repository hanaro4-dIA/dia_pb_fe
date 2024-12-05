import { useState, useEffect, useRef } from 'react';
import Section from '../components/Section';
import { Button } from '../components/ui/button';
import { type TCustomersProps } from '../types/dataTypes';

export default function WriteNotification() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [customers, setCustomers] = useState<TCustomersProps[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<TCustomersProps[]>(
    []
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch('/data/Customers.json');
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다.', error);
      }
    };
    fetchCustomers();
  }, []);

  const handleCustomerSelect = (customer: TCustomersProps) => {
    setSelectedCustomers((prev) => {
      if (prev.some((c) => c.id === customer.id)) {
        return prev.filter((c) => c.id !== customer.id);
      } else {
        return [...prev, customer];
      }
    });
  };

  const handleRemoveTag = (customerId: number) => {
    setSelectedCustomers((prev) => prev.filter((c) => c.id !== customerId));
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === customers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers([...customers]);
    }
  };

  // form 제출
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Section title='새로운 쪽지 전송하기'>
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

                {showDropdown && (
                  <div className='absolute z-10 w-full mt-1 bg-white/80 border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
                    {customers.map((customer) => (
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
            className='flex-grow border-b border-gray-200 p-2 focus:outline-none'
          />
        </div>

        {/* 내용 입력란 */}
        <div className='w-full p-4 flex flex-grow'>
          <div className='w-24 flex-none'></div>
          <textarea
            placeholder='소중한 마음을 전달해보세요'
            className='flex-grow h-full p-2 border border-gray-200 rounded-md focus:outline-none resize-none'
          ></textarea>
        </div>

        {/* 전송 버튼 */}
        <div className='w-full p-4 flex justify-end'>
          <div className='w-24 flex-none'></div>
          <div className='flex-grow flex justify-end'>
            <Button type='submit' className='bg-hanagold'>
              마음 보내기
            </Button>
          </div>
        </div>
      </form>
    </Section>
  );
}
