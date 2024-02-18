/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCustomerAddressDetailsMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.CustomerAddressInput>;
}>;


export type UpdateCustomerAddressDetailsMutation = { __typename?: 'Mutation', updateCustomerAddressDetails?: { __typename?: 'AddressOutput', apartment?: string | null, city?: string | null, state?: string | null, street?: string | null, zipcode?: string | null } | null };


export const UpdateCustomerAddressDetailsDocument = gql`
    mutation updateCustomerAddressDetails($input: CustomerAddressInput) {
  updateCustomerAddressDetails(input: $input) {
    apartment
    city
    state
    street
    zipcode
  }
}
    `;
export type UpdateCustomerAddressDetailsMutationFn = Apollo.MutationFunction<UpdateCustomerAddressDetailsMutation, UpdateCustomerAddressDetailsMutationVariables>;

/**
 * __useUpdateCustomerAddressDetailsMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerAddressDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerAddressDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerAddressDetailsMutation, { data, loading, error }] = useUpdateCustomerAddressDetailsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCustomerAddressDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerAddressDetailsMutation, UpdateCustomerAddressDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerAddressDetailsMutation, UpdateCustomerAddressDetailsMutationVariables>(UpdateCustomerAddressDetailsDocument, options);
      }
export type UpdateCustomerAddressDetailsMutationHookResult = ReturnType<typeof useUpdateCustomerAddressDetailsMutation>;
export type UpdateCustomerAddressDetailsMutationResult = Apollo.MutationResult<UpdateCustomerAddressDetailsMutation>;
export type UpdateCustomerAddressDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerAddressDetailsMutation, UpdateCustomerAddressDetailsMutationVariables>;