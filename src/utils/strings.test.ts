import {
  rdmString,
  formatListOfStrings,
  isInteger,
  getMaskedString,
} from './strings';

describe('rdmString', () => {
  test('check result type & length', () => {
    const result = rdmString(10);
    expect(typeof result).toBe('string');
    expect(result.length).toBe(10);
  });

  test('0', () => {
    const result = rdmString(0);
    expect(result).toBe('');
  });
});

describe('formatListOfStrings', () => {
  test('When list has no items, returns an empty string', () => {
    expect(formatListOfStrings([])).toBe('');
  });

  test('When list has 1 item, returns the item', () => {
    expect(formatListOfStrings(['first'])).toBe('first');
  });

  test('When list has at least 2 items, formats the list with commas and "and"', () => {
    expect(formatListOfStrings(['first', 'second'])).toBe('first and second');
    expect(formatListOfStrings(['first', 'second', 'third'])).toBe(
      'first, second and third',
    );
    expect(formatListOfStrings(['first', 'second', 'third', 'fourth'])).toBe(
      'first, second, third and fourth',
    );
  });
});

describe('isInteger', () => {
  test('Test the isInteger string', () => {
    expect(isInteger('1234')).toBe(true);
    expect(isInteger('01234')).toBe(true);
    expect(isInteger('0')).toBe(true);
    expect(isInteger('gs1234')).toBe(false);
    expect(isInteger('1234aa')).toBe(false);
    expect(isInteger('1234#$')).toBe(false);
    expect(isInteger('.1234')).toBe(false);
    expect(isInteger('-1234')).toBe(true);
  });
});

describe('getMaskedString', () => {
  test('Test the string mask', () => {
    expect(getMaskedString('04')).toBe('04');
    expect(getMaskedString('04', '00/00/0000')).toBe('04');
    expect(getMaskedString('0416', '00/00/0000')).toBe('04/16');
    expect(getMaskedString('04162022', '00/00/0000')).toBe('04/16/2022');
    expect(getMaskedString('04162022123', '00/00/0000')).toBe('04/16/2022');
  });
});
