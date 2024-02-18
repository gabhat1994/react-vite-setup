/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCustomerDocumentMutationVariables = Types.Exact<{
  input: Types.UpdateCustomerDocumentInput;
}>;


export type UpdateCustomerDocumentMutation = { __typename?: 'Mutation', updateCustomerDocument?: { __typename?: 'CustomerDocumentOutput', type?: string | null, status?: Types.KycProviderDocStatusEnum | null } | null };


export const UpdateCustomerDocumentDocument = gql`
    mutation updateCustomerDocument($input: UpdateCustomerDocumentInput!) {
  updateCustomerDocument(input: $input) {
    type
    status
  }
}
    `;
export type UpdateCustomerDocumentMutationFn = Apollo.MutationFunction<UpdateCustomerDocumentMutation, UpdateCustomerDocumentMutationVariables>;

/**
 * __useUpdateCustomerDocumentMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerDocumentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerDocumentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerDocumentMutation, { data, loading, error }] = useUpdateCustomerDocumentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCustomerDocumentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerDocumentMutation, UpdateCustomerDocumentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerDocumentMutation, UpdateCustomerDocumentMutationVariables>(UpdateCustomerDocumentDocument, options);
      }
export type UpdateCustomerDocumentMutationHookResult = ReturnType<typeof useUpdateCustomerDocumentMutation>;
export type UpdateCustomerDocumentMutationResult = Apollo.MutationResult<UpdateCustomerDocumentMutation>;
export type UpdateCustomerDocumentMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerDocumentMutation, UpdateCustomerDocumentMutationVariables>;