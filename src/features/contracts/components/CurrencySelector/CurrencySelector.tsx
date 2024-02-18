import { SelectField } from '@/components/SelectField';
import { type SelectFieldProps } from '@/components/SelectField/SelectField';
import { InvoiceUtils } from '@/features/invoices/utils/invoice';

type CurrencySelectorProps = Omit<
  SelectFieldProps<string>,
  'onChange' | 'options'
> & {
  onChange: (value: string | undefined) => void;
};

export function CurrencySelector({
  onChange,
  ...selectFieldProps
}: CurrencySelectorProps) {
  return (
    <SelectField
      {...selectFieldProps}
      hideIcons={false}
      disabledIconColor={false}
      onChange={(option) => onChange(option.value)}
      options={InvoiceUtils.currencyOptions}
    />
  );
}
