/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserAddressMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.AddressInput>;
}>;


export type UpdateUserAddressMutation = { __typename?: 'Mutation', addUserAddress?: { __typename?: 'AddressOutput', street?: string | null, apartment?: string | null, zipcode?: string | null, state?: string | null, city?: string | null } | null };


export const UpdateUserAddressDocument = gql`
    mutation updateUserAddress($input: AddressInput) {
  addUserAddress(input: $input) {
    street
    apartment
    zipcode
    state
    city
  }
}
    `;
export type UpdateUserAddressMutationFn = Apollo.MutationFunction<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>;

/**
 * __useUpdateUserAddressMutation__
 *
 * To run a mutation, you first call `useUpdateUserAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAddressMutation, { data, loading, error }] = useUpdateUserAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserAddressMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>(UpdateUserAddressDocument, options);
      }
export type UpdateUserAddressMutationHookResult = ReturnType<typeof useUpdateUserAddressMutation>;
export type UpdateUserAddressMutationResult = Apollo.MutationResult<UpdateUserAddressMutation>;
export type UpdateUserAddressMutationOptions = Apollo.BaseMutationOptions<UpdateUserAddressMutation, UpdateUserAddressMutationVariables>;