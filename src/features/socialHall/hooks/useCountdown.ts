import { useCallback, useEffect, useRef, useState } from 'react';

export const useCountDown = (
  maxTime: number = 0,
): { startCountdown: (timer: number) => void; remainTime: number } => {
  const myInterval = useRef<NodeJS.Timer>();
  const [remainTime, setRemainTime] = useState(maxTime);

  useEffect(() => {
    myInterval.current = setInterval(() => {
      if (remainTime > 1000) {
        setRemainTime(remainTime - 1000);
      }
      if (remainTime < 1000) {
        setRemainTime(0);
        clearInterval(myInterval.current);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval.current);
    };
  }, [remainTime]);

  const startCountdown = useCallback((timer: number) => {
    clearInterval(myInterval.current);
    setRemainTime(timer);
  }, []);

  return {
    remainTime,
    startCountdown,
  };
};
