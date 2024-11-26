import { TRequestedConsultationsProps } from '../lib/types';

type ConsultationRequestItemProps = TRequestedConsultationsProps & {
  onApprove: (id: number) => void;
};

export const RequestedConsultaionItem = ({
  id,
  name,
  title,
  hopeDay,
  hopeTime,
  requestDay,
  approvalStatus,
  quick,
  onApprove,
} :ConsultationRequestItemProps ) => {
  const getBorderColorClass = (quick: boolean) => {
    return quick ? 'quick-border' : 'border-gray-200';
  };

  return (
    <article className='w-full flex flex-col justify-end mb-4 items-start'>
      <small className='ml-2'>{requestDay}</small>
      <div
        className={`bg-white rounded-lg border ${getBorderColorClass(quick)} p-4 shadow-lg w-full`}
      >
        <div className='flex justify-between items-center'>
          <div className='flex flex-col w-[70%]'>
            <span className='w-[95%] text-[1rem] font-bold truncate'>
              {name} 손님
            </span>
            <span className='w-[95%] font-bold truncate'>{title || "빠른 상담 요청"}</span>
            <span className='text-[0.8rem] font-bold'>
              요청일: {hopeDay} {hopeTime}
            </span>
          </div>
          <button
            className='w-[6rem] h-[2rem] text-white text-[1rem] rounded-lg bg-hanaindigo hover:bg-hanagold'
            onClick={() => onApprove(id)}
          >
            {!approvalStatus && '승인대기'}
          </button>
        </div>
      </div>
    </article>
  );
};