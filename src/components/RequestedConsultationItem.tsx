import { type TConsultingProps } from '../types/dataTypes';

type ConsultationRequestItemProps = TConsultingProps & {
  onApprove: (id: number) => void;
};

export const RequestedConsultationItem = ({
  id,
  customer_id,
  title,
  hope_date,
  hope_time,
  reserve_date,
  approve,
  onApprove,
}: ConsultationRequestItemProps) => {
  // 빠른 상담일 경우
  const getBorderColorClass = (title: string) => {
    return title === '빠른 상담 요청' ? 'quick-border' : 'border-gray-200';
  };

  return (
    <article className='w-full flex flex-col justify-end mb-4 items-start'>
      <small className='ml-2'>{reserve_date}</small>
      <div
        className={`bg-white rounded-lg border ${getBorderColorClass(title)} p-4 shadow-lg w-full`}
      >
        <div className='flex justify-between items-center'>
          <div className='flex flex-col w-[70%]'>
            <span className='w-[95%] text-[1rem] font-bold truncate'>
              {customer_id} 손님
            </span>
            <span className='w-[95%] font-bold truncate'>
              {title || '빠른 상담 요청'}
            </span>
            <span className='text-[0.8rem] font-bold'>
              요청일: {hope_date} {hope_time}
            </span>
          </div>
          <button
            className='w-[6rem] h-[2rem] text-white text-[1rem] rounded-lg bg-hanaindigo hover:bg-hanagold'
            onClick={() => onApprove(id)}
          >
            {!approve && '승인대기'}
          </button>
        </div>
      </div>
    </article>
  );
};
