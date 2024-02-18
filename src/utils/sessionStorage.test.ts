import { getSessionStorage, setSessionStorage } from './sessionStorage';

describe('sessionStorage', () => {
  test('read and write to the session storage', () => {
    const setStringStorage = setSessionStorage('test', 'String value');
    expect(setStringStorage).toEqual(undefined);
    const getStringStorage = getSessionStorage('test');
    expect(getStringStorage).toEqual('String value');
    setSessionStorage('test', { test: 'String value' });
    const getObjectStorage = getSessionStorage('test');
    expect(getObjectStorage).toEqual({ test: 'String value' });
    setSessionStorage('test');
    const getNullStorage = getSessionStorage('test');
    expect(getNullStorage).toEqual(null);
  });
});
