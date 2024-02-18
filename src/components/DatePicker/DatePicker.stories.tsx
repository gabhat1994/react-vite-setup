import { type Meta } from '@storybook/react';
import { useCallback, useState } from 'react';
import { DatePicker } from './DatePicker';
import { type DatePickerProps } from './types';

export default {
  title: 'Atoms/DatePicker',
  component: DatePicker,
  argTypes: {
    label: {
      defaultValue: 'Date field',
      control: { type: 'text' },
    },
    borderOnFocus: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    dateFormat: {
      control: { type: 'select' },
      options: ['MMM dd, yyyy', 'yyyy-MM-dd', 'MM/dd/yyyy'],
    },
    disabled: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    error: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    fromYear: {
      defaultValue: new Date().getFullYear(),
      control: { type: 'number' },
    },
    toYear: {
      defaultValue: new Date().getFullYear() + 3,
      control: { type: 'number' },
    },
    fullSize: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    helperText: {
      defaultValue: '',
      control: { type: 'text' },
    },
    layout: {
      options: ['buttons', 'dropdown'],
      control: { type: 'select' },
    },
    maxDate: {
      control: { type: 'date' },
    },
    minDate: {
      control: { type: 'date' },
    },
    minWidth: {
      defaultValue: '245px',
      control: { type: 'text' },
    },
    placement: {
      options: [
        'bottom',
        'bottom-end',
        'bottom-start',
        'top',
        'top-end',
        'top-start',
        'left',
        'left-end',
        'left-start',
        'right',
        'right-end',
        'right-start',
      ],
      control: { type: 'select' },
    },
    required: {
      defaultValue: false,
      control: { type: 'boolean' },
    },
    showIcon: {
      defaultValue: true,
      control: { type: 'boolean' },
    },
    testId: {
      defaultValue: '',
      control: { type: 'text' },
    },
    value: {
      control: { type: 'date' },
    },
    onChange: {
      control: { type: 'function' },
    },
  },
} as Meta<typeof DatePicker>;

const PrimaryWithHooks = (props: DatePickerProps) => {
  const [date, setDate] = useState<Date | undefined>();
  const handleChange = useCallback((value?: Date) => {
    setDate(value);
  }, []);

  return (
    <DatePicker
      {...props}
      value={date || props.value}
      onChange={handleChange}
    />
  );
};

export const Primary = {
  render: PrimaryWithHooks,
};
