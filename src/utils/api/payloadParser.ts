import { type Maybe } from '@/apollo/generated/types';

/**
 * BE sends ISODate type as a numeric timestamp cast as string
 * @param timestamp string
 * @example parseISOString('1676467936661') // Wed Feb 15 2023 14:32:16 GMT+0100 (Central European Standard Time)
 */
function parseISOString(timestamp: string): Date;
function parseISOString(timestamp: null | undefined): undefined;
function parseISOString(timestamp: Maybe<string> | undefined): Date | undefined;
function parseISOString(timestamp: Maybe<string> | undefined) {
  return timestamp ? new Date(+timestamp) : undefined;
}

/**
 * BE sometimes sends dates as regular JSON dates.
 * @param dateString string
 * @example parseDateString('2023-02-15T13:32:16Z') // Wed Feb 15 2023 14:32:16 GMT+0100 (Central European Standard Time)
 */
function parseDateString(dateString: string): Date;
function parseDateString(dateString: null | undefined): undefined;
function parseDateString(
  dateString: Maybe<string> | undefined,
): Date | undefined;
function parseDateString(dateString: Maybe<string> | undefined) {
  return dateString ? new Date(dateString) : undefined;
}

export const ApiPayloadParser = {
  parseISOString,
  parseDateString,
};
