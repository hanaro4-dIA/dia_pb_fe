//pnpm i date-fns
import { format } from 'date-fns';
//pnpm i lucide-react
import { ChevronDown, ChevronUp } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect, useMemo, useRef, useState } from 'react';
import React from 'react';
import { type TRequestedConsultationsProps } from '../lib/types';

type DateTile = Date | null;
type SelectedDate = DateTile | [DateTile, DateTile];

export default function PbCalendar() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [dateModal, setDateModal] = useState(false);
  const [schedule, setSchedule] = useState<TRequestedConsultationsProps[]>([]);
  const [selectedSchedules, setSelectedSchedules] = useState<
    TRequestedConsultationsProps[]
  >([]);
  const [accordian, setAccordian] = useState<number | null>(null);

  const modalExternal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchConsultings = async () => {
      try {
        const response = await fetch('../../public/data/Consultings.json');
        const consultingData = await response.json();
        setSchedule(consultingData);
      } catch (error) {
        console.error('Error fetching ConsultingData:', error);
      }
    };
    fetchConsultings();
  }, []);

  const getScheduledDate = (date: Date) => {
    const scheduledDate = format(date, 'yyyy.MM.dd');
    const hasEvent = schedule.some(
      (consultings) =>
        consultings.approvalStatus && consultings.hopeDay === scheduledDate
    );
    return hasEvent ? <div className='dot'></div> : null;
  };
  const clickScheduledDate = (date: Date) => {
    const scheduledDate = format(date, 'yyyy.MM.dd');
    const schedules = schedule.filter(
      (consultings) =>
        consultings.approvalStatus && consultings.hopeDay === scheduledDate
    );
    setSelectedSchedules(schedules);
    setDateModal(true);
  };
  const handleAccordian = (index: number) => {
    setAccordian((prev) => (prev === index ? null : index));
  };

  const sortedSchedules = useMemo(() => {
    return [...selectedSchedules].sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.hopeTime}:00`).getTime();
      const timeB = new Date(`1970-01-01T${b.hopeTime}:00`).getTime();
      return timeA - timeB;
    });
  }, [selectedSchedules]);
  return (
    <div className='flex justify-center w-full h-full'>
      <Calendar
        onChange={setSelectedDate}
        onClickDay={clickScheduledDate}
        formatDay={(locale, date) => format(date, 'dd')}
        tileContent={({ date }) => getScheduledDate(date)}
        value={selectedDate}
        className='border border-gray-300 '
      />

      {dateModal && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'
          ref={modalExternal}
          onClick={(e) => {
            if (e.target === modalExternal.current) {
              setDateModal(false);
            }
          }}
        >
          <div className='bg-white p-5 rounded-lg shadow-lg relative w-3/5 '>
            <button
              onClick={() => setDateModal(false)}
              className=' text-[#f87171] text-xl absolute top-2 right-2 leading-none p-1'
            >
              x
            </button>
            <h2 className='text-lg font-bold mb-4 text-center'>
              {format(selectedDate as Date, 'MM월 dd일')} 상담 일정
            </h2>
            {selectedSchedules.length > 0 ? (
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
                  {sortedSchedules.map(
                    (
                      { hopeTime, name, category, title, inquiryDetails },
                      index
                    ) => (
                      <React.Fragment key={index}>
                        <tr
                          className='border-b cursor-pointer'
                          onClick={() => handleAccordian(index)}
                        >
                          <td className='p-2 text-center'>{hopeTime}</td>
                          <td className='p-2 text-center'>{name}</td>
                          <td className='p-2 text-center'>{category}</td>
                          <td className='p-2 text-center'>{title}</td>
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
                              <p>{inquiryDetails}</p>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    )
                  )}
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
