import {
  formatDistanceToNow as dateFnsFormatDistanceToNow,
  formatRelative,
  addMinutes,
  isValid,
  formatDistanceToNowStrict,
  format,
  differenceInHours,
  getMinutes,
  startOfWeek,
  endOfToday,
  endOfYesterday,
  previousSaturday,
  previousSunday,
  startOfToday,
  startOfYesterday,
  startOfYear,
  intlFormatDistance,
} from 'date-fns';
import * as locales from 'date-fns/locale';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

import { type Maybe } from '@/apollo/generated/types';

import { twoDigitsNumberStr } from './number';
import { WeekDay } from './recurringEventOccurance';

type FormatVariant = 'date' | 'time' | 'datetime';
type FormatLength = 'long' | 'short';

const formatRelativeLocale: Record<
  FormatVariant,
  Record<FormatLength, Record<string, string>>
> = {
  datetime: {
    long: {
      lastWeek: "eeee',' hh:mm aa",
      yesterday: "'Yesterday,' hh:mm aa",
      today: "'Today,' hh:mm aa",
      tomorrow: "'Tomorrow,' hh:mm aa",
      nextWeek: "eeee',' hh:mm aa",
      other: 'dd MMM yyyy, hh:mm aa',
    },
    short: {
      lastWeek: "eee',' hh:mm aa",
      yesterday: "'Yesterday,' hh:mm aa",
      today: "'Today,' hh:mm aa",
      tomorrow: "'Tomorrow,' hh:mm aa",
      nextWeek: "eee',' hh:mm aa",
      other: 'dd MMM yyyy, hh:mm aa',
    },
  },
  date: {
    long: {
      lastWeek: 'eeee',
      yesterday: "'Yesterday'",
      today: "'Today'",
      tomorrow: "'Tomorrow'",
      nextWeek: 'eeee',
      other: 'dd MMM yyyy',
    },
    short: {
      lastWeek: 'eee',
      yesterday: "'Yesterday'",
      today: "'Today'",
      tomorrow: "'Tomorrow'",
      nextWeek: 'eee',
      other: 'dd MMM yyyy',
    },
  },
  time: {
    long: {
      lastWeek: 'hh:mm aa',
      yesterday: 'hh:mm aa',
      today: 'hh:mm aa',
      tomorrow: 'hh:mm aa',
      nextWeek: 'hh:mm aa',
      other: 'hh:mm aa',
    },
    short: {
      lastWeek: 'hh:mm aa',
      yesterday: 'hh:mm aa',
      today: 'hh:mm aa',
      tomorrow: 'hh:mm aa',
      nextWeek: 'hh:mm aa',
      other: 'hh:mm aa',
    },
  },
};

const getLocaleForVariant = (
  variant: FormatVariant,
  length: FormatLength = 'short',
  key?: string,
) => ({
  ...locales.enUS,
  formatRelative: (token: string) =>
    formatRelativeLocale[variant][length][key || token],
});

export const formatRelativeVariant = (
  value: string | Date,
  variant: FormatVariant,
  length?: FormatLength,
  key?: string,
) => {
  const date = new Date(value);
  return formatRelative(date, new Date(), {
    locale: getLocaleForVariant(variant, length, key),
    weekStartsOn: 0,
  });
};

export const formartMessageSentDate = (value: string | Date) =>
  formatRelativeVariant(value, 'datetime');

export const formatTimeSection = (value: string | Date) =>
  formatRelativeVariant(value, 'date', 'long');

export const formatLastMessageSentDate = (date?: Date | null) => {
  if (!date) {
    return null;
  }
  const text = dateFnsFormatDistanceToNow(date);
  if (text === 'less than a minute') {
    return 'now';
  }

  return formatRelativeVariant(date, 'datetime', 'short');
};

export const formatTime = (value: number): string => {
  const minutes = Math.floor(value / 60000);
  const seconds = Math.floor((value % 60000) / 1000);
  const remainTime = `${minutes.toString().padStart(2, '0')}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;
  return remainTime.toString();
};

export const notificationRemainTime = (value: number) => {
  const minutes = Math.floor(value / 60000);
  const seconds = Math.floor((value % 60000) / 1000);
  return `${minutes.toString().padStart(2, '0')}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;
};

