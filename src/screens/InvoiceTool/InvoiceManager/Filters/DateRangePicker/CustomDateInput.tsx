import { type ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import { CustomDateInputMaskField } from '@/components/DateRangePicker';
import { dateValidation } from '@/components/DatePicker/MaskedDatepicker/helper';
import { type ITextField } from '@/components/TextField/types';
import { MASK_DATE_FORMAT } from './utils';

type StatusFilterProps = Pick<ITextField, 'label'> & {
  onChange(value?: Date): void;
  value?: Date;
};

export function CustomDateInput({ value, onChange, label }: StatusFilterProps) {
  const [inputValue, setInputValue] = useState<string>(() =>
    value ? format(value, MASK_DATE_FORMAT) : '',
  );

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: dateValue } = event.target;
    const { isValid: isDateValid } = dateValidation(dateValue);

    if (isDateValid) {
      onChange(new Date(dateValue));
    } else {
      setInputValue(dateValue);
    }
  };

  return (
    <CustomDateInputMaskField
      isAlwaysFocus={false}
      inputSize="small"
      value={inputValue}
      fullWidth
      label={label}
      onChangeHandler={onChangeHandler}
    />
  );
}
