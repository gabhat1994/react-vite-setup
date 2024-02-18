/**
 * Get 2-digits number string
 * @param value number or number string
 * @example
 *  `value: 5 => '05', value: 12 => '12'`
 */

export const twoDigitsNumberStr = (value: number | string): string =>
  `${Math.floor(+value / 10)}${+value % 10}`;
