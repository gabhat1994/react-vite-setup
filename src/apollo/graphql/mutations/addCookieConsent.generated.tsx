/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddCookieConsentMutationVariables = Types.Exact<{
  input: Types.CookieConsentInput;
}>;


export type AddCookieConsentMutation = { __typename?: 'Mutation', addCookieConsent?: { __typename?: 'CookieConsentOutput', cookieConsentId?: string | null, cookieConsent?: boolean | null, createdAt?: any | null } | null };


export const AddCookieConsentDocument = gql`
    mutation addCookieConsent($input: CookieConsentInput!) {
  addCookieConsent(input: $input) {
    cookieConsentId
    cookieConsent
    createdAt
  }
}
    `;
export type AddCookieConsentMutationFn = Apollo.MutationFunction<AddCookieConsentMutation, AddCookieConsentMutationVariables>;

/**
 * __useAddCookieConsentMutation__
 *
 * To run a mutation, you first call `useAddCookieConsentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCookieConsentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCookieConsentMutation, { data, loading, error }] = useAddCookieConsentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddCookieConsentMutation(baseOptions?: Apollo.MutationHookOptions<AddCookieConsentMutation, AddCookieConsentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCookieConsentMutation, AddCookieConsentMutationVariables>(AddCookieConsentDocument, options);
      }
export type AddCookieConsentMutationHookResult = ReturnType<typeof useAddCookieConsentMutation>;
export type AddCookieConsentMutationResult = Apollo.MutationResult<AddCookieConsentMutation>;
export type AddCookieConsentMutationOptions = Apollo.BaseMutationOptions<AddCookieConsentMutation, AddCookieConsentMutationVariables>;