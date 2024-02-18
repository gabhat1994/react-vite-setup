import { renderHook, act } from '@testing-library/react-hooks';
import { useMultiItemSelection } from './useMultiItemSelection';

describe('Initial state', () => {
  test('By default, starts with an empty array', () => {
    const hook = renderHook(() => useMultiItemSelection());
    const { current } = hook.result;
    expect(current.selectedItems).toEqual([]);
  });

  test('Allows to set the initial selection', () => {
    const initialSelection = ['1', '5', '10'];
    const hook = renderHook(() => useMultiItemSelection({ initialSelection }));
    const { current } = hook.result;
    expect(current.selectedItems).toEqual(initialSelection);
  });
});

describe('Changing state', () => {
  test('Allows to check if items are already selected', () => {
    const { result } = renderHook(() =>
      useMultiItemSelection({
        initialSelection: ['1', '2', '3', '4', '5', '6'],
      }),
    );
    expect(result.current.isSelected('3')).toBe(true);
    expect(result.current.isSelected('6')).toBe(true);
    expect(result.current.isSelected('7')).toBe(false);
    expect(result.current.areSelected(['1', '3', '4'])).toBe(true);
    expect(result.current.areSelected(['1', '6', '9'])).toBe(false); // All need to be present
  });

  test('Allows to select and remove one item, without duplicates', () => {
    const { result } = renderHook(() => useMultiItemSelection<string>());
    expect(result.current.selectedItems).toEqual([]);

    act(() => {
      result.current.selectOne('2');
    });
    expect(result.current.selectedItems).toEqual(['2']);

    act(() => {
      result.current.selectOne('5');
    });
    expect(result.current.selectedItems).toEqual(['2', '5']);
    act(() => {
      result.current.selectOne('2');
    });
    expect(result.current.selectedItems).toEqual(['2', '5']);
    act(() => {
      result.current.selectOne('7');
    });
    expect(result.current.selectedItems).toEqual(['2', '5', '7']);

    act(() => {
      result.current.removeOne('5');
    });
    expect(result.current.selectedItems).toEqual(['2', '7']);
    act(() => {
      result.current.removeOne('2');
    });
    expect(result.current.selectedItems).toEqual(['7']);
    act(() => {
      result.current.removeOne('7');
    });
    expect(result.current.selectedItems).toEqual([]);
    act(() => {
      result.current.removeOne('1');
    });
    expect(result.current.selectedItems).toEqual([]);
  });

  test('Allows to select and remove multiple items, without duplicates', () => {
    const { result } = renderHook(() => useMultiItemSelection<string>());
    expect(result.current.selectedItems).toEqual([]);

    act(() => {
      result.current.selectMultiple(['2', '3', '4', '5', '2']);
    });
    expect(result.current.selectedItems).toEqual(['2', '3', '4', '5']);

    act(() => {
      result.current.selectMultiple(['3', '9', '2']);
    });
    expect(result.current.selectedItems).toEqual(['2', '3', '4', '5', '9']);

    act(() => {
      result.current.removeMultiple(['4', '9']);
    });
    expect(result.current.selectedItems).toEqual(['2', '3', '5']);
  });

  test('Allows to clear entire selection', () => {
    const { result } = renderHook(() =>
      useMultiItemSelection({
        initialSelection: ['1', '2', '3', '4', '5', '6'],
      }),
    );
    act(() => {
      result.current.clear();
    });
    expect(result.current.selectedItems).toHaveLength(0);
  });
});
