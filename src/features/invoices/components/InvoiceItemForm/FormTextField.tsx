import React from 'react';
import { type Control, Controller, type FieldPath } from 'react-hook-form';
import { TextField } from '@/components/TextField';
import { type ITextField } from '@/components/TextField/types';
import { getErrorProps, numberTransformer } from '@/utils/forms';
import { type InvoiceItemFormValues } from './types';

type FormTextFieldProps<T> = {
  name: T;
  label: string;
  control: Control<InvoiceItemFormValues, unknown>;
  withValidation?: boolean;
} & ITextField;

const FormTextField = <T extends FieldPath<InvoiceItemFormValues>>({
  name,
  label,
  control,
  numberOnly,
  withValidation,
  ...rest
}: FormTextFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <TextField
        fullWidth
        inputSize="small"
        label={label}
        error={!!fieldState.error}
        numberOnly={numberOnly}
        {...(numberOnly
          ? numberTransformer.fieldProps(field)
          : {
              value: field.value,
              onChange: field.onChange,
            })}
        {...(withValidation ? { ...getErrorProps(fieldState) } : {})}
        {...rest}
      />
    )}
  />
);

export default FormTextField;
