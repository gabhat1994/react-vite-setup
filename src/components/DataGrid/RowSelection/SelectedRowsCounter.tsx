import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { useDataGrid } from '../DataGridContext';

export interface SelectedRowsCounterProps {
  render?: (selectedItemsCount: number) => JSX.Element | null;
}

export function SelectedRowsCounter({ render }: SelectedRowsCounterProps) {
  const { t } = useTranslation();
  const { rowSelection } = useDataGrid();
  const selectedItemsCount = rowSelection.selectedItems.length;

  return (
    <TSpan font="body-m" colorToken="--text-card-neutral-default">
      {typeof render === 'function'
        ? render(selectedItemsCount)
        : t('noumena.data_grid.rows_selected', { count: selectedItemsCount })}
    </TSpan>
  );
}
