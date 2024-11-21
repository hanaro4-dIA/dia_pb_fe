import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';

type Customer = {
  id: number;
  name: string;
};

export default function WriteNoti() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);

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
        alert('Error fetching data:');
      }
    };
    fetchCustomers();
  }, []);

  const handleCustomerSelect = (customer: Customer) => {
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

  return (
    <div className='flex flex-col h-full bg-white'>
      <div className='bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 pl-5 rounded-t-lg flex justify-between items-center'>
        새로운 쪽지 전송하기
      </div>
      <div className='w-full h-full overflow-auto p-2 border-x border-b border-gray-200'>
        <div className='w-full h-full flex-1 overflow-hidden flex flex-col'>
          {/* 수신인 선택 */}
          <div className='w-full p-4 flex-none justify-center'>
            <div className='flex items-center gap-14 mb-2 mx-2'>
              <div className='flex items-center gap-4'>
                <div className='flex-none text-base font-medium'>수신인</div>
              </div>

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

              <div className='flex justify-center w-3/5' ref={dropdownRef}>
                <div className='relative w-full'>
                  <input
                    type='text'
                    placeholder='손님 선택'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    className='w-full h-10 px-4 border-b border-gray-300 focus:outline-none'
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
                          <label
                            htmlFor={`customer-${customer.id}`}
                            className='cursor-pointer'
                          >
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
              {selectedCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className='flex items-center bg-hanagold/40 rounded-full px-3 py-1 text-sm'
                >
                  <span>{customer.name} 손님</span>
                  <button
                    onClick={() => handleRemoveTag(customer.id)}
                    className='ml-2 text-gray-500 hover:text-gray-700 focus:outline-none'
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* 제목 입력란 */}
          <div className='w-full p-4 flex items-center mb-2'>
            <span className='w-24 flex-none'>제목</span>
            <input
              type='text'
              placeholder='마음을 표현하세요'
              className='flex-grow border-b border-gray-200 pb-2 focus:outline-none'
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
              <Button className='bg-hanagold'>마음 보내기</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
