import React, { createContext, useContext, useMemo, useState } from 'react';
import { useMultiItemSelection } from '@/hooks/useMultiItemSelection';
import {
  type AnyObject,
  type DataGridContextType,
  type DataGridProviderProps,
  type DataGridSorting,
} from './types';
import { DataGridUtils } from './utils';

const DataGridContext = createContext(null as unknown);

export function DataGridProvider<
  DataItem extends AnyObject,
  TSort extends string = string,
>({ children, data, defaultSorting }: DataGridProviderProps<DataItem, TSort>) {
  const multiItemSelection = useMultiItemSelection<string>();
  const [sorting, setSorting] = useState<DataGridSorting<TSort> | null>(
    defaultSorting ?? null,
  );

  const value = useMemo<DataGridContextType<DataItem, TSort>>(
    () => ({
      data,
      rowSelection: multiItemSelection,
      getRowSelectionItems: (getId) =>
        DataGridUtils.mapRowSelectionToItems(
          data,
          multiItemSelection.selectedItems,
          getId,
        ),
      sorting,
      setSorting,
    }),
    [data, multiItemSelection, sorting],
  );

  return (
    <DataGridContext.Provider value={value}>
      {children}
    </DataGridContext.Provider>
  );
}

export function useDataGrid<
  DataItem extends AnyObject = AnyObject,
  TSort extends string = string,
>() {
  const dataGrid = useContext<DataGridContextType<DataItem, TSort>>(
    DataGridContext as unknown as React.Context<
      DataGridContextType<DataItem, TSort>
    >,
  );

  if (!dataGrid) {
    throw new Error('useDataGrid must be called under DataGridProvider.');
  }

  return dataGrid;
}
