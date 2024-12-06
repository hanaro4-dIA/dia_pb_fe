import { type TJournalsProps } from '../types/dataTypes';

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
        <div className='w-2/3 flex justify-between items-center'>
          <span className='text-hanaindigo mr-4'>{index + 1}</span>

          <div className='w-[80%] flex flex-col justify-between'>
            <div
              className='truncate'
              title={consultation.content}
              style={{ fontFamily: 'noto-bold, sans-serif' }}
            >
              {consultation.content}
            </div>
            <span style={{ fontFamily: 'noto-light, sans-serif' }}>
              {consultation.pbName} PB
            </span>
          </div>
        </div>

        <span
          className='w-1/3 flex justify-end items-center'
          style={{ fontFamily: 'noto-light, sans-serif' }}
        >
          {consultation.date}
        </span>
      </div>
    </div>
  );
};
