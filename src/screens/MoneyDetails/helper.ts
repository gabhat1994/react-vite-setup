import { format } from 'date-fns';

export const convert = (str?: Date) => {
  if (!str) return undefined;
  const date = new Date(str);
  const mnth = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  return [date.getFullYear(), mnth, day].join('-');
};

export const DateFormater = (str?: Date) => {
  if (!str) return '';
  const now = format(new Date(Number(str)), 'MMM dd, yyyy');
  return now;
};

export const DateFormaterToDDMMYYYY = (str?: string | undefined | null) => {
  if (!str) return '';
  const now = format(new Date(Number(str)), 'MM/dd/yyyy');
  return now;
};

export const formatTimeAMPM = (str: string | undefined | null) => {
  if (!str) return '';
  const date = new Date(Number(str));
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  const newminutes = `0${minutes}`.slice(-2);
  const strTime = `${hours}:${newminutes} ${ampm}`;
  return strTime;
};
