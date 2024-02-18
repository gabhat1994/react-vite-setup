import { DayPicker } from 'react-day-picker';

import { customStyles } from '@/components/DatePicker/styles';

import type { CustomEventPickerProps } from './types';
import { DatePickerItem, classNames } from '../EventDateTimeFields/styles';

export const MonthlyPicker = ({
  value,
  onChange,
}: CustomEventPickerProps<Date[], Date>) => (
  <DatePickerItem>
    <DayPicker
      mode="multiple"
      selected={value}
      onDayClick={onChange}
      classNames={classNames}
      styles={customStyles}
      captionLayout="dropdown"
    />
  </DatePickerItem>
);
