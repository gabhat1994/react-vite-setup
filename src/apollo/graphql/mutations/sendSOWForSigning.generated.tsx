/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SendSowForSigningMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type SendSowForSigningMutation = { __typename?: 'Mutation', sendDocumentForSigning: boolean };


export const SendSowForSigningDocument = gql`
    mutation SendSOWForSigning($id: ID!) {
  sendDocumentForSigning(documentId: $id, type: SOW)
}
    `;
export type SendSowForSigningMutationFn = Apollo.MutationFunction<SendSowForSigningMutation, SendSowForSigningMutationVariables>;

/**
 * __useSendSowForSigningMutation__
 *
 * To run a mutation, you first call `useSendSowForSigningMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendSowForSigningMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendSowForSigningMutation, { data, loading, error }] = useSendSowForSigningMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSendSowForSigningMutation(baseOptions?: Apollo.MutationHookOptions<SendSowForSigningMutation, SendSowForSigningMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendSowForSigningMutation, SendSowForSigningMutationVariables>(SendSowForSigningDocument, options);
      }
export type SendSowForSigningMutationHookResult = ReturnType<typeof useSendSowForSigningMutation>;
export type SendSowForSigningMutationResult = Apollo.MutationResult<SendSowForSigningMutation>;
export type SendSowForSigningMutationOptions = Apollo.BaseMutationOptions<SendSowForSigningMutation, SendSowForSigningMutationVariables>;