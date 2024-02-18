/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type TimezoneFragment = { __typename?: 'Timezone', _id: string, offset?: string | null, text?: string | null, value?: string | null, abbr?: string | null, utcOffset?: string | null, timezone?: string | null };

export const TimezoneFragmentDoc = gql`
    fragment Timezone on Timezone {
  _id
  offset
  text
  value
  abbr
  utcOffset
  timezone
}
    `;