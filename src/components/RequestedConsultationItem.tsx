import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { type TConsultationProps } from '../types/dataTypes';
import changeDateFormat from '../utils/changeDateFormat-util';

export const RequestedConsultationItem = ({
  id,
  customerName,
  categoryId,
  title,
  hopeDate,
  hopeTime,
  reserveDate,
  reserveTime,
  onApprove, // 부모 컴포넌트로 상태 변경 알리기
}: TConsultationProps & { onApprove: (id: string) => void }) => {
  // 상태 관리: 로딩 상태와 에러 메시지
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 빠른 상담일 경우
  const getBorderColorClass = (categoryId: number) => {
    return categoryId === 1 ? 'quick-border' : 'border-gray-200';
  };

  const { error, fetchData } = useFetch(`pb/reserves?id=${id}`, 'PUT');
  console.log('들어온 상담요청 승인 중 발생한 에러: ', error);

  const approveRequestEvent = async () => {
    setLoading(true);
    setErrorMessage(null);

    try {
      await fetchData();
      onApprove(String(id));
    } catch (err) {
      setErrorMessage(
        '상담 요청 처리 중 문제가 발생했습니다. 다시 시도해주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className='w-full flex flex-col justify-end mb-4 items-start'>
      <small className='ml-2' style={{ fontFamily: 'noto-light, sans-serif' }}>
        {changeDateFormat(reserveDate)} {reserveTime}
      </small>
      <div
        className={`bg-white rounded-lg border ${getBorderColorClass(categoryId)} p-4 shadow-lg w-full`}
      >
        <div className='flex justify-between items-center'>
          <div className='flex flex-col w-[70%]'>
            <span className='w-[95%] text-[1rem] truncate'>
              {customerName} 손님
            </span>
            <span
              className='w-[95%] truncate'
              style={{ fontFamily: 'noto-bold, sans-serif' }}
              title={title}
            >
              {categoryId === 1 ? '빠른 상담 요청' : title}
            </span>
            <span className='text-[0.8rem] flex space-x-2'>
              <span>희망일: </span>
              <span style={{ fontFamily: 'noto-bold, sans-serif' }}>
                {changeDateFormat(hopeDate)} {hopeTime}
              </span>
            </span>
          </div>
          <button
            onClick={approveRequestEvent}
            disabled={loading} // 로딩 중에는 버튼 비활성화
            className={`w-[6rem] h-[2rem] text-white text-[1rem] rounded-lg ${loading ? 'bg-gray-400' : 'bg-hanaindigo hover:bg-hanagold'}`}
          >
            {loading ? '처리 중...' : '승인대기'}
          </button>
        </div>
      </div>
      {errorMessage && (
        <div className='text-red-500 text-sm mt-2'>{errorMessage}</div>
      )}
    </article>
  );
};
