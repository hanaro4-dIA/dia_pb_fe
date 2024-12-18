import { MdOutlineTimer } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { type TConsultingProps } from '../types/dataTypes';
import Timer from '../utils/remainingTime-util';

export const ApprovedConsultationItem = ({
  id,
  customer_id,
  category_id,
  title,
  hope_date,
  hope_time,
}: TConsultingProps) => {
  // 빠른 상담일 경우
  const getBorderColorClass = (category_id: number) => {
    return category_id === 1 ? 'quick-border' : 'border-gray-200';
  };

  const navigate = useNavigate();

  const handleConsultationClick = (consultingId: number) => {
    navigate(`/consulting/${consultingId}`);
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 mb-4 border ${getBorderColorClass(category_id)} shadow-lg`}
    >
      <div
        className='flex justify-between text-[1rem]'
        style={{ fontFamily: 'noto-light, sans-serif' }}
      >
        <span>{customer_id} 손님</span>
        <span>
          {hope_date} {hope_time}
        </span>
      </div>

      <div className='flex justify-between text-[1rem] font-extrabold w-full mt-2'>
        <div className='w-2/3 flex items-center'>
          <span className='w-full truncate' title={title}>
            {category_id === 1 ? '빠른 상담 요청' : title}
          </span>
        </div>

        <span className='flex justify-center items-center gap-1'>
          {category_id === 1 && <MdOutlineTimer className='text-hanared' />}{' '}
          {category_id === 1 && (
            <Timer hope_date={hope_date} hope_time={hope_time} />
          )}{' '}
        </span>
        <button
          className='border border-hanaindigo rounded-md px-1 text-[0.8rem] text-white bg-hanadeepgreen'
          onClick={() => handleConsultationClick(id)}
        >
          상담하기
        </button>
      </div>
    </div>
  );
};
