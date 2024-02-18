/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type EventMetaFragment = { __typename?: 'EventMeta', allEventsCount?: number | null, hostedEventsCount?: number | null, pendingEventsCount?: number | null, acceptedEventsCount?: number | null, pastEventsCount?: number | null };

export const EventMetaFragmentDoc = gql`
    fragment EventMeta on EventMeta {
  allEventsCount
  hostedEventsCount
  pendingEventsCount
  acceptedEventsCount
  pastEventsCount
}
    `;