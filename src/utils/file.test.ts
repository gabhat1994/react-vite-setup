import { getFileExtension, getFileNameFromUrl } from './file';

describe('file', () => {
  test('get file extension', () => {
    expect(getFileExtension('abc.png')).toBe('png');
    expect(getFileExtension('/xxx/yyy/zzz/abc.png')).toBe('png');
  });

  test('get filename from url', () => {
    expect(getFileNameFromUrl('https://xxx/abc.png')).toBe('abc.png');
    expect(getFileNameFromUrl('https://domain.com/xxx/yyy/zzz/abc.png')).toBe(
      'abc.png',
    );
  });
});
