import { getFormattedDuration } from './getFormattedDuration';

describe('simple getFormattedDuration', () => {
  test('0s', () => {
    expect(getFormattedDuration(0)).toBe('00:00');
  });
  test('5s', () => {
    expect(getFormattedDuration(5)).toBe('00:05');
  });
  test('59s', () => {
    expect(getFormattedDuration(59)).toBe('00:59');
  });
  test('120s', () => {
    expect(getFormattedDuration(120)).toBe('02:00');
  });
  test('1234s', () => {
    expect(getFormattedDuration(1234)).toBe('20:34');
  });
  test('3600s', () => {
    expect(getFormattedDuration(3600)).toBe('1:00:00');
  });
});

describe('formatted getFormattedDuration', () => {
  test('0s', () => {
    expect(getFormattedDuration(0, 'formatted')).toBe('0 s');
  });
  test('5s', () => {
    expect(getFormattedDuration(5, 'formatted')).toBe('05 s');
  });
  test('59s', () => {
    expect(getFormattedDuration(59, 'formatted')).toBe('59 s');
  });
  test('120s', () => {
    expect(getFormattedDuration(120, 'formatted')).toBe('02 m 00 s');
  });
  test('1234s', () => {
    expect(getFormattedDuration(1234, 'formatted')).toBe('20 m 34 s');
  });
  test('3600s', () => {
    expect(getFormattedDuration(3600, 'formatted')).toBe('1 h 00 m 00 s');
  });
});
