/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCustomerContactDetailsMutationVariables = Types.Exact<{
  additionalEmail?: Types.InputMaybe<Types.Scalars['String']>;
  mode?: Types.InputMaybe<Types.ModeEnum>;
  phone?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type UpdateCustomerContactDetailsMutation = { __typename?: 'Mutation', updateCustomerContactDetails?: { __typename?: 'ContactOutput', additionalEmail?: string | null, email?: string | null, phone?: string | null, preferredCommunicationMode?: Types.ModeEnum | null } | null };


export const UpdateCustomerContactDetailsDocument = gql`
    mutation updateCustomerContactDetails($additionalEmail: String, $mode: ModeEnum, $phone: String) {
  updateCustomerContactDetails(
    additionalEmail: $additionalEmail
    mode: $mode
    phone: $phone
  ) {
    additionalEmail
    email
    phone
    preferredCommunicationMode
  }
}
    `;
export type UpdateCustomerContactDetailsMutationFn = Apollo.MutationFunction<UpdateCustomerContactDetailsMutation, UpdateCustomerContactDetailsMutationVariables>;

/**
 * __useUpdateCustomerContactDetailsMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerContactDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerContactDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerContactDetailsMutation, { data, loading, error }] = useUpdateCustomerContactDetailsMutation({
 *   variables: {
 *      additionalEmail: // value for 'additionalEmail'
 *      mode: // value for 'mode'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useUpdateCustomerContactDetailsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerContactDetailsMutation, UpdateCustomerContactDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerContactDetailsMutation, UpdateCustomerContactDetailsMutationVariables>(UpdateCustomerContactDetailsDocument, options);
      }
export type UpdateCustomerContactDetailsMutationHookResult = ReturnType<typeof useUpdateCustomerContactDetailsMutation>;
export type UpdateCustomerContactDetailsMutationResult = Apollo.MutationResult<UpdateCustomerContactDetailsMutation>;
export type UpdateCustomerContactDetailsMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerContactDetailsMutation, UpdateCustomerContactDetailsMutationVariables>;