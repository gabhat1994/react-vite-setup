/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type SocialLinkFragment = { __typename?: 'SocialLink', name?: string | null, link?: string | null };

export const SocialLinkFragmentDoc = gql`
    fragment SocialLink on SocialLink {
  name
  link
}
    `;