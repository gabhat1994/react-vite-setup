import { type ComponentProps } from 'react';
import { TickCheckbox } from '@/components/Checkbox';

type RowSelectionCheckboxProps = Pick<
  ComponentProps<typeof TickCheckbox>,
  'isChecked' | 'onChange'
>;

export function RowSelectionCheckbox({
  isChecked,
  onChange,
}: RowSelectionCheckboxProps) {
  return <TickCheckbox isChecked={isChecked} onChange={onChange} size={16} />;
}
