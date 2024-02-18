/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendContractForSigningMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type SendContractForSigningMutation = { __typename?: 'Mutation', sendDocumentForSigning: boolean };


export const SendContractForSigningDocument = gql`
    mutation SendContractForSigning($id: ID!) {
  sendDocumentForSigning(documentId: $id, type: Contract)
}
    `;
export type SendContractForSigningMutationFn = Apollo.MutationFunction<SendContractForSigningMutation, SendContractForSigningMutationVariables>;

/**
 * __useSendContractForSigningMutation__
 *
 * To run a mutation, you first call `useSendContractForSigningMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendContractForSigningMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendContractForSigningMutation, { data, loading, error }] = useSendContractForSigningMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSendContractForSigningMutation(baseOptions?: Apollo.MutationHookOptions<SendContractForSigningMutation, SendContractForSigningMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendContractForSigningMutation, SendContractForSigningMutationVariables>(SendContractForSigningDocument, options);
      }
export type SendContractForSigningMutationHookResult = ReturnType<typeof useSendContractForSigningMutation>;
export type SendContractForSigningMutationResult = Apollo.MutationResult<SendContractForSigningMutation>;
export type SendContractForSigningMutationOptions = Apollo.BaseMutationOptions<SendContractForSigningMutation, SendContractForSigningMutationVariables>;