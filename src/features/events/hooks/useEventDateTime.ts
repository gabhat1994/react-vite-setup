import { useEffect, useCallback, useMemo, useState } from 'react';
import {
  isValid,
  isToday,
  startOfDay,
  endOfDay,
  isBefore,
  format,
  addMinutes,
  parse,
} from 'date-fns';

import { getSnappedTime } from '@/utils/date';
import { type IEventTimeDropdown } from '../types/context';

interface IUseEventDateTime {
  initialDate: Date;
  error?: boolean;
  onChange: (d: Date) => void;
}

interface IUseEventDateTimeRes {
  date: Date | undefined;
  time: string;
  availableTimes: IEventTimeDropdown[];
  dateTimeError: boolean;
  onChangeDateTime: (name: 'date' | 'time', d?: Date) => void;
}

const interval = 15; // mins

export const useEventDateTime = ({
  initialDate,
  error,
  onChange,
}: IUseEventDateTime): IUseEventDateTimeRes => {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>('');
  const [dateTimeError, setDateTimeError] = useState<boolean | undefined>();

  const onChangeDate = useCallback(() => {
    if (date && time) {
      const dateParsed = parse(
        `${format(date, 'yyyy-MM-dd')} ${time}`,
        'yyyy-MM-dd hh:mm aa',
        new Date(),
      );
      if (isValid(dateParsed)) {
        onChange(dateParsed);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, time]);

  useEffect(() => {
    setDateTimeError(Boolean(error));
  }, [error]);

  useEffect(() => {
    if (!date || !time) {
      setDate(initialDate);
      setTime(format(initialDate, 'hh:mm aa'));
    }
  }, [date, initialDate, time]);

  useEffect(() => {
    onChangeDate();
  }, [date, time, onChangeDate]);

  const availableTimes: IEventTimeDropdown[] = useMemo(() => {
    if (!date) return [];

    let start = isToday(date)
      ? getSnappedTime({ dateTime: new Date(), isFullHour: false }).value
      : startOfDay(date);
    const end = endOfDay(date);

    const res: IEventTimeDropdown[] = [];
    while (isBefore(start, end)) {
      res.push({
        key: `key-${start.getTime()}`,
        label: format(start, 'hh:mm aa'),
        type: 'value',
        description: '',
        value: start,
      });

      start = addMinutes(start, interval);
    }

    return res;
  }, [date]);

  const onChangeDateTime = useCallback((name: 'date' | 'time', d?: Date) => {
    if (!d) return;

    if (name === 'date') {
      setDate(d);
    } else if (name === 'time') {
      setTime(format(d, 'hh:mm aa'));
    }
    setDateTimeError(false);
  }, []);

  return {
    date,
    time,
    availableTimes,
    dateTimeError: Boolean(dateTimeError),
    onChangeDateTime,
  };
};

export default useEventDateTime;
