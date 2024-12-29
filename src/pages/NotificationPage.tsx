import NotificationHistory from '../containers/NotificationHistory';
import WriteNotification from '../containers/WriteNotification';

export default function NotificationPage() {
  return (
    <>
      <div className='flex w-screen h-screen p-5 space-x-5'>
        <div className='w-1/3 h-full'>
          <NotificationHistory />
        </div>

        <div className='w-2/3 h-full'>
          <WriteNotification />
        </div>
      </div>
    </>
  );
}
