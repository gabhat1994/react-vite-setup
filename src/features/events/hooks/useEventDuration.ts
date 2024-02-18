import { useEffect, useCallback, useMemo, useState } from 'react';
import { differenceInMinutes, addMinutes, endOfDay, format } from 'date-fns';

import { valueToTimeStr } from '@/utils/date';
import { type IEventDurationDropdown } from '../types/context';

interface IUseEventDuration {
  initialDuration: number;
  dateTime: Date;
  onChange: (d: number) => void;
}

interface IUseEventDurationRes {
  duration: number;
  durations: IEventDurationDropdown[];
  onChangeDuration: (minutes: number) => void;
}

const interval = 15; // mins

export const useEventDuration = ({
  initialDuration,
  dateTime,
  onChange,
}: IUseEventDuration): IUseEventDurationRes => {
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    if (!duration) {
      setDuration(initialDuration);
    }
  }, [duration, initialDuration]);

  const durations: IEventDurationDropdown[] = useMemo(() => {
    const res: IEventDurationDropdown[] = [];
    const mins = differenceInMinutes(endOfDay(dateTime), dateTime);

    for (let i = interval; i < mins; i += interval) {
      res.push({
        key: `key-${i}`,
        label: valueToTimeStr(i, 'minutes'),
        type: 'value',
        description: format(addMinutes(dateTime, i), 'h:mm aa'),
        value: 60 * i, // in seconds
      });
    }

    return res;
  }, [dateTime]);

  const onChangeDuration = useCallback(
    (minutes: number) => {
      setDuration(minutes);
      onChange(minutes);
    },
    [onChange],
  );

  return { duration, durations, onChangeDuration };
};

export default useEventDuration;
