import { MdOutlineModeEdit } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Section from '../components/Section';
import useFetch from '../hooks/useFetch';
import { type TCustomerProps } from '../types/dataTypes';
import changeDateFormat from '../utils/changeDateFormat-util';

export default function CustomerInformation() {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [memo, setMemo] = useState<string>('');

  const { data, error } = useFetch<TCustomerProps>(`pb/customers/list/${id}`);
  const [customerData, setCustomerData] = useState<TCustomerProps | null>(null);

  useEffect(() => {
    setCustomerData(data);
  }, []);
  console.error(error);

  // 메모 수정 API 호출
  const { fetchData } = useFetch<string>(`pb/customers/${id}/memo`, 'POST');

  useEffect(() => {
    setCustomerData(data);
    if (data) {
      setMemo(data.memo || '');
    }
  }, [data]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 메모 저장하기
  const handleSaveClick = async () => {
    if (customerData) {
      try {
        await fetchData({ memo });
        setCustomerData({ ...customerData, memo });
        setIsEditing(false);
      } catch (error) {
        console.error('메모 수정 중 오류가 발생했습니다.', error);
      }
    }
  };

  // 메모 취소 버튼
  const handleCancelClick = () => {
    setMemo(customerData?.memo || '');
    setIsEditing(false);
  };

  return (
    <Section
      title={`${customerData?.name} 손님 정보`}
      arrowToggle={true}
      layoutClassName='h-full'
    >
      <div className='w-full h-fit p-4'>
        {customerData ? (
          <>
            <div className='bg-white rounded-lg p-2 mb-2 shadow-lg border border-gray-200'>
              <div
                className='flex items-center px-3 justify-between text-[1rem]'
                style={{ fontFamily: 'noto-light, sans-serif' }}
              >
                <span className='text-sm'>손님과 처음 만난 날짜</span>
                <span className='text-sm'>
                  {changeDateFormat(customerData.date)}
                </span>
              </div>
            </div>
            <div className='bg-white rounded-lg p-2 mb-2 shadow-lg border border-gray-200'>
              <div
                className='flex items-center px-3 justify-between text-[1rem]'
                style={{ fontFamily: 'noto-light, sans-serif' }}
              >
                <span className='text-sm'>상담 횟수</span>
                <span className='text-sm'>{customerData.count}</span>
              </div>
            </div>

            <div className='bg-white rounded-lg p-1 shadow-lg border border-gray-200'>
              <div
                className='flex items-center px-3 justify-between text-[1rem]'
                style={{ fontFamily: 'noto-light, sans-serif' }}
              >
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

              {/* 메모 내용 */}
              <div className='bg-white rounded-xl p-1 mt-1'>
                {isEditing ? (
                  <textarea
                    defaultValue={customerData.memo}
                    onChange={(e) => setMemo(e.target.value)}
                    className='flex items-center w-full h-8 rounded resize-none border outline-none px-2'
                    maxLength={50}
                  />
                ) : (
                  <div className='px-2 py-1 overflow-y-auto'>
                    {customerData?.memo}
                  </div>
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
