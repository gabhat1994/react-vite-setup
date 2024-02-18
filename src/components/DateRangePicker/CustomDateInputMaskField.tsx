import InputMask from 'react-input-mask';
import { type CustomDateFieldProps } from './types';
import { StyledTextField } from '../DatePicker/MaskedDatepicker/styles';

export const CustomDateInputMaskField = ({
  value,
  id,
  label,
  disabled = false,
  noBorder,
  isAlwaysFocus,
  inputSize,
  leftIcon,
  rightIcon,
  error = false,
  onChangeHandler,
}: CustomDateFieldProps) => (
  <StyledTextField
    data-testid="Styled-TextField-masked-input"
    inputSize={inputSize}
    isAlwaysFocus={isAlwaysFocus}
    error={error}
    disabled={disabled}
    leftIcon={!!leftIcon}
    rightIcon={!!rightIcon}
    label={label}
    noBorder={noBorder}
  >
    <InputMask
      // @ts-ignore
      formatChars={{
        '0': '[0-1]',
        '1': '[0-9]',
        '3': '[0-3]',
        '4': '[0-9]',
      }}
      mask="01/34/4444"
      placeholder="MM/DD/YYYY"
      onChange={onChangeHandler}
      value={value ?? undefined}
    />
    <fieldset>
      <legend>
        <span>{label}</span>
      </legend>
    </fieldset>
    <label data-testid="labelTestId" htmlFor={id}>
      {label}
    </label>
  </StyledTextField>
);
