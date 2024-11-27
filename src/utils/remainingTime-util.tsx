import { useState, useEffect } from 'react';

type TimerProps = {
  hopeDay: string;
  hopeTime: string;
};

const Timer = ({ hopeDay, hopeTime }: TimerProps) => {
  const [remainingTime, setRemainingTime] = useState<string>('');

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const [year, month, day] = hopeDay.split('.').map(Number);
      const [hours, minutes] = hopeTime.split(':').map(Number);
      const targetTime = new Date(year, month - 1, day, hours, minutes);
      const difference = targetTime.getTime() - now.getTime();

      // 남은시간이 0보다 크면
      if (difference > 0) {
        const totalMinutes = Math.floor(difference / 60000);
        const seconds = Math.floor((difference % 60000) / 1000);
        const microseconds = Math.floor((difference % 1000) / 10);

        setRemainingTime(
          `${totalMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${microseconds.toString().padStart(2, '0')}`
        );
      } else {
        // 0보다 작으면 설정값
        setRemainingTime('00:00:00');
      }
    };

    calculateRemainingTime();
    const timer = setInterval(calculateRemainingTime, 10);

    return () => clearInterval(timer);
  }, [hopeDay, hopeTime]);

  return <span className='text-hanared font-bold'>{remainingTime}</span>;
};

export default Timer;
