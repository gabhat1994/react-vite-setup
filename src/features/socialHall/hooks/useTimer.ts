import { useEffect, useRef, useState } from 'react';

export const useTimer = (defaultTime: number = 0) => {
  const myInterval = useRef<NodeJS.Timer>();
  const [elapsedTime, setElapsedTime] = useState<number>(defaultTime);

  useEffect(() => () => clearInterval(myInterval.current), []);

  const startTimer = (timer: number = 0) => {
    clearInterval(myInterval.current);
    setElapsedTime(timer);
    myInterval.current = setInterval(() => {
      setElapsedTime((time) => time + 1000);
    }, 1000);
  };

  return {
    startTimer,
    elapsedTime,
    resetInterval: () => clearInterval(myInterval.current),
  };
};
