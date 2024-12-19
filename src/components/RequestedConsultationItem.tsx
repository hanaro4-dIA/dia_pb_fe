import useFetch from '../hooks/useFetch';
import { type TConsultingProps } from '../types/dataTypes';
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
}: TConsultingProps) => {
  // 빠른 상담일 경우
  const getBorderColorClass = (categoryId: number) => {
    return categoryId === 1 ? 'quick-border' : 'border-gray-200';
  };

  const { data, error, fetchData } = useFetch(`pb/reserves?id=${id}`, 'PUT');

  const approveRequestEvent = async () => {
    try {
      if (fetchData) {
        await fetchData();
        console.log('상담 요청이 승인되었습니다.', data);
        window.location.reload();
      }
    } catch (err) {
      console.error('API 호출 실패:', error);
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
            className='w-[6rem] h-[2rem] text-white text-[1rem] rounded-lg bg-hanaindigo hover:bg-hanagold'
          >
            승인대기
          </button>
        </div>
      </div>
    </article>
  );
};
