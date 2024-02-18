import { generateFileName } from './generateFileName';

describe('generateFileName', () => {
  test('test for extension, filename and unique random string', () => {
    const result = generateFileName('sample video(1).mp4', 'post', '1');
    const [rest, extension] = result.split('.');
    const [userId, type, fileName] = rest.split('/');

    expect(userId).toBe('1');
    expect(extension).toBe('mp4');
    expect(fileName).toBe('sample video(1)');
    expect(type).toBe('post');
  });
  test('test for reserved characters', () => {
    const result = generateFileName('~/?<i>mage:*|".png', 'conversation', '2');
    const [rest] = result.split('.');
    const [, , fileName] = rest.split('/');
    expect(fileName).toBe('~image');
  });

  test('test for unicode characters', () => {
    const result = generateFileName('\u0000/ssample".mp4', 'sow', '3');
    const [rest] = result.split('.');
    const [, , fileName] = rest.split('/');
    expect(fileName).toBe('ssample');
  });
});