export const dateAtTime = (date: string | Date, timeOnly = false) => {
  if (timeOnly) {
    return format(new Date(date), 'HH:mm aa');
  }

  return `${format(new Date(date), 'MM/dd/yyyy')} at ${format(
    new Date(date),
    'HH:mm aa',
  )}`;
};
export const distanceDate = (date: string | Date, timeOnly = false) => {
  const tempArray = formatDistanceToNowStrict(new Date(date), {
    locale: locales.enUS,
  }).split(' ');
  let formattedDate;
  switch (tempArray[1]) {
    case 'seconds':
    case 'second':
      formattedDate = `less than 1m ago`;
      break;
    case 'hours':
    case 'hour':
      formattedDate = `${tempArray[0]}h ago`;
      break;
    case 'minutes':
    case 'minute':
      formattedDate = `${tempArray[0]}m ago`;
      break;
    default:
      formattedDate = dateAtTime(date, timeOnly);
  }
  return formattedDate;
};

/**
 * Get local time
 * @param dateTime: date time string specified on timezone. e.g. 2022-07-08T17:45:00.000Z
 * @param timezone: timezone e.g. Asia/Kolkata
 * @returns date converted to local time
 */
export const getLocalTime = ({
  dateTime,
  timezone,
}: {
  dateTime: string | Date;
  timezone?: string | null;
  returnFormat?: string;
}): Maybe<Date> => {
  if (!isValid(new Date(dateTime))) return null;

  if (timezone) {
    const utcTime = zonedTimeToUtc(new Date(dateTime), timezone);
    return new Date(utcTime);
  }
  return new Date(dateTime);
};

/**
 * Get formatted local time
 * @param dateTime: date time string specified on timezone. e.g. 2022-07-08T17:45:00.000Z
 * @param timezone: timezone e.g. Asia/Kolkata
 * @param returnFormat: return format
 * @returns formatted local date time
 */
export const getLocalTimeFormatted = ({
  dateTime,
  timezone,
  returnFormat = 'yyyy-MM-dd hh:mm:ss',
}: {
  dateTime: string | Date;
  timezone?: string | null;
  returnFormat?: string;
}): string => {
  const localTime = getLocalTime({ dateTime, timezone });
  if (!localTime) return '';

  return format(localTime, returnFormat);
};

/**
 * Formats a timestamp depending on the relative day.
 * Used to render timestamps within a sectioned list, where each section is a date itself.
 * Example:
 * [Today]
 *  - 5 minutes ago
 *  - 6 hours ago
 * [Yesterday]
 *  - 12:00 AM
 *  - 09:00 PM
 * [05/11/2000]
 *  - 09:00 AM
 * @param date
 */
export const formatSectionedDate = (date: Date | string) => {
  const d = new Date(date);

  if (differenceInHours(Date.now(), d) < 24) {
    return distanceDate(d, true);
  }

  return formatRelativeVariant(d, 'time');
};

/**
 * Get time that is closet and is snapped to 30 or 00
 * @param time Initial time
 * @param minsToAdd Additional minutes to reset initial time
 * @param allowPast Whether snapped time can be past or not. e.g. time: 2022-07-18 09:13:00, if `allowPast` is true, the result is 2022-07-18 09:00:00, otherwise, the result is 2022-07-18 09:30:00 or 2022-07-18 10:00:00
 * @param isFullHour Whether snapped time can be format of HH:30:00 or not HH:00:00
 * @param displayFormat In case of you want to get formatted time string
 * @returns Shape of formatted date and value
 */

export const getSnappedTime = (params: {
  dateTime: Date | string;
  minsToAdd?: number;
  allowPast?: boolean;
  isFullHour?: boolean;
  displayFormat?: string;
}): { label: string; value: Date } => {
  const {
    dateTime,
    minsToAdd = 0,
    allowPast = false,
    isFullHour = true,
    displayFormat = 'yyyy-MM-dd hh:mm:ss',
  } = params;

  const timePattern = isFullHour ? 60 : 30;
  const timeCloned = addMinutes(new Date(dateTime), minsToAdd);
  const minutes = getMinutes(timeCloned);

  const extraMins = minutes % timePattern;
  let minsToSnapPoint = timePattern - extraMins;
  if (allowPast && extraMins < timePattern / 2) {
    minsToSnapPoint = -extraMins;
  }
  const snappedTime = addMinutes(timeCloned, minsToSnapPoint);

  return { label: format(snappedTime, displayFormat), value: snappedTime };
};

