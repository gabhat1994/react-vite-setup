/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCustomerPayeeMutationVariables = Types.Exact<{
  input: Types.CreateCustomerPayee;
}>;


export type CreateCustomerPayeeMutation = { __typename?: 'Mutation', createCustomerPayee?: { __typename?: 'MessageOutput', message?: string | null } | null };


export const CreateCustomerPayeeDocument = gql`
    mutation createCustomerPayee($input: CreateCustomerPayee!) {
  createCustomerPayee(input: $input) {
    message
  }
}
    `;
export type CreateCustomerPayeeMutationFn = Apollo.MutationFunction<CreateCustomerPayeeMutation, CreateCustomerPayeeMutationVariables>;

/**
 * __useCreateCustomerPayeeMutation__
 *
 * To run a mutation, you first call `useCreateCustomerPayeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerPayeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerPayeeMutation, { data, loading, error }] = useCreateCustomerPayeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCustomerPayeeMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerPayeeMutation, CreateCustomerPayeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerPayeeMutation, CreateCustomerPayeeMutationVariables>(CreateCustomerPayeeDocument, options);
      }
export type CreateCustomerPayeeMutationHookResult = ReturnType<typeof useCreateCustomerPayeeMutation>;
export type CreateCustomerPayeeMutationResult = Apollo.MutationResult<CreateCustomerPayeeMutation>;
export type CreateCustomerPayeeMutationOptions = Apollo.BaseMutationOptions<CreateCustomerPayeeMutation, CreateCustomerPayeeMutationVariables>;