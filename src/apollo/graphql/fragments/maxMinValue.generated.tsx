/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type MaxMinValueFragment = { __typename?: 'MaxMinValue', max?: number | null, min?: number | null };

export const MaxMinValueFragmentDoc = gql`
    fragment MaxMinValue on MaxMinValue {
  max
  min
}
    `;