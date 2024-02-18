/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveCalendarMutationVariables = Types.Exact<{
  chamberId: Types.Scalars['ID'];
}>;


export type RemoveCalendarMutation = { __typename?: 'Mutation', removeCalendar?: boolean | null };


export const RemoveCalendarDocument = gql`
    mutation RemoveCalendar($chamberId: ID!) {
  removeCalendar(chamberId: $chamberId)
}
    `;
export type RemoveCalendarMutationFn = Apollo.MutationFunction<RemoveCalendarMutation, RemoveCalendarMutationVariables>;

/**
 * __useRemoveCalendarMutation__
 *
 * To run a mutation, you first call `useRemoveCalendarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCalendarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCalendarMutation, { data, loading, error }] = useRemoveCalendarMutation({
 *   variables: {
 *      chamberId: // value for 'chamberId'
 *   },
 * });
 */
export function useRemoveCalendarMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCalendarMutation, RemoveCalendarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCalendarMutation, RemoveCalendarMutationVariables>(RemoveCalendarDocument, options);
      }
export type RemoveCalendarMutationHookResult = ReturnType<typeof useRemoveCalendarMutation>;
export type RemoveCalendarMutationResult = Apollo.MutationResult<RemoveCalendarMutation>;
export type RemoveCalendarMutationOptions = Apollo.BaseMutationOptions<RemoveCalendarMutation, RemoveCalendarMutationVariables>;