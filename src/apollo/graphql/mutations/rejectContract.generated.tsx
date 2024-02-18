/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RejectContractMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type RejectContractMutation = { __typename?: 'Mutation', rejectContract: boolean };


export const RejectContractDocument = gql`
    mutation RejectContract($id: ID!) {
  rejectContract(documentId: $id)
}
    `;
export type RejectContractMutationFn = Apollo.MutationFunction<RejectContractMutation, RejectContractMutationVariables>;

/**
 * __useRejectContractMutation__
 *
 * To run a mutation, you first call `useRejectContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectContractMutation, { data, loading, error }] = useRejectContractMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRejectContractMutation(baseOptions?: Apollo.MutationHookOptions<RejectContractMutation, RejectContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectContractMutation, RejectContractMutationVariables>(RejectContractDocument, options);
      }
export type RejectContractMutationHookResult = ReturnType<typeof useRejectContractMutation>;
export type RejectContractMutationResult = Apollo.MutationResult<RejectContractMutation>;
export type RejectContractMutationOptions = Apollo.BaseMutationOptions<RejectContractMutation, RejectContractMutationVariables>;