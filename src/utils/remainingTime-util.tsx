import { useState, useEffect } from 'react';

type TimerProps = {
  hope_date: string;
  hope_time: string;
};

// (빠른 상담일 경우) hope_time ( === reserve_time) + 15분 까지 남은 시간
const Timer = ({ hope_date, hope_time }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState<string>('');

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const [year, month, day] = hope_date.split('.').map(Number);
      const [hours, minutes] = hope_time.split(':').map(Number);
      const targetTime = new Date(year, month - 1, day, hours, minutes);

      // hope_time에 15분 추가
      targetTime.setMinutes(targetTime.getMinutes() + 15);

      const difference = targetTime.getTime() - now.getTime();

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
  }, [hope_date, hope_time]);

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
