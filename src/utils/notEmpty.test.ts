import { isEmpty, notEmpty } from './notEmpty';

describe('notEmpty type guards', () => {
  test('notEmpty returns false on unit types', () => {
    expect(notEmpty(null)).toBe(false);
    expect(notEmpty(undefined)).toBe(false);

    expect(notEmpty({})).toBe(true);
  });
});

describe('isEmpty type guards', () => {
  test('isEmpty returns true on unit types', () => {
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);

    expect(isEmpty({})).toBe(false);
  });
});
