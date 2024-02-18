import { getLocalStorage, setLocalStorage } from './localStorage';

describe('localStorage', () => {
  test('read and write to the local storage', () => {
    const setStringStorage = setLocalStorage('test', 'String value');
    expect(setStringStorage).toEqual(undefined);
    const getStringStorage = getLocalStorage('test');
    expect(getStringStorage).toEqual('String value');
    setLocalStorage('test', { test: 'String value' });
    const getObjectStorage = getLocalStorage('test');
    expect(getObjectStorage).toEqual({ test: 'String value' });
    setLocalStorage('test');
    const getNullStorage = getLocalStorage('test');
    expect(getNullStorage).toEqual(null);
  });
});
