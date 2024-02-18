/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateAccountDwollaMutationVariables = Types.Exact<{
  plaidToken: Types.Scalars['String'];
}>;


export type CreateAccountDwollaMutation = { __typename?: 'Mutation', createAccountDwolla?: { __typename?: 'MessageOutput', message?: string | null } | null };

export type RemoveAccountMutationVariables = Types.Exact<{
  id: Types.Scalars['String'];
}>;


export type RemoveAccountMutation = { __typename?: 'Mutation', removeAccount?: { __typename?: 'MessageOutput', message?: string | null } | null };

export type UpdatePersonalInfoMutationVariables = Types.Exact<{
  input: Types.CustomerAddressInput;
}>;


export type UpdatePersonalInfoMutation = { __typename?: 'Mutation', updateCustomerAddressDetails?: { __typename?: 'AddressOutput', street?: string | null } | null };


export const CreateAccountDwollaDocument = gql`
    mutation createAccountDwolla($plaidToken: String!) {
  createAccountDwolla(plaidToken: $plaidToken) {
    message
  }
}
    `;
export type CreateAccountDwollaMutationFn = Apollo.MutationFunction<CreateAccountDwollaMutation, CreateAccountDwollaMutationVariables>;

/**
 * __useCreateAccountDwollaMutation__
 *
 * To run a mutation, you first call `useCreateAccountDwollaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountDwollaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountDwollaMutation, { data, loading, error }] = useCreateAccountDwollaMutation({
 *   variables: {
 *      plaidToken: // value for 'plaidToken'
 *   },
 * });
 */
export function useCreateAccountDwollaMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountDwollaMutation, CreateAccountDwollaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountDwollaMutation, CreateAccountDwollaMutationVariables>(CreateAccountDwollaDocument, options);
      }
export type CreateAccountDwollaMutationHookResult = ReturnType<typeof useCreateAccountDwollaMutation>;
export type CreateAccountDwollaMutationResult = Apollo.MutationResult<CreateAccountDwollaMutation>;
export type CreateAccountDwollaMutationOptions = Apollo.BaseMutationOptions<CreateAccountDwollaMutation, CreateAccountDwollaMutationVariables>;
export const RemoveAccountDocument = gql`
    mutation removeAccount($id: String!) {
  removeAccount(id: $id) {
    message
  }
}
    `;
export type RemoveAccountMutationFn = Apollo.MutationFunction<RemoveAccountMutation, RemoveAccountMutationVariables>;

/**
 * __useRemoveAccountMutation__
 *
 * To run a mutation, you first call `useRemoveAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAccountMutation, { data, loading, error }] = useRemoveAccountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveAccountMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAccountMutation, RemoveAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveAccountMutation, RemoveAccountMutationVariables>(RemoveAccountDocument, options);
      }
export type RemoveAccountMutationHookResult = ReturnType<typeof useRemoveAccountMutation>;
export type RemoveAccountMutationResult = Apollo.MutationResult<RemoveAccountMutation>;
export type RemoveAccountMutationOptions = Apollo.BaseMutationOptions<RemoveAccountMutation, RemoveAccountMutationVariables>;
export const UpdatePersonalInfoDocument = gql`
    mutation updatePersonalInfo($input: CustomerAddressInput!) {
  updateCustomerAddressDetails(input: $input) {
    street
  }
}
    `;
export type UpdatePersonalInfoMutationFn = Apollo.MutationFunction<UpdatePersonalInfoMutation, UpdatePersonalInfoMutationVariables>;

/**
 * __useUpdatePersonalInfoMutation__
 *
 * To run a mutation, you first call `useUpdatePersonalInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePersonalInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePersonalInfoMutation, { data, loading, error }] = useUpdatePersonalInfoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePersonalInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePersonalInfoMutation, UpdatePersonalInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePersonalInfoMutation, UpdatePersonalInfoMutationVariables>(UpdatePersonalInfoDocument, options);
      }
export type UpdatePersonalInfoMutationHookResult = ReturnType<typeof useUpdatePersonalInfoMutation>;
export type UpdatePersonalInfoMutationResult = Apollo.MutationResult<UpdatePersonalInfoMutation>;
export type UpdatePersonalInfoMutationOptions = Apollo.BaseMutationOptions<UpdatePersonalInfoMutation, UpdatePersonalInfoMutationVariables>;