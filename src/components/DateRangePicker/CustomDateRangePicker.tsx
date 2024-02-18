import { useMemo, useState, useRef, useEffect, type ChangeEvent } from 'react';
import { format } from 'date-fns';
import { type DateRange, DayPicker } from 'react-day-picker';
import { usePopper } from 'react-popper';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/Button/Button';
import { useClickOutside } from '@/hooks';
import { Spacer } from '@/layout/Stack/Spacer';
import {
  DateFieldsContainer,
  ButtonWrapper,
  StyledTimeFrameTitle,
} from './styles';
import { type CustomDateRangePickerProps } from './types';
import {
  classNames,
  customStyles,
  DatePickerWrapper,
  HelperText,
  PickerPopupWrapper,
} from '../DatePicker/styles';
import { dateValidation } from '../DatePicker/MaskedDatepicker/helper';
import { CustomDateInputMaskField } from './CustomDateInputMaskField';
import { type DatePickerColor } from '../DatePicker/types';

export const CustomDateRangePicker = ({
  dateFormat = 'MM/dd/yyyy',
  disabled = false,
  error = false,
  fullSize,
  helperText = '',
  layout = 'dropdown',
  maxDate,
  minDate,
  minWidth,
  placement = 'bottom-end',
  testId,
  value,
  onConfirm = () => {},
  popperReference,
  isOpen,
  setIsOpen,
  noBorder,
  isAlwaysFocus,
  inputSize,
  leftIcon,
  rightIcon,
  fromLabel,
  toLabel,
}: CustomDateRangePickerProps) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const {
    styles: { popper: popperStyles },
    attributes: { popper: popperAttributes },
  } = usePopper(popperReference, popperElement, {
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

  const [range, setRange] = useState<DateRange | undefined>(value);
  const [inputFromValue, setInputFromValue] = useState<string>('');
  const [inputToValue, setInputToValue] = useState<string>('');
  const [enableConfirm, setEnableConfirm] = useState<boolean>(true);
  useEffect(() => {
    setRange(value);
  }, [value]);

  useClickOutside(containerRef, !isOpen, () => setIsOpen(false));

  const editDisabled = useMemo(
    () => typeof disabled === 'boolean' && disabled === true,
    [disabled],
  );

  const colorValue = useMemo<DatePickerColor>(() => {
    if (value) return 'main';
    return 'placeholder';
  }, [value]);

  useEffect(() => {
    if (range) {
      const from = range?.from ? format(range?.from, dateFormat) : '';
      const to = range?.to ? format(range?.to, dateFormat) : '';
      setInputToValue(to);
      setInputFromValue(from);
    }
  }, [range, dateFormat]);

  const onChangeHandler = (
    event: ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    const { value: dateValue } = event.target;
    const { isValidDate, isValidMonth, isValidYear } =
      dateValidation(dateValue);
    if (type === 'from') {
      setInputFromValue(dateValue);
    } else {
      setInputToValue(dateValue);
    }

    if (isValidMonth && isValidDate && isValidYear) {
      setRange({
        ...(range as DateRange),
        [type]: new Date(dateValue),
      });
      setEnableConfirm(true);
    } else {
      setEnableConfirm(false);
    }
  };

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
                <StyledTimeFrameTitle
                  font="body-m-bold"
                  textAlign="left"
                  colorToken="--text-modal-header-neutral-default"
                >
                  {t(`noumena.noum.dashboard.customRange.timeframe.title`)}
                </StyledTimeFrameTitle>
                <DateFieldsContainer>
                  <CustomDateInputMaskField
                    noBorder={noBorder}
                    isAlwaysFocus={isAlwaysFocus}
                    inputSize={inputSize}
                    leftIcon={!!leftIcon}
                    rightIcon={!!rightIcon}
                    onChangeHandler={(e) => {
                      onChangeHandler(e, 'from');
                    }}
                    value={inputFromValue || ''}
                    dateFormat={dateFormat}
                    label={fromLabel}
                  />
                  <CustomDateInputMaskField
                    noBorder={noBorder}
                    isAlwaysFocus={isAlwaysFocus}
                    inputSize={inputSize}
                    leftIcon={!!leftIcon}
                    rightIcon={!!rightIcon}
                    onChangeHandler={(e) => {
                      onChangeHandler(e, 'to');
                    }}
                    label={toLabel}
                    value={inputToValue || ''}
                    dateFormat={dateFormat}
                  />
                </DateFieldsContainer>
                <DayPicker
                  mode="range"
                  selected={range}
                  onSelect={setRange}
                  fromDate={minDate}
                  toDate={maxDate}
                  classNames={classNames}
                  styles={customStyles}
                  captionLayout={layout}
                  min={2}
                  footer={
                    <ButtonWrapper>
                      <Button
                        size="small"
                        onClick={() => setIsOpen(false)}
                        tertiary
                      >
                        {t('noumena.cancel')}
                      </Button>
                      <Spacer width={8} />
                      <Button
                        size="small"
                        onClick={() => {
                          setIsOpen(false);
                          onConfirm(range);
                          setRange(value);
                        }}
                        primary
                        disabled={!enableConfirm}
                      >
                        {t('noumena.confirm')}
                      </Button>
                    </ButtonWrapper>
                  }
                />
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
};
