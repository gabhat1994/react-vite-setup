/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EventsSubscriptionVariables = Types.Exact<{
  userId: Types.Scalars['ID'];
}>;


export type EventsSubscription = { __typename?: 'Subscription', events?: { __typename?: 'EventSubscriptionData', type: Types.EventSubscriptionType, eventId: string, userId?: string | null } | null };


export const EventsDocument = gql`
    subscription Events($userId: ID!) {
  events(userId: $userId) {
    type
    eventId
    userId
  }
}
    `;

/**
 * __useEventsSubscription__
 *
 * To run a query within a React component, call `useEventsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useEventsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useEventsSubscription(baseOptions: Apollo.SubscriptionHookOptions<EventsSubscription, EventsSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<EventsSubscription, EventsSubscriptionVariables>(EventsDocument, options);
      }
export type EventsSubscriptionHookResult = ReturnType<typeof useEventsSubscription>;
export type EventsSubscriptionResult = Apollo.SubscriptionResult<EventsSubscription>;