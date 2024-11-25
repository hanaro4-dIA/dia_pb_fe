import { useState, useEffect, useRef } from 'react';
import Section from '../components/Section';

type ConsultationRecord = {
  id: number;
  date: string;
  content: string;
  recipient: string;
};

type Customer = {
  id: number;
  name: string;
};

export default function NotiHistory() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);
  const [consultations] = useState<ConsultationRecord[]>([
    {
      id: 1,
      date: '2024.03.19',
      content: '(쪽지 내용...)',
      recipient: '강재준',
    },
    {
      id: 2,
      date: '2024.03.18',
      content: '(쪽지 내용...)',
      recipient: '강재준',
    },
    {
      id: 3,
      date: '2024.03.17',
      content: '(쪽지 내용...)',
      recipient: '강재준',
    },
    {
      id: 4,
      date: '2024.03.16',
      content: '(쪽지 내용...)',
      recipient: '김미진',
    },
    {
      id: 5,
      date: '2024.03.15',
      content: '(쪽지 내용...)',
      recipient: '김미진',
    },
    {
      id: 6,
      date: '2024.03.14',
      content: '(쪽지 내용...)',
      recipient: '김은서',
    },
  ]);

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
        alert('Error fetching data');
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

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      consultation.recipient.includes(searchTerm) ||
      consultation.content.includes(searchTerm);

    if (selectedCustomers.length === 0) return matchesSearch;

    return (
      matchesSearch &&
      selectedCustomers.some((c) => c.name === consultation.recipient)
    );
  });

  return (
    <Section title='이전에 전송한 쪽지'>
      <div className='flex flex-col h-full'>
        {/* 수신인 선택 */}
        <div className='bg-white sticky top-0 z-10 w-full p-4'>
          <div className='flex items-center gap-14 mb-2 mx-2'>
            <div className='flex items-center gap-4'>
              <div className='flex-none'>수신인</div>
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

        {/* 쪽지 리스트 아이템 */}
        <div className='overflow-y-auto px-4 pb-4 flex-grow'>
          {filteredConsultations.length > 0 ? (
            filteredConsultations.map((consultation) => (
              <div
                key={consultation.id}
                className='mb-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer'
              >
                <div className='p-3'>
                  <div className='flex justify-between items-center mb-2 text-sm text-gray-600'>
                    <span className='font-bold text-base'>
                      {consultation.recipient} 손님
                    </span>
                    <span>{consultation.date}</span>
                  </div>
                  <div className='bg-hanagold/40 p-3 rounded-lg text-sm'>
                    {consultation.content}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className='flex items-center justify-center h-full'>
              <p className='text-center text-hanaindigo text-xl'>
                검색어에 해당하는 쪽지가 없습니다.
              </p>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
