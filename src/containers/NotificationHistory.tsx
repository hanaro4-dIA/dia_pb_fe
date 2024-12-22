import { createRoot } from 'react-dom/client';
import { useState, useEffect, useRef } from 'react';
import IteratingListItem from '../components/IteratingListItem';
import Section from '../components/Section';
import useFetch from '../hooks/useFetch';
import NotificationDetailsWindow from '../pages/NotificationDetailsWindow';
import { type TNotificationProps } from '../types/dataTypes';
import { type TCustomerProps } from '../types/dataTypes';

export default function NotificationHistory() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<TCustomerProps[]>(
    []
  );

  // 쪽지 연결
  const [notifications, setNotifications] = useState<TNotificationProps[]>([]);
  const { data: notificationsData, error: notificationsError } =
    useFetch<TNotificationProps[]>('pb/notifications');

  // 고객 연결
  const [customers, setCustomers] = useState<TCustomerProps[]>([]);
  const { data: customersData, error: customersError } =
    useFetch<TCustomerProps[]>(`pb/customers/list`);

  useEffect(() => {
    if (notificationsData) {
      setNotifications(notificationsData);
    }
  }, [notificationsData]);
  console.error('쪽지 전체 목록 조회 중 발생한 에러: ', notificationsError);

  useEffect(() => {
    if (customersData) {
      setCustomers(customersData);
    }
  }, [customersData]);
  console.error('손님 전체 목록 조회 중 발생한 에러: ', customersError);

  // 체크박스 필터링용
  const filteredCustomers = customers.filter((customer) =>
    customer.name.includes(searchTerm)
  );

  // 필터링 고객 선택 및 검색어 입력 처리
  const handleCustomerSelect = (customer: TCustomerProps) => {
    setSelectedCustomers((prev) => {
      if (prev.some((c) => c.id === customer.id)) {
        return prev.filter((c) => c.id !== customer.id);
      } else {
        return [...prev, customer];
      }
    });
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // 전체 선택
  const handleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers);
    }
  };

  // 태그 x로 제거
  const handleRemoveTag = (customerId: number) => {
    setSelectedCustomers((prev) => prev.filter((c) => c.id !== customerId));
  };

  // 드롭박스 밖 클릭 시 닫기 기능
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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedIds = selectedCustomers.map((customer) => customer.id);
  const searchParams = new URLSearchParams();

  // 선택된 고객 ID가 있을 경우에만 파라미터 추가
  if (selectedIds.length > 0) {
    selectedIds.forEach((id) => searchParams.append('id', id.toString()));
  }

  // 동적으로 생성된 URL
  const searchUrl =
    selectedIds.length > 0
      ? `pb/notifications/search?${searchParams.toString()}`
      : 'pb/notifications';

  const { data: filteredNotifications, error: filteredNotificationsError } =
    useFetch<TNotificationProps[]>(searchUrl);
  console.log(filteredNotificationsError);

  useEffect(() => {
    if (filteredNotifications) {
      setNotifications(filteredNotifications);
    }
  }, [filteredNotifications]);

  const openNewWindow = async (notificationId: number) => {
    try {
      const baseUrl = import.meta.env.VITE_API_KEY;
      const url = `${baseUrl}/pb/notifications/${notificationId}`;

      const response = await fetch(url,
      {
        credentials: 'include',  
      }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const notification = await response.json();

      const newWindow = window.open('', '_blank', 'width=800,height=600');

      if (newWindow) {
        const styles = Array.from(document.styleSheets)
          .map((styleSheet) => {
            try {
              return Array.from(styleSheet.cssRules)
                .map((rule) => rule.cssText)
                .join('');
            } catch (e) {
              console.warn('Failed to load some CSS rules:', e);
              return '';
            }
          })
          .join('');

        newWindow.document.write(`
        <html lang='en'>
          <head>
            <meta charset='UTF-8' />
            <meta name='viewport' content='width=device-width, initial-scale=1.0' />
            <title>쪽지 자세히 보기</title>
            <style>${styles}</style>
          </head>
          <body>
            <div id='dictionary-root'></div>
          </body>
        </html>
      `);
        newWindow.document.close();

        const rootElement =
          newWindow.document.getElementById('dictionary-root');
        if (rootElement) {
          const root = createRoot(rootElement);
          root.render(<NotificationDetailsWindow {...notification} />);
        }
      }
    } catch (error) {
      console.error('쪽지 상세 정보 조회 중 발생한 에러: ', error);
    }
  };

  return (
    <Section title='이전에 전송한 쪽지' layoutClassName='h-full'>
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
                  selectedCustomers.length === filteredCustomers.length &&
                  filteredCustomers.length > 0
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
                  onChange={handleSearchTermChange}
                  onFocus={() => setShowDropdown(true)}
                  className='w-full h-10 px-4 border-b border-gray-300 focus:outline-none'
                />

                {showDropdown && (
                  <div className='absolute z-10 w-full mt-1 bg-white/80 border border-gray-200 rounded-lg shadow-lg overflow-y-scroll'>
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

        {/* 쪽지 리스트 아이템 */}
        <div className='flex flex-col overflow-y-scroll px-4 flex-grow'>
          {notifications.length > 0 ? (
            notifications
              .filter((notification) =>
                customers.some((c) => c.id === notification.customerId)
              ) // customer가 존재하는지 필터링
              .map((notification: TNotificationProps) => {
                const customer = customers.find(
                  (c) => c.id === notification.customerId
                );

                return (
                  <IteratingListItem
                    key={notification.id}
                    id={notification.id}
                    title={`${customer!.name} 손님`}
                    content={notification.title}
                    onClick={() => openNewWindow(notification.id)}
                    date={notification.date}
                  />
                );
              })
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
