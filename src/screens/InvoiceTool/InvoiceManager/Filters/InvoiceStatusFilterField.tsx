import { useMemo } from 'react';
import { InvoiceStatusEnum } from '@/apollo/generated/types';
import { type DropdownValueType } from '@/components/Dropdown';
import {
  MultiselectField,
  type MultiselectFieldProps,
} from '@/components/MultiselectField';

type StatusFilterProps = Pick<
  MultiselectFieldProps<InvoiceStatusEnum, InvoiceStatusEnum>,
  'value' | 'onChange'
>;

export function InvoiceStatusFilterField({
  value,
  onChange,
}: StatusFilterProps) {
  const options = useMemo<
    DropdownValueType<InvoiceStatusEnum, InvoiceStatusEnum>[]
  >(
    () => [
      {
        key: InvoiceStatusEnum.Draft,
        value: InvoiceStatusEnum.Draft,
        label: 'Draft',
        type: 'value',
      },
      {
        key: InvoiceStatusEnum.Cancelled,
        value: InvoiceStatusEnum.Cancelled,
        label: 'Cancelled',
        type: 'value',
      },
      {
        key: InvoiceStatusEnum.Issued,
        value: InvoiceStatusEnum.Issued,
        label: 'Open',
        type: 'value',
      },
      {
        key: InvoiceStatusEnum.Overdue,
        value: InvoiceStatusEnum.Overdue,
        label: 'Overdue',
        type: 'value',
      },
      {
        key: InvoiceStatusEnum.Paid,
        value: InvoiceStatusEnum.Paid,
        label: 'Paid',
        type: 'value',
      },
      {
        key: InvoiceStatusEnum.PartiallyPaid,
        value: InvoiceStatusEnum.PartiallyPaid,
        label: 'Partially Paid',
        type: 'value',
      },
      {
        key: InvoiceStatusEnum.WriteOff,
        value: InvoiceStatusEnum.WriteOff,
        label: 'Write Off',
        type: 'value',
      },
    ],
    [],
  );

  return (
    <MultiselectField<InvoiceStatusEnum, InvoiceStatusEnum>
      inputSize="small"
      value={value}
      options={options}
      label="Status"
      onChange={onChange}
      usePortal
      renderContainerFromBottom
    />
  );
}
