/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type UserPreferencesFragment = { __typename?: 'UserPreferences', timezone?: string | null, userId: string, emailSubscriptions: { __typename?: 'SubscriptionTypes', messagesAndConnections?: boolean | null, marketing?: boolean | null, paymentsAndOTPs?: boolean | null, events?: boolean | null, postAndCommentMentions?: boolean | null } };

export const UserPreferencesFragmentDoc = gql`
    fragment UserPreferences on UserPreferences {
  timezone
  emailSubscriptions {
    messagesAndConnections
    marketing
    paymentsAndOTPs
    events
    postAndCommentMentions
  }
  userId
}
    `;