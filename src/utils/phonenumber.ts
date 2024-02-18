import {
  type CountryCallingCode,
  type CountryCode,
  type E164Number,
  isValidPhoneNumber as lIsValidPhoneNumber,
  type NationalNumber,
  parsePhoneNumber as lParsePhoneNumber,
} from 'libphonenumber-js/max';

type NoumPhoneNumber = {
  country?: CountryCode;
  countryCallingCode?: CountryCallingCode;
  nationalNumber?: NationalNumber;
  number?: E164Number;
  international?: E164Number;
};

/**
 * Returns if phone number is valid or not as boolean
 *
 * @param {string} phonenumber.
 * @return {boolean} is valid phone number.
 */
export const isValidPhoneNumber = (phoneNumber: string): boolean =>
  lIsValidPhoneNumber(phoneNumber);

/**
 * Returns PhoneNumber object from phone.
 * returns null if invalid phonenumber.
 * returns NoumPhoneNumber if valid
 *
 * @param {string} phonenumber.
 * @return {NoumPhoneNumber}
 */
export const parsePhoneNumber = (
  phoneNumber: string,
): NoumPhoneNumber | null => {
  if (!isValidPhoneNumber(phoneNumber)) {
    return null;
  }

  const objPhoneNumber = lParsePhoneNumber(phoneNumber);
  return {
    country: objPhoneNumber.country,
    countryCallingCode: objPhoneNumber.countryCallingCode,
    nationalNumber: objPhoneNumber.nationalNumber,
    number: objPhoneNumber.number,
    international: objPhoneNumber.formatInternational(),
  };
};

/**
 * Returns phone number in International display format
 *
 * @param {string} phonenumber.
 * @return {string} phone number in international format.
 */
export const getDisplayPhoneNumber = (phoneNumber: string): string =>
  lParsePhoneNumber(phoneNumber).formatInternational();
