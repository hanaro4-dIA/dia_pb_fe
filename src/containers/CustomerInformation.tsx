import { MdOutlineModeEdit } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Section from '../components/Section';
import useFetch from '../hooks/useFetch';
import { TCustomerProps } from '../types/dataTypes';
import changeDateFormat from '../utils/changeDateFormat-util';

export default function CustomerInformation({
  customerData,
}: {
  customerData: TCustomerProps | null;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [memoData, setMemoData] = useState<string>(customerData?.memo || '');

  const { fetchData } = useFetch<string>(
    `pb/customers/${customerData?.id}/memo`,
    'POST'
  );

  useEffect(() => {
    if (customerData) {
      setMemoData(customerData.memo || '');
    }
  }, [customerData]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    if (customerData) {
      try {
        await fetchData({ memo: memoData });
        setIsEditing(false);
      } catch (error) {
        console.error('메모 수정 중 발생한 에러: ', error);
      }
    }
  };

  const handleCancelClick = () => {
    setMemoData(customerData?.memo || '');
    setIsEditing(false);
  };

  return (
    <Section
      title={`${customerData?.name} 손님 정보`}
      arrowToggle={true}
      layoutClassName='h-full'
    >
      <div className='w-full h-fit p-4'>
        <div className='bg-white rounded-lg p-2 mb-2 shadow-lg border border-gray-200'>
          <div className='flex items-center px-3 justify-between text-[1rem]'>
            <span className='text-sm'>손님과 처음 만난 날짜</span>
            <span className='text-sm'>
              {changeDateFormat(customerData?.date || '')}
            </span>
          </div>
        </div>

        <div className='bg-white rounded-lg p-2 mb-2 shadow-lg border border-gray-200'>
          <div className='flex items-center px-3 justify-between text-[1rem]'>
            <span className='text-sm'>상담 횟수</span>
            <span className='text-sm'>{customerData?.count}</span>
          </div>
        </div>

        <div className='bg-white rounded-lg p-1 shadow-lg border border-gray-200'>
          <div className='flex items-center px-3 justify-between text-[1rem]'>
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
                className='m-1 text-xl text-red-500'
                onClick={handleEditClick}
              >
                <MdOutlineModeEdit />
              </button>
            )}
          </div>

          <div className='bg-white rounded-xl p-1 mt-1'>
            {isEditing ? (
              <textarea
                defaultValue={memoData}
                onChange={(e) => setMemoData(e.target.value)}
                className='w-full h-8 rounded resize-none border outline-none px-2'
                maxLength={50}
              />
            ) : (
              <div className='px-2 py-1'>{memoData}</div>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
