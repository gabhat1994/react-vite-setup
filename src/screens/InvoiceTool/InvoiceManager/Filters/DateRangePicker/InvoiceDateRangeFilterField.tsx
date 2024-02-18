import { CaptionNavigation, type DateRange } from 'react-day-picker';
import { useRef, useState } from 'react';
import { endOfDay, format, isValid, startOfDay } from 'date-fns';
import { DatePicker } from '@/components/DatePicker';
import { Icon } from '@/components/Icon';
import { Stack } from '@/layout';
import { Button } from '@/components/Button';
import { TSpan } from '@/components/Typography';
import { Separator } from '@/components/Separator/Separator';
import { type DatePickerRefProps } from '@/components/DatePicker/types';
import S from '../styles';
import { type RangeFilter } from '../../types';
import { CustomDateInput } from './CustomDateInput';
import { MASK_DATE_FORMAT } from './utils';

type StatusFilterProps = {
  onChange(value?: RangeFilter<string>): void;
  value?: RangeFilter<string>;
};

export function InvoiceDateRangeFilterField({
  value,
  onChange,
}: StatusFilterProps) {
  const pickerRef = useRef<DatePickerRefProps>(null);

  const dateValue = {
    from: value?.from ? new Date(value.from) : undefined,
    to: value?.to ? new Date(value.to) : undefined,
  };

  const [dateRange, setDateRange] = useState<DateRange>(() => ({
    from: dateValue.from,
    to: dateValue.to,
  }));

  const isValidFrom = isValid(dateRange.from);
  const isValidTo = isValid(dateRange.to);

  const areCustomDatesValid = isValidFrom && isValidTo;

  const handleChange = () => {
    onChange({
      from: dateRange?.from?.toISOString() ?? '',
      to: dateRange?.to?.toISOString() ?? '',
    });
  };

  const onClearFilter = () => {
    setDateRange({ from: undefined, to: undefined });
    onChange({
      from: undefined,
      to: undefined,
    });
  };

  const handleConfirm = () => {
    handleChange();
    pickerRef?.current?.onClose();
  };

  const displayValue =
    dateValue?.from && dateValue.to
      ? `${format(dateValue.from, MASK_DATE_FORMAT)} - ${format(
          dateValue.to,
          MASK_DATE_FORMAT,
        )}`
      : '';

  return (
    <DatePicker
      rangeValue={dateRange}
      customDisplayValue={displayValue}
      fullSize
      ref={pickerRef}
      placement="bottom-end"
      dateFormat="MMM dd, yyyy"
      size="small"
      showIcon
      mode="range"
      onChangeRange={(val) =>
        setDateRange({
          from: val?.from ? startOfDay(val.from) : undefined,
          to: val?.to ? endOfDay(val.to) : undefined,
        })
      }
      label="Date range"
      renderCaption={(date) => (
        <Stack vertical gap={16}>
          <TSpan
            font="body-m-bold"
            colorToken="--text-datepicker-neutral-highlighted"
          >
            Custom Timeframe
          </TSpan>
          <Stack gap={16}>
            <CustomDateInput
              value={dateRange?.from}
              label="Start Date"
              onChange={(from) => setDateRange((prev) => ({ ...prev, from }))}
            />
            <CustomDateInput
              value={dateRange?.to}
              label="End Date"
              onChange={(to) => setDateRange((prev) => ({ ...prev, to }))}
            />
          </Stack>
          <S.CaptionNavigation fullWidth align="center" justify="space-between">
            <CaptionNavigation displayMonth={date} />
          </S.CaptionNavigation>
        </Stack>
      )}
      renderFooter={() => (
        <tfoot>
          <tr>
            <td colSpan={8}>
              <Separator />
            </td>
          </tr>
          <tr>
            <td colSpan={8}>
              <Stack fullWidth justify="end">
                <Button
                  disabled={!areCustomDatesValid}
                  primary
                  grow
                  onClick={handleConfirm}
                  size="small"
                >
                  Select
                </Button>
              </Stack>
            </td>
          </tr>
        </tfoot>
      )}
      customIcon={
        !!dateValue.from || !!dateValue.to ? (
          <Icon
            name="clear_m"
            size={24}
            color="--icon-input-brand-primary-default"
            onClick={onClearFilter}
          />
        ) : null
      }
    />
  );
}
