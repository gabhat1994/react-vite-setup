/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { UserBasicOutputFragmentDoc } from './userBasicOutput.generated';
export type GlobalSearchPostEntityFragment = { __typename?: 'GlobalSearchPostEntity', noumId?: string | null, noumName?: string | null, noumThumbnailUrl?: string | null, type?: Types.PostType | null, content?: string | null, createdAt: any, status?: Types.NoumStatus | null, tags?: Array<{ __typename?: 'Tag', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null };

export const GlobalSearchPostEntityFragmentDoc = gql`
    fragment GlobalSearchPostEntity on GlobalSearchPostEntity {
  noumId
  noumName
  noumThumbnailUrl
  type
  content
  createdAt
  status
  tags {
    uid {
      ...UserBasicOutput
    }
  }
}
    ${UserBasicOutputFragmentDoc}`;