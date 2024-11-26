import { type TJournalsProps } from '../lib/types';

type TConsultationJournalListItemProps = {
  consultation: TJournalsProps & { pbName: string };
  index: number;
  openNewWindow: (consultation: TJournalsProps & { pbName: string }) => void;
};

export const ConsultationJournalListItem = ({
  consultation,
  index,
  openNewWindow,
}: TConsultationJournalListItemProps) => {
  return (
    <div
      onClick={() => openNewWindow(consultation)}
      className='bg-white rounded-lg p-4 mb-4 shadow-lg flex items-center border justify-around border-gray-200 cursor-pointer'
    >
      <div className='w-full flex items-center justify-between'>
        <div className='flex space-x-2 items-center'>
          <span className='text-hanaindigo font-bold mr-4'>{index + 1}</span>

          <div>
            <div className='font-bold truncate'>{consultation.content}</div>
            <span className='font-light'>{consultation.pbName} PB</span>
          </div>
        </div>

        <span className='font-light'>{consultation.date}</span>
      </div>
    </div>
  );
};
