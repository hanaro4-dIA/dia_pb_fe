import { type TNotificationProps } from '../types/dataTypes';

export default function NotificationDetailsWindow({
  title,
  customer_id,
  date,
  content,
}: TNotificationProps) {
  return (
    <div className='flex flex-col border shadow-lg border-gray-200 w-full h-full rounded-t-lg'>
      <div className='bg-hanaindigo text-white text-[1.3rem] font-extrabold p-3 rounded-t-lg pl-5'>
        쪽지 자세히 보기
      </div>

      <div className='p-3 border h-full flex flex-col justify-between'>
        <div className='flex flex-col h-[90%] space-y-3 mb-2'>
          {/* 쪽지 내용 관련 데이터 */}
          <>
            <div className='flex  items-center border-b border-black py-1'>
              <label className='flex mr-1 text-xs'>[쪽지제목]</label>
              <div className='flex justify-between items-center text-sm font-bold w-[84%] pl-2 focus:outline-none rounded-xl'>
                <span className=''>{title}</span>
              </div>
            </div>
            <div className='flex justify-start items-center border-b border-black py-1 space-x-2'>
              <div className='flex items-center w-1/2'>
                <label className='flex mr-1 text-xs'>[수신인]</label>
                <div className='text-sm font-bold w-2/3 px-2 focus:outline-none rounded-xl'>
                  {customer_id}
                </div>
              </div>
              <div className='flex items-center w-1/2'>
                <label className='flex mr-1 text-xs '>[발송일시]</label>
                <div className='text-sm font-bold w-2/3 px-2 focus:outline-none rounded-xl'>
                  {date}
                </div>
              </div>
            </div>
          </>

          {/* 쪽지 내용 */}
          <div className='flex flex-col h-full'>
            <span className='text-xs mb-2'>[쪽지 내용]</span>
            <textarea
              value={content}
              className='w-full h-full p-5 border resize-none overflow-y-auto focuse:outline-none'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
