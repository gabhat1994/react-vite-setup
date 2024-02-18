import { cleanList } from '@/utils/list';
import { type AnyObject, type SortDirectionType } from './types';

function getOppositeSortingDirection(direction?: SortDirectionType) {
  return direction === 'asc' ? 'desc' : 'asc';
}

function mapRowSelectionToItems<D extends AnyObject>(
  data: D[],
  selectedIds: string[],
  getId: (item: D) => string,
): D[] {
  return cleanList(
    selectedIds.map((id) => data.find((item) => getId(item) === id)),
  );
}

export const DataGridUtils = {
  getOppositeSortingDirection,
  mapRowSelectionToItems,
};
