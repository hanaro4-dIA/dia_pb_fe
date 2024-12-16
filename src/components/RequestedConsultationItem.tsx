import { type TConsultingProps } from '../types/dataTypes';

type ConsultationRequestItemProps = TConsultingProps & {
  onApprove: (id: number) => void;
};

export const RequestedConsultationItem = ({
  id,
  customer_id,
  category_id,
  title,
  hope_date,
  hope_time,
  reserve_date,
  approve,
  onApprove,
}: ConsultationRequestItemProps) => {
  // 빠른 상담일 경우
  const getBorderColorClass = (category_id: number) => {
    return category_id === 1 ? 'quick-border' : 'border-gray-200';
  };

  return (
    <article className='w-full flex flex-col justify-end mb-4 items-start'>
      <small className='ml-2' style={{ fontFamily: 'noto-light, sans-serif' }}>
        {reserve_date}
      </small>
      <div
        className={`bg-white rounded-lg border ${getBorderColorClass(category_id)} p-4 shadow-lg w-full`}
      >
        <div className='flex justify-between items-center'>
          <div className='flex flex-col w-[70%]'>
            <span className='w-[95%] text-[1rem] truncate'>
              {customer_id} 손님
            </span>
            <span
              className='w-[95%] truncate'
              style={{ fontFamily: 'noto-bold, sans-serif' }}
              title={title}
            >
              {category_id === 1 ? '빠른 상담 요청' : title}
            </span>
            <span className='text-[0.8rem] flex space-x-2'>
              <span>요청일: </span>
              <span style={{ fontFamily: 'noto-bold, sans-serif' }}>
                {hope_date} {hope_time}
              </span>
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
