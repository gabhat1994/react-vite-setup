import { t } from 'i18next';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

interface InitialSecondsProps {
  initialSeconds?: number;
  timedOut?: () => void;
  unit?: 'second' | 'minute';
}
const Timer = ({
  initialSeconds = 60,
  timedOut,
  unit = 'second',
}: InitialSecondsProps) => {
  const interval = useRef<NodeJS.Timer>();
  const [seconds, setSeconds] = useState(initialSeconds);

  useLayoutEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    interval.current = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval.current);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(interval.current);
      if (timedOut) timedOut();
    }
  }, [seconds, timedOut]);

  return (
    <span>
      {unit === 'second'
        ? `${seconds}s`
        : t('noumena.event.minutes_remaining_timer', {
            minute: Math.round(seconds / 60),
          })}
    </span>
  );
};

export default Timer;
