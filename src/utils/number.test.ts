import { twoDigitsNumberStr } from './number';

describe('Get 2-digits number string', () => {
  test('Test with 1-digit input', () => {
    expect(twoDigitsNumberStr(0)).toBe('00');
    expect(twoDigitsNumberStr('0')).toBe('00');
    expect(twoDigitsNumberStr(1)).toBe('01');
    expect(twoDigitsNumberStr('1')).toBe('01');
  });
  test('Test with 2-digits input', () => {
    expect(twoDigitsNumberStr(10)).toBe('10');
    expect(twoDigitsNumberStr('10')).toBe('10');
    expect(twoDigitsNumberStr(11)).toBe('11');
    expect(twoDigitsNumberStr('11')).toBe('11');
  });
  test('Test with other input(more than 3 digits)', () => {
    expect(twoDigitsNumberStr(100)).toBe('100');
    expect(twoDigitsNumberStr('100')).toBe('100');
    expect(twoDigitsNumberStr(1200)).toBe('1200');
    expect(twoDigitsNumberStr('1200')).toBe('1200');
  });
});
