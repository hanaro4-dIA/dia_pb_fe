import NotiHistory from '../components/NotiHistory';
import WriteNoti from '../components/WriteNoti';

export default function NotificationPage() {
  return (
    <>
      <div className='flex flex-row justify-between w-full h-screen p-5 space-x-10'>
        <section className='w-1/4 h-full'>
          <NotiHistory />
        </section>
        <section className='w-3/4 h-full'>
          <WriteNoti />
        </section>
      </div>
    </>
  );
}
