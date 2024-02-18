import { type TInputMask } from '@/components/TextField/types';
import { type Maybe } from '@/common/types';

/**
 * Returns random string that length is the incomming param
 *
 * @param {number} length.
 * @return {string}
 */
export function rdmString(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function capitalizeAllWord(word: string): string {
  return word
    .toLowerCase()
    .split(' ')
    .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ');
}

export function trimAndLowerString(source: string): string {
  return source.replace(/\s/g, '').toLowerCase();
}

export function formatListOfStrings(parts: string[]) {
  if (parts.length === 0) {
    return '';
  }
  if (parts.length === 1) {
    return parts[0];
  }

  const commaSeparated =
    parts.length > 2 ? parts.slice(0, -1).join(', ') : parts[0];
  return [commaSeparated, parts[parts.length - 1]].join(' and ');
}

export function isInteger(num: string) {
  return /^-?[0-9]+$/.test(`${num}`);
}

/**
 * Get string mask-applied
 * @param value
 * @param mask
 * @returns string
 */
export function getMaskedString(
  value: Maybe<string>,
  mask?: TInputMask,
): string {
  if (!value || !mask) return value || '';

  let res = value;
  let matchRegEx: RegExp = /^$/; // RegExp for grouping, needs to be set for each Mask
  let delimiter: string[] = []; // Delimiter symbol to concat groups, needs to be set for each Mask

  if (mask === '00/00/0000') {
    res = res.replace(/\D/g, ''); // Remove all non-digit characters
    matchRegEx = /(\d{0,2})(\d{0,2})(\d{0,4})/;
    delimiter = ['/', '/'];
  }

  const group = res.match(matchRegEx) || [];

  if (!group[2]) return group[1] || '';

  res = group[1] || '';
  group.forEach((item, index) => {
    if (index > 1) {
      res += item ? `${delimiter[index - 2] || ''}${item}` : '';
    }
  });

  return res;
}

/**
 * Get string's segments which is splited by specific length
 * @param value
 * @param segment_length
 * @returns string[]
 */
export function chunkStringWithoutWordBreaking(value: string, length: number) {
  if (value.length < 3) {
    return [value];
  }
  const re = new RegExp(
    String.raw`\S(.|[\r\n]){1,${length - 2}}\S(?= |$)`,
    'g',
  );
  return value.match(re) || [];
}

/**
 * Get file name with ellipsis
 * @param value
 * @param length
 * @returns string
 */
export const getFileNameWithEllipsis = (value: string, length: number = 20) => {
  if (value.length < length) return value;
  const regExp = /\.\w+$/;
  const matchedArray = value.match(regExp);
  if (!matchedArray || matchedArray.length < 1) return value;
  const fileExtention = matchedArray[0];
  const [fileNameStr] = value.split(regExp);
  return `${fileNameStr.substring(
    0,
    length - fileExtention.length - 3,
  )}...${fileExtention}`;
};
