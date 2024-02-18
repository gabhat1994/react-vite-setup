/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateNotificationsReadStatusMutationVariables = Types.Exact<{
  _id?: Types.InputMaybe<Types.Scalars['ID']>;
}>;


export type UpdateNotificationsReadStatusMutation = { __typename?: 'Mutation', updateNotificationsReadStatus?: { __typename?: 'Notifications', unreadCount?: number | null } | null };


export const UpdateNotificationsReadStatusDocument = gql`
    mutation updateNotificationsReadStatus($_id: ID) {
  updateNotificationsReadStatus(_id: $_id) {
    unreadCount
  }
}
    `;
export type UpdateNotificationsReadStatusMutationFn = Apollo.MutationFunction<UpdateNotificationsReadStatusMutation, UpdateNotificationsReadStatusMutationVariables>;

/**
 * __useUpdateNotificationsReadStatusMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationsReadStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationsReadStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationsReadStatusMutation, { data, loading, error }] = useUpdateNotificationsReadStatusMutation({
 *   variables: {
 *      _id: // value for '_id'
 *   },
 * });
 */
export function useUpdateNotificationsReadStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNotificationsReadStatusMutation, UpdateNotificationsReadStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNotificationsReadStatusMutation, UpdateNotificationsReadStatusMutationVariables>(UpdateNotificationsReadStatusDocument, options);
      }
export type UpdateNotificationsReadStatusMutationHookResult = ReturnType<typeof useUpdateNotificationsReadStatusMutation>;
export type UpdateNotificationsReadStatusMutationResult = Apollo.MutationResult<UpdateNotificationsReadStatusMutation>;
export type UpdateNotificationsReadStatusMutationOptions = Apollo.BaseMutationOptions<UpdateNotificationsReadStatusMutation, UpdateNotificationsReadStatusMutationVariables>;