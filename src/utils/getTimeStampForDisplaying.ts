import { t } from 'i18next';
import { WeekDays } from '@/constants/date';
import { getDifferenceInDays } from './getDifferenceInDays';

export const getTimeStampForDisplaying = (
  dateString: string | undefined,
  isMonthName?: boolean,
  displayTime: boolean = true,
): string | undefined => {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  const today = new Date();

  const differenceInDays = getDifferenceInDays(today.toString(), dateString);

  const timeInString = formatAMPM(date);
  let dateInString = formatDateString(date, isMonthName);

  if (differenceInDays < 2) {
    dateInString = isYesterday(date)
      ? t('noumena.date.yesterday')
      : t('noumena.date.today');
  } else if (differenceInDays < 7 && date.getDay() < today.getDay()) {
    dateInString = t(WeekDays[date.getDay()]);
  }

  return displayTime ? `${dateInString}, ${timeInString}` : dateInString;
};

export const formatAMPM = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  const minutesInString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const hoursInString = hours < 10 ? `0${hours}` : `${hours}`;
  const strTime = `${hoursInString}:${minutesInString} ${ampm}`;
  return strTime;
};

export const formatDateString = (date: Date, isMonthName?: boolean): string => {
  const year = date.getFullYear();

  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : `0${month}`;
  if (isMonthName) {
    month = date.toLocaleString('default', { month: 'short' });
  }

  let day = date.getDate().toString();
  day = day.length > 1 ? day : `0${day}`;

  const formattedData = isMonthName
    ? `${day} ${month} ${year}`
    : `${month}/${day}/${year}`;

  return formattedData;
};

export const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.toDateString() === date.toDateString();
};
