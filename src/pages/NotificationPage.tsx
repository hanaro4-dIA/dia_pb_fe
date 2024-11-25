import NotiHistory from '../containers/NotiHistory';
import WriteNoti from '../containers/WriteNoti';

export default function NotificationPage() {
  return (
    <>
      <div className='flex flex-row justify-between w-full h-screen p-5 space-x-10'>
        <section className='w-4/12 h-full'>
          <NotiHistory />
        </section>
        <section className='w-8/12 h-full'>
          <WriteNoti />
        </section>
      </div>
    </>
  );
}
