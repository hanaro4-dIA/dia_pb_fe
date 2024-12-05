import { MdOutlineTimer } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { type TConsultingProps } from '../types/dataTypes';
import Timer from '../utils/remainingTime-util';

export const UpcomingConsultationItem = ({
  customer_id,
  title,
  hope_date,
  hope_time,
}: TConsultingProps) => {
  // 빠른 상담일 경우
  const getBorderColorClass = (title: string) => {
    return title === '' ? 'quick-border' : 'border-gray-200';
  };

  const navigate = useNavigate();

  const handleConsultationClick = (consultationId: number) => {
    navigate(`/consulting/${consultationId}`);
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 mb-4 border ${getBorderColorClass(title)} shadow-lg`}
    >
      <div className='flex justify-between text-black text-[1rem] font-light'>
        <span>{customer_id} 손님</span>
        <span>
          {hope_date} {hope_time}
        </span>
      </div>
      <div className='flex justify-between text-black text-[1rem] font-extrabold truncate mt-2'>
        {title || '빠른 상담 요청'}
        <span className='flex justify-center items-center gap-1'>
          {title === '' && <MdOutlineTimer className='text-hanared' />}{' '}
          {title === '' && <Timer hopeDay={hope_date} hopeTime={hope_time} />}{' '}
        </span>
        <button
          className='border border-hanaindigo rounded-md px-1 text-[0.8rem] text-white bg-hanadeepgreen'
          onClick={() => handleConsultationClick(customer_id)}
        >
          상담하기
        </button>
      </div>
    </div>
  );
};
