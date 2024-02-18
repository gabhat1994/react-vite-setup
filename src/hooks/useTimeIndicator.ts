import { getTimeBetweenDates } from '@/utils/date';
import { addHours, isFuture } from 'date-fns';
import { useState, useRef, useCallback, useEffect } from 'react';

export const useTimeIndicator = (startDate: string) => {
  const [countDown, setCountDown] = useState('00:00:00');
  const intervalId = useRef<null | NodeJS.Timer>(null);

  const handleUpdateTimer = useCallback((endDate: Date) => {
    const interval = setInterval(() => {
      const resultDate = getTimeBetweenDates(new Date(), endDate);
      setCountDown(resultDate);
    }, 1000);
    intervalId.current = interval;
  }, []);

  useEffect(() => {
    if (startDate) {
      const newStartDate = new Date(startDate);
      const endDate = addHours(newStartDate, 72);
      if (isFuture(endDate)) {
        handleUpdateTimer(endDate);
      }
    }
  }, [startDate, handleUpdateTimer]);

  useEffect(
    () => () => {
      if (intervalId.current) {
        clearInterval(intervalId.current);
      }
    },
    [],
  );
  return [countDown];
};

export default useTimeIndicator;
