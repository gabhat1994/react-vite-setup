import { type DropdownValueType } from '@/components/Dropdown';
import { type DateRange } from 'react-day-picker';
import { addMonths, addWeeks, format, subMonths, subWeeks } from 'date-fns';
import { type Maybe } from '@/common/types';
import { type StatsDateType } from './types';

const dropdownOptions: DropdownValueType<StatsDateType, StatsDateType>[] = [
  {
    label: 'Weekly',
    key: 'weekly',
    type: 'value',
    value: 'weekly',
  },
  {
    label: 'Monthly',
    key: 'monthly',
    type: 'value',
    value: 'monthly',
  },
  {
    label: 'Quarterly',
    key: 'quarterly',
    type: 'value',
    value: 'quarterly',
  },
  {
    label: 'Custom',
    key: 'custom',
    type: 'value',
    value: 'custom',
  },
];

const formatShortDate = (date?: Date) => (date ? format(date, 'MMM d') : '');

const formatDateRange = (dateRange: Maybe<DateRange>) =>
  dateRange
    ? `${formatShortDate(dateRange.from)} - ${formatShortDate(dateRange.to)}`
    : '';

const getPrevDate = (dateRange: Maybe<DateRange>, type: StatsDateType) => {
  if (!dateRange?.from || !dateRange.to) return null;

  switch (type) {
    case 'monthly':
      return {
        from: subMonths(dateRange.from, 1),
        to: dateRange.from,
      };
    case 'weekly':
      return {
        from: subWeeks(dateRange.from, 1),
        to: dateRange.from,
      };
    case 'quarterly':
      return {
        from: subMonths(dateRange.from, 3),
        to: dateRange.from,
      };
    default:
      return null;
  }
};

const getNextDate = (dateRange: Maybe<DateRange>, type: StatsDateType) => {
  if (!dateRange?.from || !dateRange.to) return null;

  switch (type) {
    case 'monthly':
      return {
        from: dateRange.to,
        to: addMonths(dateRange.to, 1),
      };
    case 'weekly':
      return {
        from: dateRange.to,
        to: addWeeks(dateRange.to, 1),
      };
    case 'quarterly':
      return {
        from: dateRange.to,
        to: addMonths(dateRange.to, 3),
      };
    default:
      return null;
  }
};

export const MembersStatsDateUtils = {
  dropdownOptions,
  formatDateRange,
  getNextDate,
  getPrevDate,
};
