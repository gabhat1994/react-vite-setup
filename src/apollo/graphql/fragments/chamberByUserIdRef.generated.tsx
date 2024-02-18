/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { UserBasicOutputFragmentDoc } from './userBasicOutput.generated';
export type ChamberByUserIdRefFragment = { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null, type?: string | null, name?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null };

export const ChamberByUserIdRefFragmentDoc = gql`
    fragment ChamberByUserIdRef on ChamberByUserIdRef {
  userId
  _id
  uid {
    ...UserBasicOutput
  }
  type
  name
}
    ${UserBasicOutputFragmentDoc}`;