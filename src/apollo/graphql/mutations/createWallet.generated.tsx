/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateWalletMutationVariables = Types.Exact<{
  input: Types.CreateCustomerInput;
}>;


export type CreateWalletMutation = { __typename?: 'Mutation', createCustomer?: { __typename?: 'CreateCustomerOutput', stripeCustomer?: string | null, dwollaCustomer?: string | null } | null };


export const CreateWalletDocument = gql`
    mutation createWallet($input: CreateCustomerInput!) {
  createCustomer(input: $input) {
    stripeCustomer
    dwollaCustomer
  }
}
    `;
export type CreateWalletMutationFn = Apollo.MutationFunction<CreateWalletMutation, CreateWalletMutationVariables>;

/**
 * __useCreateWalletMutation__
 *
 * To run a mutation, you first call `useCreateWalletMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWalletMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWalletMutation, { data, loading, error }] = useCreateWalletMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateWalletMutation(baseOptions?: Apollo.MutationHookOptions<CreateWalletMutation, CreateWalletMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWalletMutation, CreateWalletMutationVariables>(CreateWalletDocument, options);
      }
export type CreateWalletMutationHookResult = ReturnType<typeof useCreateWalletMutation>;
export type CreateWalletMutationResult = Apollo.MutationResult<CreateWalletMutation>;
export type CreateWalletMutationOptions = Apollo.BaseMutationOptions<CreateWalletMutation, CreateWalletMutationVariables>;