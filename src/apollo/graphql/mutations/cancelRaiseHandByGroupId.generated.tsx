/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CancelRaiseHandByGroupIdMutationVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
}>;


export type CancelRaiseHandByGroupIdMutation = { __typename?: 'Mutation', cancelRaiseHandByGroupId?: { __typename?: 'SocialGroup', _id: string } | null };


export const CancelRaiseHandByGroupIdDocument = gql`
    mutation cancelRaiseHandByGroupId($groupId: ID!) {
  cancelRaiseHandByGroupId(groupId: $groupId) {
    _id
  }
}
    `;
export type CancelRaiseHandByGroupIdMutationFn = Apollo.MutationFunction<CancelRaiseHandByGroupIdMutation, CancelRaiseHandByGroupIdMutationVariables>;

/**
 * __useCancelRaiseHandByGroupIdMutation__
 *
 * To run a mutation, you first call `useCancelRaiseHandByGroupIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelRaiseHandByGroupIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelRaiseHandByGroupIdMutation, { data, loading, error }] = useCancelRaiseHandByGroupIdMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useCancelRaiseHandByGroupIdMutation(baseOptions?: Apollo.MutationHookOptions<CancelRaiseHandByGroupIdMutation, CancelRaiseHandByGroupIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelRaiseHandByGroupIdMutation, CancelRaiseHandByGroupIdMutationVariables>(CancelRaiseHandByGroupIdDocument, options);
      }
export type CancelRaiseHandByGroupIdMutationHookResult = ReturnType<typeof useCancelRaiseHandByGroupIdMutation>;
export type CancelRaiseHandByGroupIdMutationResult = Apollo.MutationResult<CancelRaiseHandByGroupIdMutation>;
export type CancelRaiseHandByGroupIdMutationOptions = Apollo.BaseMutationOptions<CancelRaiseHandByGroupIdMutation, CancelRaiseHandByGroupIdMutationVariables>;