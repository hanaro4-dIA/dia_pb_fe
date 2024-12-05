import { MdOutlineModeEdit } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Section from '../components/Section';
import { type TCustomerProps } from '../types/dataTypes';

// import { type TCustomerPbProps } from '../types/dataTypes';

type TCustomerInformationProps = {
  customerId: number;
  className?: string;
};

export default function CustomerInformation({
  customerId,
}: TCustomerInformationProps) {
  const paramsId = useParams().id;
  const [isEditing, setIsEditing] = useState(false);
  const [customerData, setCustomerData] = useState<TCustomerProps | null>(null);
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
        const data: TCustomerProps[] = await response.json();
        const customer = data.find((c) => c.id === customerId);
        setCustomerData(customer!);
        console.log('손님정보>>>>>>>>>', customerData);
      } catch (error) {
        console.error('Error fetching customer data:');
      }
    };

    const fetchMemoData = async () => {
      try {
        const response = await fetch('/data/Customer.json');
        const data: TCustomerProps[] = await response.json();
        const customerMemo = data.find((c) => c.id === customerId);
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
        console.error('Error fetching memo data: ', error);
      }
    };

    fetchCustomerData();
    fetchMemoData();
  }, [customerId]);

  return (
    <Section title={`${customerData?.name} 손님 정보`} arrowToggle={true}>
      <div className='w-full h-fit p-4'>
        {customerData ? (
          <>
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
          </>
        ) : (
          <div className='text-center text-hanaindigo p-4 text-xl'>
            손님을 선택해주세요.
          </div>
        )}
      </div>
    </Section>
  );
}
