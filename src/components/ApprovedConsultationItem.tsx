import { MdOutlineTimer } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { type TConsultationProps } from '../types/dataTypes';
import changeDateFormat from '../utils/changeDateFormat-util';
import Timer from '../utils/remainingTime-util';

export const ApprovedConsultationItem = ({
  id,
  customerId,
  customerName,
  categoryId,
  title,
  hopeDate,
  hopeTime,
}: TConsultationProps) => {
  // 빠른 상담일 경우
  const getBorderColorClass = (categoryId: number) => {
    return categoryId === 1 ? 'quick-border' : 'border-gray-200';
  };

  const navigate = useNavigate();

  const moveToConsultingPageEvent = (id: number, customerId: number) => {
    navigate(`/consulting/${id}`, {
      state: { customerId },
    });
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 mb-4 border ${getBorderColorClass(categoryId)} shadow-lg`}
    >
      <div
        className='flex justify-between text-[1rem]'
        style={{ fontFamily: 'noto-light, sans-serif' }}
      >
        <span>{customerName} 손님</span>
        <span>
          {changeDateFormat(hopeDate)} {hopeTime}
        </span>
      </div>

      <div className='flex justify-between text-[1rem] font-extrabold w-full mt-2'>
        <div className='w-2/3 flex items-center'>
          <span className='w-full truncate' title={title}>
            {categoryId === 1 ? '빠른 상담 요청' : title}
          </span>
        </div>

        <span className='flex justify-center items-center gap-1'>
          {categoryId === 1 && <MdOutlineTimer className='text-hanared' />}{' '}
          {categoryId === 1 && (
            <Timer hope_date={hopeDate} hope_time={hopeTime} />
          )}{' '}
        </span>
        <button
          className='border border-hanaindigo rounded-md px-1 text-[0.8rem] text-white bg-hanadeepgreen'
          onClick={() => moveToConsultingPageEvent(id, customerId)}
        >
          상담하기
        </button>
      </div>
    </div>
  );
};

//
