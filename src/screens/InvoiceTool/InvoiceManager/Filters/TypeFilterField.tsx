import { useMemo } from 'react';
import { type DropdownValueType } from '@/components/Dropdown';
import {
  MultiselectField,
  type MultiselectFieldProps,
} from '@/components/MultiselectField';
import { InvoiceType } from '@/apollo/generated/types';

type TypeFilterFieldProps = Pick<
  MultiselectFieldProps<string>,
  'value' | 'onChange'
>;

export function TypeFilterField({ value, onChange }: TypeFilterFieldProps) {
  const options = useMemo<DropdownValueType<string>[]>(
    () => [
      {
        key: InvoiceType.Issued,
        label: 'Issued',
        type: 'value',
        value: InvoiceType.Issued,
      },
      {
        key: InvoiceType.Received,
        label: 'Received',
        type: 'value',
        value: InvoiceType.Received,
      },
    ],
    [],
  );

  return (
    <MultiselectField
      options={options}
      maxContainerHeight="300px"
      inputSize="small"
      renderStickyHeader={() => {}}
      label="Type"
      hideIcons={true}
      value={value}
      onChange={onChange}
      usePortal
      renderContainerFromBottom
    />
  );
}
