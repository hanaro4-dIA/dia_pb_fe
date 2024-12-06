import { MdOutlineTimer } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { type TConsultingProps } from '../types/dataTypes';
import Timer from '../utils/remainingTime-util';

export const UpcomingConsultationItem = ({
  id,
  customer_id,
  title,
  hope_date,
  hope_time,
}: TConsultingProps) => {
  // 빠른 상담일 경우
  const getBorderColorClass = (title: string) => {
    return title === '빠른 상담 요청' ? 'quick-border' : 'border-gray-200';
  };

  const navigate = useNavigate();

  const handleConsultationClick = (consultingId: number) => {
    navigate(`/consulting/${consultingId}`);
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 mb-4 border ${getBorderColorClass(title)} shadow-lg`}
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
            {title || '빠른 상담 요청'}
          </span>
        </div>

        <span className='flex justify-center items-center gap-1'>
          {title === '빠른 상담 요청' && (
            <MdOutlineTimer className='text-hanared' />
          )}{' '}
          {title === '빠른 상담 요청' && (
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
