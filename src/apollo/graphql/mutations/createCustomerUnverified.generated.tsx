/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateCustomerUnverifiedMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateCustomerUnverifiedMutation = { __typename?: 'Mutation', createCustomerUnverified?: { __typename?: 'CreateCustomerOutput', stripeCustomer?: string | null, dwollaCustomer?: string | null } | null };


export const CreateCustomerUnverifiedDocument = gql`
    mutation createCustomerUnverified {
  createCustomerUnverified {
    stripeCustomer
    dwollaCustomer
  }
}
    `;
export type CreateCustomerUnverifiedMutationFn = Apollo.MutationFunction<CreateCustomerUnverifiedMutation, CreateCustomerUnverifiedMutationVariables>;

/**
 * __useCreateCustomerUnverifiedMutation__
 *
 * To run a mutation, you first call `useCreateCustomerUnverifiedMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerUnverifiedMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerUnverifiedMutation, { data, loading, error }] = useCreateCustomerUnverifiedMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateCustomerUnverifiedMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerUnverifiedMutation, CreateCustomerUnverifiedMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerUnverifiedMutation, CreateCustomerUnverifiedMutationVariables>(CreateCustomerUnverifiedDocument, options);
      }
export type CreateCustomerUnverifiedMutationHookResult = ReturnType<typeof useCreateCustomerUnverifiedMutation>;
export type CreateCustomerUnverifiedMutationResult = Apollo.MutationResult<CreateCustomerUnverifiedMutation>;
export type CreateCustomerUnverifiedMutationOptions = Apollo.BaseMutationOptions<CreateCustomerUnverifiedMutation, CreateCustomerUnverifiedMutationVariables>;