import { getCurrentPageItems } from './utils';
import { CardItems } from './constants';

describe('getCurrentPageItems', () => {
  test('check whether items are returned as per page number', () => {
    const { items, totalPages } = getCurrentPageItems(CardItems, 1, 4);
    expect(items.length).toBe(4);
    expect(totalPages).toBe(3);
  });

  test('check whether items are not returned if items are empty', () => {
    const { items, totalPages } = getCurrentPageItems([], 1, 4);
    expect(items.length).toBe(0);
    expect(totalPages).toBe(0);
  });

  test('check whether items are not returned when page is greater than total pages', () => {
    const { items } = getCurrentPageItems(CardItems, 7, 4);
    expect(items.length).toBe(0);
  });
});
