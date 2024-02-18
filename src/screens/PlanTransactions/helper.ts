import { format, parseISO, getYear, getMonth } from 'date-fns';
import { t } from 'i18next';

export const MonthList: string[] = [
  t(`noumena.viewTransactions.January`),
  t(`noumena.viewTransactions.February`),
  t(`noumena.viewTransactions.March`),
  t(`noumena.viewTransactions.April`),
  t(`noumena.viewTransactions.May`),
  t(`noumena.viewTransactions.June`),
  t(`noumena.viewTransactions.July`),
  t(`noumena.viewTransactions.August`),
  t(`noumena.viewTransactions.September`),
  t(`noumena.viewTransactions.October`),
  t(`noumena.viewTransactions.November`),
  t(`noumena.viewTransactions.December`),
];

export const findMonthList = () => {
  const newList = [];
  const monthName = MonthList;
  const d = new Date();
  d.setDate(1);

  for (let i = 0; i <= 11; i += 1) {
    newList.push(`${monthName[d.getMonth()]} ${d.getFullYear()}`);
    d.setMonth(d.getMonth() - 1);
  }
  return newList.reverse();
};

export const findCurrentMonth = () => {
  const todaysDate = new Date();
  const year = getYear(todaysDate);
  const monthNumber = getMonth(todaysDate);
  const month = format(new Date(year, monthNumber, 1), 'MMMM');
  return `${month} ${year}`;
};

export const generateButtonLabel = (item: string) => {
  if (item.split(' ')[1] === String(new Date().getUTCFullYear())) {
    return item.split(' ')[0];
  }
  return item;
};

export const DateFormaterStringInput = (timestamp?: string) => {
  if (!timestamp) return '';
  const inputDate = new Date(timestamp);
  const currentYear = new Date().getFullYear();
  const formatterString =
    inputDate.getFullYear() === currentYear ? 'MMMM dd' : 'MMMM dd, yyyy';
  const formattedDate = format(parseISO(timestamp), formatterString);
  return formattedDate;
};

export const formattedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
