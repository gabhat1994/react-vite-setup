import {
  useCallback,
  useMemo,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { format } from 'date-fns';
import { type DateRange, DayPicker, Caption } from 'react-day-picker';
import { usePopper } from 'react-popper';
import { motion, AnimatePresence } from 'framer-motion';

import { useClickOutside } from '@/hooks';
import {
  DatePickerWrapper,
  DateField,
  HelperText,
  PickerPopupWrapper,
  classNames,
  customStyles,
} from './styles';
import {
  type DatePickerColor,
  type DatePickerProps,
  type DatePickerRefProps,
} from './types';
import { Icon } from '../Icon';

export const DatePicker = forwardRef<DatePickerRefProps, DatePickerProps>(
  (
    {
      borderOnFocus = true,
      dateFormat = 'MMM dd, yyyy',
      disabled,
      error,
      fromYear = new Date().getFullYear(),
      fullSize,
      helperText = '',
      label = '',
      layout = 'buttons',
      maxDate,
      minDate,
      minWidth,
      minPopperWidth,
      placement = 'bottom',
      required,
      mode = 'single',
      showIcon = true,
      size = 'large',
      testId,
      toYear = new Date().getFullYear() + 1,
      value,
      rangeValue,
      placeholder,
      onChange,
      onChangeRange,
      renderCaption,
      renderFooter,
      customIcon,
      customDisplayValue,
    },
    forwardedRef,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [referenceElement, setReferenceElement] =
      useState<HTMLSpanElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLElement | null>(
      null,
    );
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

    useImperativeHandle(forwardedRef, () => ({
      onClose: () => setIsOpen(false),
    }));

    useClickOutside(containerRef, !isOpen, () => setIsOpen(false));

    const editDisabled = useMemo(
      () => typeof disabled === 'boolean' && disabled === true,
      [disabled],
    );

    const displayedValue = useMemo(() => {
      if (typeof customDisplayValue === 'string') return customDisplayValue;
      if (value) return format(value, dateFormat);
      if (rangeValue && rangeValue.from && rangeValue.to)
        return `${format(rangeValue.from, dateFormat)} - ${format(
          rangeValue.to,
          dateFormat,
        )}`;
      return placeholder ?? null;
    }, [customDisplayValue, value, dateFormat, rangeValue, placeholder]);

    const colorValue = useMemo<DatePickerColor>(() => {
      if (value) return 'main';
      return 'placeholder';
    }, [value]);

    const borderStyle = useMemo(() => {
      let wrapperBorder = 'transparent';
      let fieldBorder = 'transparent';
      if (error) {
        if (!label || (!isOpen && !value)) {
          wrapperBorder = 'var(--border-input-danger-primary-default)';
        } else {
          fieldBorder = 'var(--border-input-danger-primary-default)';
        }
      } else if (isOpen && borderOnFocus) {
        if (label) {
          fieldBorder = 'var(--border-input-brand-primary-default)';
        } else {
          wrapperBorder = 'var(--border-input-brand-primary-default)';
        }
      }

      return { wrapperBorder, fieldBorder };
    }, [borderOnFocus, error, isOpen, label, value]);

    const handleSwitch = useCallback(() => {
      if (editDisabled) return;
      setIsOpen(!isOpen);
    }, [editDisabled, isOpen]);

    const handleSelect = useCallback(
      (date?: Date) => {
        onChange?.(date);
        setIsOpen(false);
      },
      [onChange],
    );

    const handleSelectRange = useCallback(
      (range?: DateRange) => {
        onChangeRange?.(range);
      },
      [onChangeRange],
    );

    return (
      <>
        <DatePickerWrapper
          ref={containerRef}
          data-testid={testId || 'date-picker'}
          color={colorValue}
          fullSize={fullSize}
          minWidth={minWidth}
          error={error}
          disabled={editDisabled}
        >
          <DateField
            data-testid="date-picker-date-field"
            className="dateField"
            ref={setReferenceElement}
            onClick={handleSwitch}
            value={value ?? (rangeValue?.from || rangeValue?.to)}
            size={size}
            color={colorValue}
            label={label}
            wrapperBorder={borderStyle.wrapperBorder}
            fieldBorder={borderStyle.fieldBorder}
            isOpen={isOpen}
            error={error}
            disabled={editDisabled}
            hasPlaceholder={!!placeholder}
            displayedValue={!!displayedValue}
          >
            {displayedValue}
            {!customIcon && showIcon ? (
              <Icon
                name="calendar_xs"
                size={24}
                color="--icon-input-neutral-default"
              />
            ) : (
              customIcon || null
            )}
          </DateField>
          {!!label && (
            <>
              <fieldset>
                <legend>
                  <span>{label}</span>
                </legend>
              </fieldset>
              <label data-testid="labelTestId" htmlFor={label}>
                {label}
              </label>
            </>
          )}
          {isOpen && (
            <PickerPopupWrapper
              data-testid="date-picker-calendar-testid"
              ref={setPopperElement}
              style={{ ...popperStyles, minWidth: minPopperWidth }}
              {...popperAttributes}
            >
              <AnimatePresence>
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  style={{ height: 'unset' }}
                >
                  {mode === 'single' ? (
                    <DayPicker
                      required={required}
                      mode="single"
                      selected={value ?? undefined}
                      onSelect={handleSelect}
                      fromDate={minDate}
                      toDate={maxDate}
                      classNames={classNames}
                      defaultMonth={value ?? undefined}
                      styles={customStyles}
                      fromYear={fromYear}
                      toYear={toYear}
                      disabled={disabled}
                      captionLayout={layout}
                    />
                  ) : (
                    <DayPicker
                      mode="range"
                      selected={rangeValue}
                      onSelect={handleSelectRange}
                      components={{
                        Caption: (props) =>
                          renderCaption ? (
                            renderCaption(props.displayMonth)
                          ) : (
                            <Caption {...props} />
                          ),
                        Footer: () => (renderFooter ? renderFooter() : null),
                      }}
                      fromDate={minDate}
                      toDate={maxDate}
                      classNames={classNames}
                      defaultMonth={value ?? undefined}
                      styles={customStyles}
                      fromYear={fromYear}
                      toYear={toYear}
                      disabled={disabled}
                      captionLayout={layout}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </PickerPopupWrapper>
          )}
        </DatePickerWrapper>
        {!!helperText && (
          <HelperText error={error} disabled={editDisabled}>
            {helperText}
          </HelperText>
        )}
      </>
    );
  },
);

export default DatePicker;
