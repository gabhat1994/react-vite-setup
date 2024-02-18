import { AppBadge } from './AppBadge';

describe('Document title badge', () => {
  test('Allows to prepend a badge to the document title', () => {
    const originalTitle = 'Some title';
    document.title = originalTitle;

    AppBadge.setTitleBadge(5);

    expect(document.title).toBe(`(5) ${originalTitle}`);

    AppBadge.clearTitleBadge();
    expect(document.title).toBe(originalTitle);
  });

  test("Doesn't set any badge if passed value is lower than 1", () => {
    const originalTitle = 'Some title';
    document.title = originalTitle;

    AppBadge.setTitleBadge(0);
    expect(document.title).toBe(originalTitle);
    AppBadge.setTitleBadge(-1);
    expect(document.title).toBe(originalTitle);
  });
});

describe('PWA app badge', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('Allows to set the PWA app badge', () => {
    navigator.setAppBadge = vi.fn();
    AppBadge.setPwaAppBadge(5);
    expect(navigator.setAppBadge).toBeCalledTimes(1);
    expect(navigator.setAppBadge).toBeCalledWith(5);
  });

  test('Allows to set the PWA app badge', () => {
    navigator.clearAppBadge = vi.fn();
    AppBadge.clearPwaAppBadge();
    expect(navigator.clearAppBadge).toBeCalledTimes(1);
  });
});
