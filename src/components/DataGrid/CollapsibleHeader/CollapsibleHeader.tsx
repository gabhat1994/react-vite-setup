import { Stack } from '@/layout';
import { Icon } from '@/components/Icon';
import { TSpan } from '@/components/Typography';
import { useDataGrid } from '../DataGridContext';
import { type AnyObject } from '../types';
import { RowSelectionCheckbox } from '../RowSelection/Checkbox';
import { type TableColumn } from '../Table/Table';
import { DataGridUtils } from '../utils';
import { HeaderContent } from './styles';

interface CollapsibleHeaderProps<DataItem, TSort extends string = string> {
  columns: TableColumn<DataItem, TSort>[];
  keyExtractor: (item: DataItem) => string;
}

export function CollapsibleHeader<DataItem extends AnyObject>({
  columns,
  keyExtractor,
}: CollapsibleHeaderProps<DataItem>) {
  const { rowSelection, data, sorting, setSorting } = useDataGrid<DataItem>();

  const allRowIds = data.map(keyExtractor);
  const areAllRowsSelected =
    data.length > 0 && rowSelection.areSelected(allRowIds);

  return (
    <Stack gap={8}>
      <RowSelectionCheckbox
        isChecked={areAllRowsSelected}
        onChange={(checked) =>
          checked
            ? rowSelection.selectMultiple(allRowIds)
            : rowSelection.removeMultiple(allRowIds)
        }
      />
      {columns.map((column) => (
        <HeaderContent
          align="center"
          justify="space-between"
          width={column.width}
          fullWidth
          onClick={() => {
            if (!column.sortName) {
              return;
            }
            setSorting({
              column: column.sortName,
              direction:
                sorting?.column === column.sortName
                  ? DataGridUtils.getOppositeSortingDirection(
                      sorting?.direction,
                    )
                  : 'asc',
            });
          }}
        >
          <TSpan font="footnote-bold">{column.title}</TSpan>
          {column.sortName && sorting?.column === column.sortName ? (
            <Icon
              name={
                sorting.direction === 'asc'
                  ? 'chevron_small_up_m'
                  : 'chevron_small_down_m'
              }
              size={16}
            />
          ) : null}
        </HeaderContent>
      ))}
    </Stack>
  );
}
