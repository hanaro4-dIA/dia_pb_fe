import { createRoot } from 'react-dom/client';
import { useState, useEffect, useRef } from 'react';
import IteratingListItem from '../components/IteratingListItem';
import Section from '../components/Section';
import NotificationDetailsWindow from '../pages/NotificationDetailsWindow';
import { type TNotificationProps } from '../types/dataTypes';
import { type TCustomersProps } from '../types/dataTypes';

export default function NotificationHistory() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [customers, setCustomers] = useState<TCustomersProps[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<TCustomersProps[]>(
    []
  );
  const [notifications, setNotifications] = useState<TNotificationProps[]>([]);

  const openNewWindow = (notification: TNotificationProps) => {
    const newWindow = window.open('', '_blank', 'width=800,height=600');

    if (newWindow) {
      const styles = Array.from(document.styleSheets)
        .map((styleSheet) => {
          try {
            return Array.from(styleSheet.cssRules)
              .map((rule) => rule.cssText)
              .join('');
          } catch (e) {
            alert('Failed to load some CSS rules:');
            return '';
          }
        })
        .join('');

      newWindow.document.write(`
              <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>쪽지 자세히 보기</title>
                  <style>${styles}</style>
                </head>
                <body>
                  <div id="dictionary-root"></div>
                </body>
              </html>
            `);
      newWindow.document.close();

      const rootElement = newWindow.document.getElementById('dictionary-root');
      if (rootElement) {
        const root = createRoot(rootElement);

        root.render(<NotificationDetailsWindow {...notification} />);
      }
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notiResponse = await fetch('/data/Notifications.json');
        const notiData = await notiResponse.json();
        setNotifications(notiData);
      } catch (error) {
        alert('Error fetching data:');
      }
    };

    fetchNotifications();
  }, []);

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

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch =
      notification.name.includes(searchTerm) ||
      notification.text.includes(searchTerm);

    if (selectedCustomers.length === 0) return matchesSearch;

    return (
      matchesSearch &&
      selectedCustomers.some((c) => c.name === notification.name)
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
                  <div className='absolute z-10 w-full mt-1 bg-white/80 border border-gray-200 rounded-lg shadow-lg overflow-y-scroll'>
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
        <div className='flex flex-col overflow-y-scroll px-4 flex-grow'>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification: TNotificationProps) => (
              <IteratingListItem
                id={notification.id}
                title={`${notification.name} 손님`}
                content={notification.text}
                onClick={() => openNewWindow(notification)}
                date={notification.date}
              />
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
