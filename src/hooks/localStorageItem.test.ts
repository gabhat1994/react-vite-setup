import { act, renderHook } from '@testing-library/react-hooks';
import { useLocalStorageItem } from './localStorageItem';

beforeEach(() => {
  localStorage.clear();
});

describe('Reading when the item was never set in the local storage', () => {
  test('When the default value is not provided, returns undefined', () => {
    const { result } = renderHook(() => useLocalStorageItem('ACCESS_TOKEN'));
    const [value] = result.current;
    expect(value).toBe(undefined);
    expect(localStorage.getItem('ACCESS_TOKEN')).toBe(null);
  });

  test('When the default value is provided, returns the default value', () => {
    const { result } = renderHook(() =>
      useLocalStorageItem('ACCESS_TOKEN', 'default_token'),
    );
    const [value] = result.current;
    expect(value).toBe('default_token');
    expect(localStorage.getItem('ACCESS_TOKEN')).toBe(null);
  });
});

describe('Reading when the item was previously set in the local storage', () => {
  const storedValue = 'already_stored_token';

  beforeEach(() => {
    localStorage.setItem('ACCESS_TOKEN', storedValue);
  });

  test('When the default value is not provided, returns the stored value', () => {
    const { result } = renderHook(() => useLocalStorageItem('ACCESS_TOKEN'));
    const [value] = result.current;
    expect(value).toBe(storedValue);
    expect(localStorage.getItem('ACCESS_TOKEN')).toBe(storedValue);
  });

  test('When the default value is provided, returns the stored value', () => {
    const { result } = renderHook(() =>
      useLocalStorageItem('ACCESS_TOKEN', 'default_token'),
    );
    const [value] = result.current;
    expect(value).toBe(storedValue);
    expect(localStorage.getItem('ACCESS_TOKEN')).toBe(storedValue);
  });
});

describe("Setting the item's value", () => {
  test('Should update local storage and the returned value', () => {
    const { result } = renderHook(() =>
      useLocalStorageItem('ACCESS_TOKEN', 'default_token'),
    );
    let [value, setValue] = result.current;
    expect(value).toBe('default_token');

    act(() => {
      setValue('new_token');
    });

    [value, setValue] = result.current;
    expect(value).toBe('new_token');
    expect(localStorage.getItem('ACCESS_TOKEN')).toBe('"new_token"');
  });
});
