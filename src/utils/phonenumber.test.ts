import {
  isValidPhoneNumber,
  parsePhoneNumber,
  getDisplayPhoneNumber,
} from './phonenumber';

describe('isValidPhoneNumber', () => {
  test('validate normal phone number', () => {
    expect(isValidPhoneNumber('+1 213 373 4253')).toBe(true);
    expect(isValidPhoneNumber('tel:+12133734253')).toBe(true);
    expect(isValidPhoneNumber('+12133734253')).toBe(true);
    expect(isValidPhoneNumber('12133734253')).toBe(false);
    expect(isValidPhoneNumber('02133734253')).toBe(false);
    expect(isValidPhoneNumber('12223333333')).toBe(false);
    expect(isValidPhoneNumber('+12223333333')).toBe(false);
  });
});

describe('parsePhoneNumber', () => {
  test('validate international number', () => {
    const phoneNumber = parsePhoneNumber('+1 213 373 4253');
    expect(phoneNumber?.country).toBe('US');
    expect(phoneNumber?.countryCallingCode).toBe('1');
    expect(phoneNumber?.nationalNumber).toBe('2133734253');
    expect(phoneNumber?.number).toBe('+12133734253');
  });

  test('validate RFC3966 number', () => {
    const phoneNumber = parsePhoneNumber('tel:+12133734253');
    expect(phoneNumber?.country).toBe('US');
    expect(phoneNumber?.countryCallingCode).toBe('1');
    expect(phoneNumber?.nationalNumber).toBe('2133734253');
    expect(phoneNumber?.number).toBe('+12133734253');
  });

  test('validate normal phone number', () => {
    const phoneNumber = parsePhoneNumber('2133734253');
    expect(phoneNumber).toBeNull();

    const phoneNumber1 = parsePhoneNumber('+12133734253');
    expect(phoneNumber1?.country).toBe('US');
    expect(phoneNumber1?.countryCallingCode).toBe('1');
    expect(phoneNumber1?.nationalNumber).toBe('2133734253');
    expect(phoneNumber1?.number).toBe('+12133734253');
  });
});

describe('getDisplayPhoneNumber', () => {
  test('convert phone number string to International format phone number', () => {
    expect(getDisplayPhoneNumber('+12133734253')).toBe('+1 213 373 4253');
    expect(getDisplayPhoneNumber('+639608905463')).toBe('+63 960 890 5463');
  });
});
