import {
  cleanList,
  removeItemAtIndex,
  reorderList,
  replaceItemAtIndex,
} from './list';

describe('list', () => {
  test('reorder list', () => {
    let list = [1, 2, 3, 4, 5];
    list = reorderList(list, 2, 3);
    expect(list).toEqual([1, 2, 4, 3, 5]);
  });

  test('replaceItemAtIndex', () => {
    const list = [1, 2, 3, 4, 5];
    const newlist = replaceItemAtIndex(list, 2, 10);
    expect(newlist).toEqual([1, 2, 10, 4, 5]);
  });

  test('removeItemAtIndex', () => {
    const list = [1, 2, 3, 4, 5];
    const newList = removeItemAtIndex(list, 2);
    expect(newList).toEqual([1, 2, 4, 5]);
  });

  test('cleanArray', () => {
    const list = [1, null, 2, undefined, 3, 4, 5, null];
    const newList = cleanList(list);
    expect(newList).toEqual([1, 2, 3, 4, 5]);
  });
});
