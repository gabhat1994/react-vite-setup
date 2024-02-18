import { uniq } from 'lodash';

interface Comparer<T = unknown> {
  (a: T, b: T): boolean;
}

const identityComparer: Comparer = <T>(a: T, b: T) => a === b;

function selectOne<T>(items: T[], newItem: T) {
  return [...items, newItem];
}

function selectOneUnique<T>(items: T[], newItem: T) {
  return uniq(selectOne(items, newItem));
}

function selectMultiple<T>(items: T[], newItems: T[]) {
  return [...items, ...newItems];
}

function selectMultipleUnique<T>(items: T[], newItems: T[]) {
  return uniq(selectMultiple(items, newItems));
}

function removeOne<T>(
  items: T[],
  removedItem: T,
  predicate: Comparer<T> = identityComparer,
) {
  return items.filter((item) => !predicate(item, removedItem));
}

function removeMultiple<T>(
  items: T[],
  removedItems: T[],
  predicate: Comparer<T> = identityComparer,
) {
  return items.filter(
    (item) => !removedItems.find((removedItem) => predicate(removedItem, item)),
  );
}

function toggleOne<T>(items: T[], newItem: T) {
  return isSelected(items, newItem)
    ? removeOne(items, newItem)
    : selectOne(items, newItem);
}

function isSelected<T>(
  items: T[],
  checkedItem: T,
  predicate: Comparer<T> = identityComparer,
) {
  return !!items.find((item) => predicate(item, checkedItem));
}

function areSelected<T>(
  items: T[],
  checkedItems: T[],
  predicate: Comparer<T> = identityComparer,
) {
  return checkedItems.every((checkedItem) =>
    isSelected(items, checkedItem, predicate),
  );
}

export const MultiselectUtil = {
  selectOne,
  selectOneUnique,
  selectMultiple,
  selectMultipleUnique,
  removeOne,
  removeMultiple,
  toggleOne,
  isSelected,
  areSelected,
};
