/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCustomerFirstTimeFlagMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type UpdateCustomerFirstTimeFlagMutation = { __typename?: 'Mutation', updateCustomerFirstTimeFlag?: boolean | null };


export const UpdateCustomerFirstTimeFlagDocument = gql`
    mutation updateCustomerFirstTimeFlag {
  updateCustomerFirstTimeFlag
}
    `;
export type UpdateCustomerFirstTimeFlagMutationFn = Apollo.MutationFunction<UpdateCustomerFirstTimeFlagMutation, UpdateCustomerFirstTimeFlagMutationVariables>;

/**
 * __useUpdateCustomerFirstTimeFlagMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerFirstTimeFlagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerFirstTimeFlagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerFirstTimeFlagMutation, { data, loading, error }] = useUpdateCustomerFirstTimeFlagMutation({
 *   variables: {
 *   },
 * });
 */
export function useUpdateCustomerFirstTimeFlagMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerFirstTimeFlagMutation, UpdateCustomerFirstTimeFlagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerFirstTimeFlagMutation, UpdateCustomerFirstTimeFlagMutationVariables>(UpdateCustomerFirstTimeFlagDocument, options);
      }
export type UpdateCustomerFirstTimeFlagMutationHookResult = ReturnType<typeof useUpdateCustomerFirstTimeFlagMutation>;
export type UpdateCustomerFirstTimeFlagMutationResult = Apollo.MutationResult<UpdateCustomerFirstTimeFlagMutation>;
export type UpdateCustomerFirstTimeFlagMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerFirstTimeFlagMutation, UpdateCustomerFirstTimeFlagMutationVariables>;