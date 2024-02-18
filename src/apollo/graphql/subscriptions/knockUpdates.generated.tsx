/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type KnockUpdatesSubscriptionVariables = Types.Exact<{
  socialHallId?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type KnockUpdatesSubscription = { __typename?: 'Subscription', knockUpdates: { __typename?: 'KnockEvent', _id: string, event: string } };


export const KnockUpdatesDocument = gql`
    subscription knockUpdates($socialHallId: ID) {
  knockUpdates(socialHallId: $socialHallId) {
    _id
    event
  }
}
    `;

/**
 * __useKnockUpdatesSubscription__
 *
 * To run a query within a React component, call `useKnockUpdatesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useKnockUpdatesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKnockUpdatesSubscription({
 *   variables: {
 *      socialHallId: // value for 'socialHallId'
 *   },
 * });
 */
export function useKnockUpdatesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<KnockUpdatesSubscription, KnockUpdatesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<KnockUpdatesSubscription, KnockUpdatesSubscriptionVariables>(KnockUpdatesDocument, options);
      }
export type KnockUpdatesSubscriptionHookResult = ReturnType<typeof useKnockUpdatesSubscription>;
export type KnockUpdatesSubscriptionResult = Apollo.SubscriptionResult<KnockUpdatesSubscription>;