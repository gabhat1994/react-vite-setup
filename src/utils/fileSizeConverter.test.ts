import fileSizeConverter from './fileSizeConverter';

describe('fileSizeConverter', () => {
  test('convert size', () => {
    expect(fileSizeConverter(512 * 1024 ** 0)).toBe('512 Bytes');
    expect(fileSizeConverter(512 * 1024 ** 1)).toBe('512 KB');
    expect(fileSizeConverter(512 * 1024 ** 2)).toBe('512 MB');
    expect(fileSizeConverter(512 * 1024 ** 3)).toBe('512 GB');
    expect(fileSizeConverter(512 * 1024 ** 4)).toBe('512 TB');
    expect(fileSizeConverter(512 * 1024 ** 5)).toBe('512 PB');
    expect(fileSizeConverter(512 * 1024 ** 6)).toBe('512 EB');
    expect(fileSizeConverter(512 * 1024 ** 7)).toBe('512 ZB');
    expect(fileSizeConverter(512 * 1024 ** 8)).toBe('512 YB');
  });
});