/**
 * Get HH:mm-formatted time string from minutes
 * @param value
 * @param inputMode Whether the input value is minutes or seconds
 * @returns HH:mm-formatted string
 */
export const valueToTimeStr = (
  value: number,
  inputMode: 'minutes' | 'seconds',
): string => {
  if (!value) return '00:00';

  const hours =
    inputMode === 'minutes' ? Math.floor(value / 60) : Math.floor(value / 3600);
  const mins =
    inputMode === 'minutes' ? value % 60 : Math.floor((value % 3600) / 60);

  return `${twoDigitsNumberStr(hours)}:${twoDigitsNumberStr(mins)}`;
};

/**
 * Get timezone string
 * @returns Timezone string like `China Standard Time`, `Central European Standard Time`, `Asia/Shanghai`
 */
export const getLocalTimezone = (): string => {
  const regex = /\(([^)]+)\)/;
  const matches = regex.exec(new Date().toTimeString()); // 16:48:15 GMT+0800 (China Standard Time)

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return timezone || matches?.[1] || '';
};

/**
 * Convert time between timezones
 * @param datetime Date | string | number
 * @param sourceTimezone Timezone that source time generated
 * @param targetTimezone Target Timezone. If targetTimezone is empty, UTC will be used.
 */
export const convertToTimezone = (
  datetime: Date | string | number,
  sourceTimezone: string,
  targetTimezone?: string,
): string => {
  const utcDate = zonedTimeToUtc(datetime, sourceTimezone);

  if (targetTimezone) {
    const otherDate = utcToZonedTime(utcDate, targetTimezone);

    return otherDate.toISOString();
  }

  return utcDate.toISOString();
};

export const convertDateToUtcNoon = (dateOrString: Date | string) => {
  const date = new Date(dateOrString);
  const dateAsUtcNoon = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    12,
    0,
    0,
    0,
  );
  return new Date(dateAsUtcNoon);
};

export const getPredefinedDateRange = (
  dateRangeKey: string,
  startTime = startOfYear(new Date()),
) =>
  dateRangeKey === 'lifetime'
    ? { from: startTime, to: endOfToday() }
    : dateRangeKey === 'today'
    ? { from: startOfToday(), to: endOfToday() }
    : dateRangeKey === 'yesterday'
    ? { from: startOfYesterday(), to: endOfYesterday() }
    : dateRangeKey === 'this_week'
    ? { from: startOfWeek(new Date()), to: endOfToday() }
    : dateRangeKey === 'last_week'
    ? {
        from: previousSunday(startOfWeek(new Date())),
        to: previousSaturday(new Date()),
      }
    : { from: new Date(), to: new Date() };

export const getOrdinalNumber = (day: number): string => {
  let suffix = 'th';

  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st';
  } else if (day === 2 || day === 22) {
    suffix = 'nd';
  } else if (day === 3 || day === 23) {
    suffix = 'rd';
  }

  return suffix;
};

export const getSortedDaysInMap = (days: string[] = []): string[] => {
  if (!days.length) {
    return days;
  }
  const dayOrder: { [key: string]: number } = {};
  WeekDay.forEach(({ day, position }) => {
    dayOrder[day] = position;
  });
  return [...days].sort((a, b) => dayOrder[a] - dayOrder[b]);
};

export const getDayShortHand = (day: string): string => {
  if (day.toLowerCase() === 'thursday') {
    return day.slice(0, 4);
  }
  return day.slice(0, 3);
};
export const getTimeBetweenDates = (startDate: Date, endDate: Date) => {
  const differenceInMs = endDate.getTime() - startDate.getTime();
  const hours = intlFormatDistance(endDate, startDate, { unit: 'hour' }).split(
    ' ',
  );
  const timeFormatted = format(differenceInMs, 'mm:ss');
  return `${hours[1]}:${timeFormatted}`;
};

/**
 * Get formatted date as MM/dd/YYYY
 * @param date
 * @returns MM/dd/YYYY formatted date string
 */
export function formatDateToMMDDYYYY(date?: Maybe<string | Date | number>) {
  const dateToBeFormatted = date ? new Date(date) : new Date();
  return format(dateToBeFormatted, 'MM/dd/yyyy');
}
