import NotiHistory from '../containers/NotiHistory';
import WriteNoti from '../containers/WriteNoti';

export default function NotificationPage() {
  return (
    <>
      <div className='flex w-screen h-screen p-5 space-x-5'>
        <div className='w-1/3 h-full'>
          <NotiHistory />
        </div>

        <div className='w-2/3 h-full'>
          <WriteNoti />
        </div>
      </div>
    </>
  );
}
