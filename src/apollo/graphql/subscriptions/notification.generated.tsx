/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NotificationSubscriptionVariables = Types.Exact<{
  userId: Types.Scalars['ID'];
}>;


export type NotificationSubscription = { __typename?: 'Subscription', notification?: { __typename?: 'NotificationSubscriptionData', _id: string, userId?: string | null, type: Types.NotificationType } | null };


export const NotificationDocument = gql`
    subscription notification($userId: ID!) {
  notification(userId: $userId) {
    _id
    userId
    type
  }
}
    `;

/**
 * __useNotificationSubscription__
 *
 * To run a query within a React component, call `useNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationSubscription({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useNotificationSubscription(baseOptions: Apollo.SubscriptionHookOptions<NotificationSubscription, NotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NotificationSubscription, NotificationSubscriptionVariables>(NotificationDocument, options);
      }
export type NotificationSubscriptionHookResult = ReturnType<typeof useNotificationSubscription>;
export type NotificationSubscriptionResult = Apollo.SubscriptionResult<NotificationSubscription>;