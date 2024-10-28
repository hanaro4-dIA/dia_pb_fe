//pnpm i date-fns
import { format } from 'date-fns';
//pnpm i lucide-react
import { ChevronDown, ChevronUp } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import React from 'react';

type DateTile = Date | null;

type SelectedDate = DateTile | [DateTile, DateTile];

//CR : ConsultingReservation
type CR = {
  customerName: string;
  crDate: string;
  crTime: string;
  category: string;
  title: string;
  inquiryDetails: string | null;
};

export default function PbCalendar() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [dateModal, setDateModal] = useState(false);
  const [schedule, setSchedule] = useState<CR[]>([]);
  const [accordian, setAccordian] = useState<number | null>(null);

  const cr: CR[] = [
    {
      customerName: '장원영',
      crDate: '2024-10-24',
      crTime: '13:00',
      category: '부동산',
      title: 'AK프라자 부동산 건 상담요청합니다.',
      inquiryDetails:
        'We&apos;re not always in the position that we want to be at.',
    },
    {
      customerName: '레이',
      crDate: '2024-10-24',
      crTime: '15:00',
      category: '상속',
      title: 'AK프라자 부동산 건 상담요청합니다.',
      inquiryDetails: '어쩌구 저쩌구 어쩌구 저쩌구',
    },
    {
      customerName: '이서',
      crDate: '2024-10-25',
      crTime: '10:00',
      category: '투자',
      title: 'AK프라자 부동산 건 상담요청합니다.',
      inquiryDetails: '어쩌구 저쩌구 어쩌구 저쩌구',
    },
  ];
  const getScheduledDate = (date: Date) => {
    const scheduledDate = format(date, 'yyyy-MM-dd');
    const hasEvent = cr.some((cr) => cr.crDate === scheduledDate);
    return hasEvent ? <div className='dot'></div> : null;
  };

  const clickScheduledDate = (date: Date) => {
    const scheduledDate = format(date, 'yyyy-MM-dd');
    const schedule = cr.filter((cr) => cr.crDate === scheduledDate);
    setSchedule(schedule);
    setDateModal(true);
  };

  const handleAccordian = (index: number) => {
    setAccordian((prev) => (prev === index ? null : index));
  };

  return (
    <div className='w-96 h-92 ml-5 mt-5 rounded-lg shadow-lg overflow-hidden'>
      <div className='bg-[#3B4259] flex justify-between items-center text-2xl text-[#f2f4f6] font-bold py-2 px-4 rounded-t-lg'>
        캘린더
      </div>

      <Calendar
        onChange={setSelectedDate}
        onClickDay={clickScheduledDate}
        formatDay={(locale, date) => format(date, 'dd')}
        tileContent={({ date }) => getScheduledDate(date)}
        value={selectedDate}
        className='rounded-lg  border border-gray-300 ml-10 mb-3 mt-3'
      />

      {dateModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-5 rounded-lg shadow-lg relative w-3/5'>
            <button
              onClick={() => setDateModal(false)}
              className=' text-[#f87171] text-xl absolute top-2 right-2 leading-none p-1'
            >
              x
            </button>

            <h2 className='text-lg font-bold mb-4 text-center'>
              {format(selectedDate as Date, 'MM월 dd일')} 상담 일정
            </h2>

            {schedule.length > 0 ? (
              <table className='w-full border-collapse'>
                <thead>
                  <tr className='border-b'>
                    <th>시간</th>
                    <th>손님</th>
                    <th>카테고리</th>
                    <th>제목</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((schedule, index) => (
                    <React.Fragment key={index}>
                      <tr
                        className='border-b cursor-pointer'
                        onClick={() => handleAccordian(index)}
                      >
                        <td className='p-2'>{schedule.crTime}</td>
                        <td className='p-2 text-center'>
                          {schedule.customerName}
                        </td>
                        <td className='p-2 text-center'>{schedule.category}</td>
                        <td className='p-2'>{schedule.title}</td>
                        <td className='p-2'>
                          {accordian === index ? (
                            <ChevronUp color='#f87171' size={16} />
                          ) : (
                            <ChevronDown color='#f87171' size={16} />
                          )}
                        </td>
                      </tr>
                      {accordian === index && (
                        <tr>
                          <td colSpan={5} className='p-2 bg-gray-100'>
                            <p>{schedule.inquiryDetails}</p>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>예정된 상담 일정이 없습니다.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
