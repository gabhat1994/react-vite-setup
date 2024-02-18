import { useCallback, useEffect, useState } from 'react';
import { type DateRange } from 'react-day-picker';
import { addDays, format } from 'date-fns';
import { t } from 'i18next';
import { Dropdown, type DropdownValueType } from '@/components/Dropdown';
import { TextField } from '@/components/TextField';
import { Icon } from '@/components/Icon';
import { getPredefinedDateRange } from '@/utils/date';
import { CustomDateRangePicker } from '@/components/DateRangePicker';
import { DateRangeContainer } from '../styles';
import { NoumDashboardMetricsModalTabEnum } from '../types';

type DateRangePickerProps = {
  defaultSelected: DateRange;
  onDateChange: (range: DateRange) => void;
  referenceElement: HTMLSpanElement | null;
  dateRangeOptions: DropdownValueType<string>[];
  selectedTab: NoumDashboardMetricsModalTabEnum;
};

const defaultCustomRangeSelected: DateRange = {
  from: new Date(),
  to: addDays(new Date(), 4),
};
export const DateRangePicker = ({
  defaultSelected,
  onDateChange,
  referenceElement,
  dateRangeOptions,
  selectedTab,
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomRangeOpen, setIsCustomRangeOpen] = useState(false);
  const [range, setRange] = useState<DateRange>(defaultSelected);
  const [selectedOption, setSelectedOption] = useState<
    DropdownValueType<string>
  >(dateRangeOptions[0]);

  useEffect(() => {
    setRange(defaultSelected);
  }, [defaultSelected]);

  const [customValue, setCustomValue] = useState<DateRange>(
    defaultCustomRangeSelected,
  );
  const handleSelectDateRange = useCallback(
    (option: DropdownValueType<string>) => {
      setSelectedOption(option);
      if (option.value === 'custom') {
        setIsCustomRangeOpen(true);
        return;
      }
      setRange(
        option.value === 'custom' || option.value === 'lifetime'
          ? defaultSelected
          : getPredefinedDateRange(option.value),
      );
    },
    [defaultSelected],
  );

  useEffect(() => {
    onDateChange(range);
  }, [onDateChange, range]);

  useEffect(() => {
    if (selectedTab === NoumDashboardMetricsModalTabEnum.Connected) {
      setSelectedOption(dateRangeOptions[0]);
    }
  }, [dateRangeOptions, selectedTab]);

  useEffect(() => {
    if (isCustomRangeOpen) {
      setCustomValue(defaultCustomRangeSelected);
    }
  }, [isCustomRangeOpen]);

  const getRangeDisplayedValue = useCallback(() => {
    const dateFormat = 'MM/dd/yyyy';
    if (
      selectedTab === NoumDashboardMetricsModalTabEnum.Connected &&
      selectedOption?.value === 'lifetime'
    )
      return t(`noumena.date_range.lifetime`);
    if (range?.from && range?.to)
      return `${format(range.from, dateFormat)} - ${format(
        range.to,
        dateFormat,
      )}`;
    return '';
  }, [range.from, range.to, selectedOption?.value, selectedTab]);

  return (
    <>
      <DateRangeContainer>
        <Dropdown
          containerWidth="250px"
          options={dateRangeOptions}
          closeOnSelect={true}
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          onSelectOption={handleSelectDateRange}
          hideIcons
          hideLeftIconPlace
          placement="bottom-end"
        >
          {({ inputProps, inputRef, toggle }) => (
            <TextField
              readOnly
              ref={inputRef}
              {...inputProps}
              label={t(`noumena.noum.dashboard.date_range`)}
              value={getRangeDisplayedValue()}
              leftIcon={
                <Icon
                  name="calendar_xs"
                  size={24}
                  color="--icon-input-neutral-default"
                  onClick={toggle}
                />
              }
            />
          )}
        </Dropdown>
      </DateRangeContainer>
      <CustomDateRangePicker
        onConfirm={(customRange) => {
          setRange(customRange as DateRange);
        }}
        fromLabel={t(`noumena.noum.dashboard.customRange.startdate`)}
        toLabel={t(`noumena.noum.dashboard.customRange.enddate`)}
        isOpen={isCustomRangeOpen}
        popperReference={referenceElement}
        setIsOpen={setIsCustomRangeOpen}
        fullSize
        value={range || customValue}
        minWidth="350px"
        inputSize="small"
      />
    </>
  );
};
