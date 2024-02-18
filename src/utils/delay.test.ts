import { delay } from './delay';

const fn = vi.fn();

describe('delay', () => {
  test('delay function', () => {
    expect(fn).toBeCalledTimes(0);
    delay(fn, 1000);
    expect(fn).toBeCalledTimes(0);

    setTimeout(() => {
      expect(fn).toBeCalled();
    }, 1000);
  });
});
