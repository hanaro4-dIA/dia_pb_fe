// // 😭😭😭😭😭😭😭😭한 손님이 여러명의 pb와 상담을 한 일지가 나오게끔 수정을 해야해여!
import { useEffect, useState } from 'react';

type Customer = {
  id: number;
  name: string;
  sex: string;
};

type CustomerPB = {
  id: number;
  customer_id: number;
  date: string;
  count: number;
  memo: string;
};

type CustomerInformationProps = {
  customerId: number | null;
  className?: string; // 추가된 className prop
};

export default function CustomerInformation({
  customerId,
}: CustomerInformationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const [memo, setMemo] = useState<string>('');
  const [count, setCount] = useState<number | null>(null);
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
        const response = await fetch('../../public/data/Customer.json');
        const data = await response.json();
        const customer = data.find((c: Customer) => c.id === customerId);
        setCustomerData(customer || null);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    const fetchMemoData = async () => {
      try {
        const response = await fetch('../../public/data/Customer_PB.json');
        const data = await response.json();
        const customerMemo = data.find(
          (c: CustomerPB) => c.customer_id === customerId
        );
        if (customerMemo) {
          setMemo(customerMemo.memo);
          setCount(customerMemo.count);
          setMeetDate(customerMemo.date);
        } else {
          setMemo('메모 없음');
          setCount(null);
          setMeetDate('');
        }
      } catch (error) {
        console.error('Error fetching memo data:', error);
      }
    };

    fetchCustomerData();
    fetchMemoData();
  }, [customerId]);

  return (
    <div className='flex flex-col bg-white rounded-lg shadow-lg border-gray-200 h-[300px]'>
      <div className='bg-hanaindigo text-[#fff] text-[1.3rem] font-extrabold p-3 pl-5 rounded-t-lg'>
        {customerData?.name} 손님 정보
      </div>

      {customerData ? (
        <div className='p-2'>
          <div className='bg-[#fff] rounded-lg p-2 mb-2 shadow-lg border border-gray-200'>
            <div className='flex items-center px-3 justify-between text-black text-[1rem] font-light'>
              <span className='text-sm'>손님과 만난 날짜</span>
              <span className='text-sm'>{meetDate || '정보 없음'}</span>
            </div>
          </div>

          <div className='bg-[#fff] rounded-lg p-2 mb-2 shadow-lg border border-gray-200'>
            <div className='flex items-center px-3 justify-between text-black text-[1rem] font-light'>
              <span className='text-sm'>최근 상담 날짜</span>
              <span className='text-sm'>정보 없음</span>
            </div>
          </div>

          <div className='bg-[#fff] rounded-lg p-2 mb-2 shadow-lg border border-gray-200'>
            <div className='flex items-center px-3 justify-between text-black text-[1rem] font-light'>
              <span className='text-sm'>상담 횟수</span>
              <span className='text-sm'>
                {count !== null ? count : '정보 없음'}
              </span>
            </div>
          </div>

          <div className='bg-[#fff] rounded-lg p-1 mb-2 shadow-lg border border-gray-200'>
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
                  className='m-1 text-sm text-red-500 font-bold'
                  onClick={handleEditClick}
                >
                  EDIT
                </button>
              )}
            </div>

            <div className='bg-white rounded-xl p-1 mt-1'>
              {isEditing ? (
                <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className='w-full rounded h-[30px] resize-none border outline-none px-2 py-1'
                  maxLength={200}
                />
              ) : (
                <div className='px-2 py-1 h-[30px] overflow-y-auto'>{memo}</div>
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
