import { type Maybe } from '@/common/types';

export function reorderList<T>(
  list: T[],
  startIndex: number,
  endIndex: number,
): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export function replaceItemAtIndex<T>(list: T[], index: number, newValue: T) {
  const result = Array.from(list);
  return [...result.slice(0, index), newValue, ...result.slice(index + 1)];
}

export function removeItemAtIndex<T>(list: T[], index: number) {
  const result = Array.from(list);
  return [...result.slice(0, index), ...result.slice(index + 1)];
}

export function cleanList<T>(list: Maybe<Array<Maybe<T>>>): Array<T> {
  if (!list) return [];
  return list.filter((el) => !!el) as Array<T>;
}

export function sortList<T>(list: Array<T>, sortBy: keyof T): Array<T> {
  return list.sort((a, b) => {
    if ((a?.[sortBy] ?? 0) > (b?.[sortBy] ?? 0)) {
      return -1;
    }
    if ((b?.[sortBy] ?? 0) > (a?.[sortBy] ?? 0)) {
      return 1;
    }
    return 0;
  });
}

export function findMatchingItemRecursively<T>(
  items: T[],
  predicate: (item: T) => boolean,
  nestBy: (item: T) => T[] | undefined,
): T | null {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of items) {
    if (predicate(item)) {
      return item;
    }

    const nestedArray = nestBy(item);
    if (nestedArray) {
      const nestedMatching = findMatchingItemRecursively(
        nestedArray,
        predicate,
        nestBy,
      );
      if (nestedMatching) {
        return nestedMatching;
      }
    }
  }

  return null;
}
