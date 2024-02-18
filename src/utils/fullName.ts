import { type Maybe } from 'yup/es/types';

/**
 * Get user's full name from first, middle and last name
 * @param firstName
 * @param middleName
 * @param lastName
 * @param defaultValue. e.g. email
 * @returns fullName or defaultValue
 */

export const getFullName = (
  firstName: Maybe<string>,
  middleName: Maybe<string>,
  lastName: Maybe<string>,
  defaultValue?: Maybe<string>,
): string =>
  [firstName, middleName, lastName].filter((s) => !!s).join(' ') ||
  defaultValue ||
  '';
