/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MarkNotificationsAsViewedMutationVariables = Types.Exact<{
  date: Types.Scalars['Date'];
}>;


export type MarkNotificationsAsViewedMutation = { __typename?: 'Mutation', updateUserActionLog?: { __typename?: 'UserActionLog', lastCheckedNotificationsDate?: any | null } | null };

export type MarkConversationsAsViewedMutationVariables = Types.Exact<{
  date: Types.Scalars['Date'];
}>;


export type MarkConversationsAsViewedMutation = { __typename?: 'Mutation', updateUserActionLog?: { __typename?: 'UserActionLog', lastCheckedMessagesDate?: any | null } | null };


export const MarkNotificationsAsViewedDocument = gql`
    mutation markNotificationsAsViewed($date: Date!) {
  updateUserActionLog(input: {lastCheckedNotificationsDate: $date}) {
    lastCheckedNotificationsDate
  }
}
    `;
export type MarkNotificationsAsViewedMutationFn = Apollo.MutationFunction<MarkNotificationsAsViewedMutation, MarkNotificationsAsViewedMutationVariables>;

/**
 * __useMarkNotificationsAsViewedMutation__
 *
 * To run a mutation, you first call `useMarkNotificationsAsViewedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationsAsViewedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationsAsViewedMutation, { data, loading, error }] = useMarkNotificationsAsViewedMutation({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useMarkNotificationsAsViewedMutation(baseOptions?: Apollo.MutationHookOptions<MarkNotificationsAsViewedMutation, MarkNotificationsAsViewedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkNotificationsAsViewedMutation, MarkNotificationsAsViewedMutationVariables>(MarkNotificationsAsViewedDocument, options);
      }
export type MarkNotificationsAsViewedMutationHookResult = ReturnType<typeof useMarkNotificationsAsViewedMutation>;
export type MarkNotificationsAsViewedMutationResult = Apollo.MutationResult<MarkNotificationsAsViewedMutation>;
export type MarkNotificationsAsViewedMutationOptions = Apollo.BaseMutationOptions<MarkNotificationsAsViewedMutation, MarkNotificationsAsViewedMutationVariables>;
export const MarkConversationsAsViewedDocument = gql`
    mutation markConversationsAsViewed($date: Date!) {
  updateUserActionLog(input: {lastCheckedMessagesDate: $date}) {
    lastCheckedMessagesDate
  }
}
    `;
export type MarkConversationsAsViewedMutationFn = Apollo.MutationFunction<MarkConversationsAsViewedMutation, MarkConversationsAsViewedMutationVariables>;

/**
 * __useMarkConversationsAsViewedMutation__
 *
 * To run a mutation, you first call `useMarkConversationsAsViewedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkConversationsAsViewedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markConversationsAsViewedMutation, { data, loading, error }] = useMarkConversationsAsViewedMutation({
 *   variables: {
 *      date: // value for 'date'
 *   },
 * });
 */
export function useMarkConversationsAsViewedMutation(baseOptions?: Apollo.MutationHookOptions<MarkConversationsAsViewedMutation, MarkConversationsAsViewedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MarkConversationsAsViewedMutation, MarkConversationsAsViewedMutationVariables>(MarkConversationsAsViewedDocument, options);
      }
export type MarkConversationsAsViewedMutationHookResult = ReturnType<typeof useMarkConversationsAsViewedMutation>;
export type MarkConversationsAsViewedMutationResult = Apollo.MutationResult<MarkConversationsAsViewedMutation>;
export type MarkConversationsAsViewedMutationOptions = Apollo.BaseMutationOptions<MarkConversationsAsViewedMutation, MarkConversationsAsViewedMutationVariables>;