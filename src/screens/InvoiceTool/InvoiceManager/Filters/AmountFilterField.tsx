import AmountRangePopover, {
  type AmountRangePopoverProps,
} from '@/components/AmountRangePopover/AmountRangePopover';
import { Icon } from '@/components/Icon';
import { InvoiceUtils } from '@/features/invoices/utils/invoice';
import { type RangeFilter } from '../types';
import { InvoiceFiltersUtils } from '../utils';

type AmountFilterFieldProps = {
  onChange(value?: RangeFilter<number>): void;
  value?: RangeFilter<number>;
};

export function AmountFilterField({ value, onChange }: AmountFilterFieldProps) {
  const rangeValue = {
    min: value?.from ?? 0,
    max: value?.to ?? 0,
  };

  const handleChange = (range?: AmountRangePopoverProps['value']) => {
    onChange({
      from: range?.min ?? undefined,
      to: range?.max ?? undefined,
    });
  };

  const onClearFilter = () => {
    onChange({
      from: undefined,
      to: undefined,
    });
  };

  const maxValueSuffix =
    rangeValue.max === InvoiceFiltersUtils.AMOUNT_FILTER_MAX_VALUE ? '+' : '';

  return (
    <AmountRangePopover
      value={rangeValue}
      min={0}
      max={InvoiceFiltersUtils.AMOUNT_FILTER_MAX_VALUE}
      label="Amount Range"
      maxValueSuffix={maxValueSuffix}
      renderValue={
        rangeValue.min > 0 || rangeValue.max > 0
          ? `${InvoiceUtils.formatAmount(
              rangeValue.min,
            )} - ${InvoiceUtils.formatAmount(rangeValue.max)}${maxValueSuffix}`
          : ''
      }
      rightIcon={
        !!rangeValue.min || !!rangeValue.max ? (
          <Icon
            name="clear_m"
            size={24}
            color="--icon-input-brand-primary-default"
            onClick={onClearFilter}
          />
        ) : null
      }
      onChange={handleChange}
    />
  );
}
