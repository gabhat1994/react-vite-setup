const isValidNumber = (num: string) => String(Number(num)) !== 'NaN';
const isLeapYear = (year: number) =>
  (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const dateValidation = (dateValue: string) => {
  const [month, date, year] = dateValue.split('/');
  const isValidMonth = isValidNumber(month) && Number(month) > 0;
  const isValidYear = isValidNumber(year);

  const shouldValidateDateOfFebruaryIfNotLeapYear =
    isValidYear && !isLeapYear(Number(year)) && isValidMonth && month === '02';

  const isValidDate = shouldValidateDateOfFebruaryIfNotLeapYear
    ? isValidNumber(date) && Number(date) > 0 && Number(date) <= 28
    : isValidNumber(date) && Number(date) > 0;

  return {
    isValidDate,
    isValidMonth,
    isValidYear,
    isValid: isValidDate && isValidMonth && isValidYear,
  };
};
