import React, { type ComponentProps } from 'react';
import { TextField } from '../TextField';

type IncrementalNumberFieldProps = ComponentProps<typeof TextField> & {
  step?: number;
  min?: number;
  max?: number;
};

export const IncrementalNumberField = React.forwardRef<
  HTMLInputElement,
  IncrementalNumberFieldProps
>(({ step = 1, min, max, ...textFieldProps }, ref) => (
  <TextField
    ref={ref}
    type="number"
    step={step}
    min={min}
    max={max}
    {...textFieldProps}
  />
));
