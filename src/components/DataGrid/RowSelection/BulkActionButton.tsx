import { type ComponentProps } from 'react';
import { Button } from '@/components/Button';
import { useDataGrid } from '../DataGridContext';

export type BulkActionButtonProps = Omit<
  ComponentProps<typeof Button>,
  'onClick'
> & {
  onClick: (selectedItems: string[]) => void;
};

export function BulkActionButton(props: BulkActionButtonProps) {
  const { rowSelection } = useDataGrid();

  return (
    <Button
      {...props}
      disabled={props.disabled || rowSelection.selectedItems.length === 0}
      onClick={() => {
        rowSelection.clear();
        props.onClick(rowSelection.selectedItems);
      }}
    />
  );
}
