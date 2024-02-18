import { useState, useEffect } from 'react';

export const useCountDownTimer = (
  initialSeconds: number,
  timedOut?: () => void,
) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    if (!seconds) {
      clearInterval(interval);
      if (timedOut) timedOut();
    }

    return () => clearInterval(interval);
  }, [seconds, timedOut]);
  return [seconds];
};
