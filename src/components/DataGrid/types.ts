import { type MultiItemSelectionApi } from '@/hooks/useMultiItemSelection';

export type AnyObject = Record<string, unknown>;

export interface DataGridContextType<
  DataItem extends AnyObject = AnyObject,
  TSort extends string = string,
> {
  data: DataItem[];
  rowSelection: MultiItemSelectionApi<string>;
  getRowSelectionItems: (getId: (item: DataItem) => string) => DataItem[];
  sorting: DataGridSorting<TSort> | null;
  setSorting: (sorting: DataGridSorting<TSort>) => void;
}

export interface DataGridProviderProps<
  DataItem extends AnyObject = AnyObject,
  TSort extends string = string,
> {
  children: React.ReactNode;
  data: DataItem[];
  defaultSorting?: DataGridSorting<TSort>;
}

export type DataGridSorting<T extends string> = {
  column: T;
  direction: SortDirectionType;
};

export type SortDirectionType = 'asc' | 'desc';
