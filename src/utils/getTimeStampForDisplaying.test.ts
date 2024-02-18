import { t } from 'i18next';
import { WeekDays } from '@/constants/date';
import {
  getTimeStampForDisplaying,
  isYesterday,
  formatAMPM,
  formatDateString,
} from './getTimeStampForDisplaying';

const mockDate = new Date('2022-05-20 08:00:10');

describe('getTimeStampForDisplaying', () => {
  beforeEach(() => {
    vi.useFakeTimers().setSystemTime(mockDate);
  });

  afterAll(() => {
    vi.clearAllTimers();
  });

  test('isYesterday', () => {
    const date = new Date('2022-05-21 08:00:10');

    expect(isYesterday(date)).toBe(false);
  });

  test('formatDateString', () => {
    const testCases = [
      { arg: '2022-05-20 00:40:10', result: '05/20/2022' },
      { arg: '2021-11-20 16:00:10', result: '11/20/2021' },
    ];

    testCases.forEach((testCase) => {
      const date = new Date(testCase.arg);
      const formattedTime = formatDateString(date);
      expect(formattedTime).toBe(testCase.result);
    });
  });

  test('formatAMPM', () => {
    const testCases = [
      { arg: '2022-05-20 00:40:10', result: '12:40 AM' },
      { arg: '2022-05-20 12:01:10', result: '12:01 PM' },
      { arg: '2022-05-20 06:00:10', result: '06:00 AM' },
      { arg: '2021-11-20 16:00:10', result: '04:00 PM' },
    ];

    testCases.forEach((testCase) => {
      const date = new Date(testCase.arg);
      const formattedTime = formatAMPM(date);
      expect(formattedTime).toBe(testCase.result);
    });
  });

  test('getTimeStampForDisplaying', () => {
    const undefinedValue = getTimeStampForDisplaying(undefined);
    expect(undefinedValue).toBe(undefined);

    const date = getTimeStampForDisplaying('2022-05-01 08:00:00');
    expect(date).toBe('05/01/2022, 08:00 AM');

    const dateWithNamedMonth = getTimeStampForDisplaying(
      '2022-05-01 08:00:00',
      true,
    );
    expect(dateWithNamedMonth).toBe('01 May 2022, 08:00 AM');

    const yesterday = getTimeStampForDisplaying('2022-05-19 08:00:00');
    expect(yesterday).toBe(`${t('noumena.date.yesterday')}, 08:00 AM`);

    const today = getTimeStampForDisplaying('2022-05-20 08:00:00');
    expect(today).toBe(`${t('noumena.date.today')}, 08:00 AM`);

    const dayInWeek = getTimeStampForDisplaying('2022-05-16 08:00:00');
    const dateInWeek = new Date('2022-05-16 08:00:00');
    expect(dayInWeek).toBe(`${t(WeekDays[dateInWeek.getDay()])}, 08:00 AM`);

    const withoutTime = getTimeStampForDisplaying(
      '2022-05-01 08:00:00',
      false,
      false,
    );
    expect(withoutTime).toBe('05/01/2022');
  });
});
