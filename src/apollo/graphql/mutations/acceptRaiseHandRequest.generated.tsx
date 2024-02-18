/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AcceptRaiseHandRequestMutationVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
  requestedByUserId: Types.Scalars['ID'];
}>;


export type AcceptRaiseHandRequestMutation = { __typename?: 'Mutation', acceptRaiseHandRequest?: { __typename?: 'SocialGroup', _id: string } | null };


export const AcceptRaiseHandRequestDocument = gql`
    mutation acceptRaiseHandRequest($groupId: ID!, $requestedByUserId: ID!) {
  acceptRaiseHandRequest(groupId: $groupId, requestedByUserId: $requestedByUserId) {
    _id
  }
}
    `;
export type AcceptRaiseHandRequestMutationFn = Apollo.MutationFunction<AcceptRaiseHandRequestMutation, AcceptRaiseHandRequestMutationVariables>;

/**
 * __useAcceptRaiseHandRequestMutation__
 *
 * To run a mutation, you first call `useAcceptRaiseHandRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptRaiseHandRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptRaiseHandRequestMutation, { data, loading, error }] = useAcceptRaiseHandRequestMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      requestedByUserId: // value for 'requestedByUserId'
 *   },
 * });
 */
export function useAcceptRaiseHandRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptRaiseHandRequestMutation, AcceptRaiseHandRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptRaiseHandRequestMutation, AcceptRaiseHandRequestMutationVariables>(AcceptRaiseHandRequestDocument, options);
      }
export type AcceptRaiseHandRequestMutationHookResult = ReturnType<typeof useAcceptRaiseHandRequestMutation>;
export type AcceptRaiseHandRequestMutationResult = Apollo.MutationResult<AcceptRaiseHandRequestMutation>;
export type AcceptRaiseHandRequestMutationOptions = Apollo.BaseMutationOptions<AcceptRaiseHandRequestMutation, AcceptRaiseHandRequestMutationVariables>;