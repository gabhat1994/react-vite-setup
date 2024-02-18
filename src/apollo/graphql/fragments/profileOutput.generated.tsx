/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SocialLinkFragmentDoc } from './socialLink.generated';
export type ProfileOutputFragment = { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null };

export const ProfileOutputFragmentDoc = gql`
    fragment ProfileOutput on ProfileOutput {
  _id
  profilePicture
  profilePictureThumbnail
  socialLinks {
    ...SocialLink
  }
}
    ${SocialLinkFragmentDoc}`;