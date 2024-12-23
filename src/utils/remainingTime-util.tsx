import { useState, useEffect } from 'react';
import changeDateFormat from './changeDateFormat-util';

type TimerProps = {
  hopeDate: string;
  hopeTime: string;
};

// (빠른 상담일 경우) hope_time ( === reserve_time) + 15분 까지 남은 시간
const Timer = ({ hopeDate, hopeTime }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState<string>('');

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const [year, month, day] = changeDateFormat(hopeDate)
        .split('.')
        .map(Number);
      const [hours, minutes] = hopeTime.split(':').map(Number);

      const targetTime = new Date(year, month - 1, day, hours, minutes);
      // hopeTime에 15분 추가
      targetTime.setMinutes(targetTime.getMinutes() + 15);
      console.log('타겟!!!!', targetTime);

      const difference = targetTime.getTime() - now.getTime();
      console.log('difference: ', difference);

      if (difference > 0) {
        const totalMinutes = Math.floor(difference / 60000);
        const seconds = Math.floor((difference % 60000) / 1000);

        setRemainingTime(
          `${totalMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      } else {
        setRemainingTime('00:00');
      }
    };

    calculateRemainingTime();
    const timer = setInterval(calculateRemainingTime, 1000);

    return () => clearInterval(timer);
  }, [hopeDate, hopeTime]);

  return (
    <span
      className='text-hanared'
      style={{ fontFamily: 'noto-bold, sans-serif' }}
    >
      {remainingTime}
    </span>
  );
};

export default Timer;
