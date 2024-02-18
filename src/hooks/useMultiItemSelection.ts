import { useMemo, useState } from 'react';
import { MultiselectUtil } from '@/utils/multiselect';

interface UseMultiItemSelectionOptions<T = string> {
  initialSelection?: T[];
}

export interface MultiItemSelectionApi<T> {
  selectedItems: T[];
  selectOne: (item: T) => void;
  selectMultiple: (items: T[]) => void;
  removeOne: (item: T) => void;
  removeMultiple: (items: T[]) => void;
  clear: () => void;
  isSelected: (item: T) => boolean;
  areSelected: (items: T[]) => boolean;
}

export function useMultiItemSelection<T>({
  initialSelection,
}: UseMultiItemSelectionOptions<T> = {}): MultiItemSelectionApi<T> {
  const [selectedItems, setSelectedItems] = useState<T[]>(
    initialSelection ?? [],
  );

  const value = useMemo(() => {
    function selectOne(newItem: T) {
      setSelectedItems((prev) =>
        MultiselectUtil.selectOneUnique(prev, newItem),
      );
    }

    function selectMultiple(newItems: T[]) {
      setSelectedItems((prev) =>
        MultiselectUtil.selectMultipleUnique(prev, newItems),
      );
    }

    function removeOne(item: T) {
      setSelectedItems((prev) => MultiselectUtil.removeOne(prev, item));
    }

    function removeMultiple(items: T[]) {
      setSelectedItems((prev) => MultiselectUtil.removeMultiple(prev, items));
    }

    function clear() {
      setSelectedItems([]);
    }

    function isSelected(item: T) {
      return MultiselectUtil.isSelected(selectedItems, item);
    }
    function areSelected(items: T[]) {
      return MultiselectUtil.areSelected(selectedItems, items);
    }

    return {
      selectedItems,
      selectOne,
      selectMultiple,
      removeOne,
      removeMultiple,
      clear,
      isSelected,
      areSelected,
    };
  }, [selectedItems]);

  return value;
}
