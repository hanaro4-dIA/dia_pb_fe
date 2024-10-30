import { MdOutlineModeEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { type TCustomersProps } from '../lib/types';
import { type TCustomerPbProps } from '../lib/types';

type TCustomerInformationProps = {
  customerId: number;
  className?: string; 
};

export default function CustomerInformation({
  customerId,
}: TCustomerInformationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [customerData, setCustomerData] = useState<TCustomersProps | null>(null);
  const [memo, setMemo] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  const [meetDate, setMeetDate] = useState<string>('');

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await fetch('/data/Customers.json');
        const data: TCustomersProps[] = await response.json();
        const customer = data.find((c) => c.id === customerId);
        setCustomerData(customer!); // Non-null assertion because data is guaranteed
      } catch (error) {
        alert('Error fetching customer data:');
      }
    };

    const fetchMemoData = async () => {
      try {
        const response = await fetch('/data/Customer_PB.json');
        const data: TCustomerPbProps[] = await response.json();
        const customerMemo = data.find((c) => c.customer_id === customerId);
        if (customerMemo) {
          setMemo(customerMemo.memo);
          setCount(customerMemo.count);
          setMeetDate(customerMemo.date);
        } else {
          setMemo('메모 없음');
          setCount(0);
          setMeetDate('정보 없음');
        }
      } catch (error) {
        alert('Error fetching memo data:');
      }
    };

    fetchCustomerData();
    fetchMemoData();
  }, [customerId]);

  return (
    <div className='flex flex-col bg-white'>
      <div className='bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 pl-5 rounded-t-lg'>
        {customerData?.name} 손님 정보
      </div>

      {customerData ? (
        <div className='p-2 border-x border-b border-gray-200'>
          <div className='bg-white rounded-lg p-2 mb-2 shadow-lg border border-gray-200'>
            <div className='flex items-center px-3 justify-between text-black text-[1rem] font-light'>
              <span className='text-sm'>손님과 만난 날짜</span>
              <span className='text-sm'>{meetDate}</span>
            </div>
          </div>

          <div className='bg-white rounded-lg p-2 mb-2 shadow-lg border border-gray-200'>
            <div className='flex items-center px-3 justify-between text-black text-[1rem] font-light'>
              <span className='text-sm'>최근 상담 날짜</span>
              <span className='text-sm'>정보 없음</span>
            </div>
          </div>

          <div className='bg-white rounded-lg p-2 mb-2 shadow-lg border border-gray-200'>
            <div className='flex items-center px-3 justify-between text-black text-[1rem] font-light'>
              <span className='text-sm'>상담 횟수</span>
              <span className='text-sm'>{count}</span>
            </div>
          </div>

          <div className='bg-white rounded-lg p-1 shadow-lg border border-gray-200'>
            <div className='flex items-center px-3 justify-between text-black text-[1rem] font-light'>
              <span className='text-sm'>메모</span>
              {isEditing ? (
                <span className='flex items-center space-x-2'>
                  <button
                    onClick={handleSaveClick}
                    className='bg-green-400 text-sm text-white rounded-lg px-2 py-1'
                  >
                    저장
                  </button>
                  <button
                    onClick={handleCancelClick}
                    className='bg-red-400 text-sm text-white rounded-lg px-2 py-1'
                  >
                    취소
                  </button>
                </span>
              ) : (
                <button
                  className='m-1 text-xl text-red-500 font-bold'
                  onClick={handleEditClick}
                >
                  <MdOutlineModeEdit />
                </button>
              )}
            </div>

            {/* 메모 내용 */}
            <div className='bg-white rounded-xl p-1 mt-1'>
              {isEditing ? (
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className='flex items-center w-full h-8 rounded resize-none border outline-none px-2'
                  maxLength={50}
                />
              ) : (
                <div className='px-2 py-1 overflow-y-auto'>{memo}</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center text-hanaindigo p-4 text-xl'>
          손님을 선택해주세요.
        </div>
      )}
    </div>
  );
}
