import { MdOutlineTimer } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { type TRequestedConsultationsProps } from '../types/dataTypes';
import Timer from '../utils/remainingTime-util';

export const UpcomingConsultationItem = ({
  name,
  title,
  customer_id,
  hopeDay,
  hopeTime,
  quick,
}: TRequestedConsultationsProps) => {
  const getBorderColorClass = (quick: boolean) => {
    return quick ? 'quick-border' : 'border-gray-200';
  };
  const navigate = useNavigate();

  const handleConsultationClick = (consultationId: number) => {
    navigate(`/consulting/${consultationId}`);
  };

  return (
    <div
      className={`bg-white rounded-lg p-4 mb-4 border ${getBorderColorClass(quick)} shadow-lg`}
    >
      <div className='flex justify-between text-black text-[1rem] font-light'>
        <span>{name} 손님</span>
        <span>
          {hopeDay} {hopeTime}
        </span>
      </div>
      <div className='flex justify-between text-black text-[1rem] font-extrabold truncate mt-2'>
        {title || '빠른 상담 요청'}
        <span className='flex justify-center items-center gap-1'>
          {quick && <MdOutlineTimer className='text-hanared' />}{' '}
          {quick && <Timer hopeDay={hopeDay} hopeTime={hopeTime} />}{' '}
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
