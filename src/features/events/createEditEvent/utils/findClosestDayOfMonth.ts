import { addMonths, getDate, isAfter, set, startOfMonth } from 'date-fns';

/**
 * Finds the closest future date from the provided month dates based on the selected date's day and time.
 *
 * @param {number[]} days - Array of dates (days) in the month to consider.
 * @param {Date} selectedDate - The date with the desired time settings.
 * @returns {Date} - The closest future date based on the selected date's day and time.
 */
export const findClosestDayOfMonth = (days: number[], selectedDate: Date) => {
  const time = {
    hours: selectedDate.getHours(),
    minutes: selectedDate.getMinutes(),
  };
  const today = new Date();
  const todayDate = getDate(today);
  const todayWithSetTime = set(today, time);

  if (days.includes(todayDate) && !isAfter(today, todayWithSetTime)) {
    return todayWithSetTime;
  }

  const daysAfterToday = days.filter((day) => day > todayDate);

  if (daysAfterToday.length) {
    const closestDay = Math.min(...daysAfterToday);
    return set(today, { ...time, date: closestDay });
  }

  const closestDayNextMonth = Math.min(...days);
  const startOfNextMonth = startOfMonth(addMonths(today, 1));
  return set(startOfNextMonth, { ...time, date: closestDayNextMonth });
};
