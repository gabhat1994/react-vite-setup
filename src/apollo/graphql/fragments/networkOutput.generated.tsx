/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type NetworkOutputFragment = { __typename?: 'NetworkOutput', _id?: string | null, accessToken?: string | null, connectionType?: Types.ConnectionTypeEnum | null, expiryDate?: string | null, isActive?: boolean | null, userId?: string | null };

export const NetworkOutputFragmentDoc = gql`
    fragment NetworkOutput on NetworkOutput {
  _id
  accessToken
  connectionType
  expiryDate
  isActive
  userId
}
    `;