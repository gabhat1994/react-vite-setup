/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SignContractMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type SignContractMutation = { __typename?: 'Mutation', signContract: boolean };


export const SignContractDocument = gql`
    mutation SignContract($id: ID!) {
  signContract(documentId: $id)
}
    `;
export type SignContractMutationFn = Apollo.MutationFunction<SignContractMutation, SignContractMutationVariables>;

/**
 * __useSignContractMutation__
 *
 * To run a mutation, you first call `useSignContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signContractMutation, { data, loading, error }] = useSignContractMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSignContractMutation(baseOptions?: Apollo.MutationHookOptions<SignContractMutation, SignContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignContractMutation, SignContractMutationVariables>(SignContractDocument, options);
      }
export type SignContractMutationHookResult = ReturnType<typeof useSignContractMutation>;
export type SignContractMutationResult = Apollo.MutationResult<SignContractMutation>;
export type SignContractMutationOptions = Apollo.BaseMutationOptions<SignContractMutation, SignContractMutationVariables>;