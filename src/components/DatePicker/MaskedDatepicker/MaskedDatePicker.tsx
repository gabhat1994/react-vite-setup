import {
  useCallback,
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
} from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { usePopper } from 'react-popper';
import { motion, AnimatePresence } from 'framer-motion';
import InputMask from 'react-input-mask';
import { useClickOutside } from '@/hooks';
import { Icon } from '@/components/Icon';
import {
  DatePickerWrapper,
  PickerPopupWrapper,
  classNames,
  customStyles,
} from '../styles';
import { type DatePickerProps } from '../types';

import {
  StyledTextField,
  type ITextField,
  Container,
  RightIcon,
} from './styles';
import { dateValidation } from './helper';

export const MaskedDatePicker = ({
  required,
  minDate,
  maxDate,
  value,
  onChange,
  dateFormat = 'MM/dd/yyyy',
  placement = 'bottom',
  fromYear = new Date().getFullYear() - 1,
  toYear = new Date().getFullYear() + 1,
  id,
  label,
  disabled = false,
  noBorder,
  isAlwaysFocus,
  inputSize,
  leftIcon,
  rightIcon,
  rightIconColor,
  error = false,
  fullWidth = true,
  centerHelperText = false,
}: DatePickerProps & ITextField) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const {
    styles: { popper: popperStyles },
    attributes: { popper: popperAttributes },
  } = usePopper(referenceElement, popperElement, {
    placement,
    modifiers: [
      { name: 'arrow', options: {} },
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });

  useClickOutside(containerRef, !isOpen, () => setIsOpen(false));

  const handleSelect = useCallback(
    (date?: Date) => {
      onChange?.(date);
      setIsOpen(false);
    },
    [onChange],
  );

  useEffect(() => {
    if (value) {
      const formattedDate = format(value, dateFormat);
      setInputValue(formattedDate);
    }
  }, [value, dateFormat]);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setIsOpen(false);
    const { value: dateValue } = event.target;
    const { isValidDate, isValidMonth, isValidYear } =
      dateValidation(dateValue);

    setInputValue(dateValue);

    if (isValidMonth && isValidDate && isValidYear) {
      onChange?.(new Date(format(new Date(dateValue), dateFormat)));
    } else {
      onChange?.(undefined);
    }
  };

  return (
    <DatePickerWrapper data-testid="date-picker-testid" ref={containerRef}>
      <Container fullWidth={fullWidth} centerHelperText={centerHelperText}>
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
          <RightIcon iconColor={rightIconColor} ref={setReferenceElement}>
            <Icon
              name="calendar_xs"
              size={24}
              color="--color-base-gray-50"
              onClick={() => setIsOpen((prv) => !prv)}
            />
          </RightIcon>
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
            value={inputValue}
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
      </Container>
      {isOpen && (
        <PickerPopupWrapper
          data-testid="date-picker-calendar-testid"
          ref={setPopperElement}
          style={popperStyles}
          {...popperAttributes}
        >
          <AnimatePresence>
            <motion.div
              onClick={(e) => e.stopPropagation()}
              style={{ height: 'unset' }}
            >
              <DayPicker
                required={required}
                mode="single"
                selected={value}
                onSelect={handleSelect}
                fromDate={minDate}
                toDate={maxDate}
                classNames={classNames}
                defaultMonth={value}
                styles={customStyles}
                fromYear={fromYear}
                toYear={toYear}
                captionLayout="dropdown"
                disabled={disabled}
              />
            </motion.div>
          </AnimatePresence>
        </PickerPopupWrapper>
      )}
    </DatePickerWrapper>
  );
};
