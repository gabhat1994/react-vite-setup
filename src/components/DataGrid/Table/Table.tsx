import React, { type ReactNode } from 'react';
import { Icon } from '@/components/Icon';
import { Stack } from '@/layout';
import { useDataGrid } from '../DataGridContext';
import { RowSelectionCheckbox } from '../RowSelection/Checkbox';
import { type AnyObject } from '../types';
import { DataGridUtils } from '../utils';
import S from './styles';
import { TableLoadingSkeleton } from './TableLoadingSkeleton';
import { TableNoResults } from './TableNoResults';

export interface TableColumn<T, TSort extends string = string> {
  id: string;
  title: React.ReactNode;
  sortName?: TSort;
  renderValue: (item: T) => ReactNode;
  wordWrap?: boolean;
  width?: string;
}

interface TableProps<DataItem, TSort extends string = string> {
  data?: DataItem[];
  columns: TableColumn<DataItem, TSort>[];
  keyExtractor: (item: DataItem) => string;
  onRowClick?: (item: DataItem) => void;
  enableRowSelection?: boolean;
  wordWrap?: boolean;
  loading?: boolean;
  rowsPerPage: number;
  noResultsMessage?: React.ReactNode;
  noResultsMessageRowSpan?: number;
}

export function Table<
  DataItem extends AnyObject,
  TSort extends string = string,
>({
  data,
  columns,
  keyExtractor,
  onRowClick,
  rowsPerPage,
  enableRowSelection = false,
  wordWrap = true,
  loading = false,
  noResultsMessage,
  noResultsMessageRowSpan = rowsPerPage,
}: TableProps<DataItem, TSort>) {
  const {
    data: contextData,
    rowSelection,
    sorting,
    setSorting,
  } = useDataGrid<DataItem>();

  const rows = data ?? contextData;

  const allRowIds = rows.map(keyExtractor);
  const areAllRowsSelected =
    rows.length > 0 && rowSelection.areSelected(allRowIds);

  const totalColumnsCount = columns.length + (enableRowSelection ? 1 : 0);

  return (
    <S.Table>
      <S.TableHead>
        <S.TableRow>
          {enableRowSelection && (
            <S.TableHeader $width="1px">
              <RowSelectionCheckbox
                isChecked={areAllRowsSelected}
                onChange={(checked) =>
                  checked
                    ? rowSelection.selectMultiple(allRowIds)
                    : rowSelection.removeMultiple(allRowIds)
                }
              />
            </S.TableHeader>
          )}
          {columns.map((column) => (
            <S.TableHeader
              key={column.id}
              $wordWrap={column.wordWrap ?? wordWrap}
              $width={column.width}
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
              <Stack align="center">
                {column.title}
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
              </Stack>
            </S.TableHeader>
          ))}
        </S.TableRow>
      </S.TableHead>
      <S.TableBody>
        {loading && rows.length === 0 ? (
          <TableLoadingSkeleton
            rowsCount={rowsPerPage}
            columnsCount={totalColumnsCount}
          />
        ) : rows.length === 0 ? (
          <TableNoResults
            rowsCount={noResultsMessageRowSpan}
            columnsCount={totalColumnsCount}
            message={noResultsMessage}
          />
        ) : (
          rows.map((item) => {
            const rowKey = keyExtractor(item);

            return (
              <S.TableRow
                key={rowKey}
                $clickable={!!onRowClick}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
              >
                {enableRowSelection && (
                  <S.TableCell $width="1px" $wordWrap={true}>
                    <RowSelectionCheckbox
                      isChecked={rowSelection.isSelected(rowKey)}
                      onChange={(checked) =>
                        checked
                          ? rowSelection.selectOne(rowKey)
                          : rowSelection.removeOne(rowKey)
                      }
                    />
                  </S.TableCell>
                )}
                {columns.map((column) => {
                  const renderedValue = column.renderValue(item);
                  return (
                    <S.TableCell
                      key={column.id}
                      $wordWrap={column.wordWrap ?? wordWrap}
                      $width={column.width}
                    >
                      {renderedValue}
                    </S.TableCell>
                  );
                })}
              </S.TableRow>
            );
          })
        )}
      </S.TableBody>
    </S.Table>
  );
}
