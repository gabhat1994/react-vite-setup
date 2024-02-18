/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdatePrivacyMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.NoumenaScoreVisibilityInput>;
}>;


export type UpdatePrivacyMutation = { __typename?: 'Mutation', capitalquotient?: { __typename?: 'CapitalquotientMutations', updateNoumenaScoreVisibility?: { __typename?: 'NoumenaScoreOutput', visibility?: string | null } | null } | null };


export const UpdatePrivacyDocument = gql`
    mutation updatePrivacy($input: NoumenaScoreVisibilityInput) {
  capitalquotient {
    updateNoumenaScoreVisibility(input: $input) {
      visibility
    }
  }
}
    `;
export type UpdatePrivacyMutationFn = Apollo.MutationFunction<UpdatePrivacyMutation, UpdatePrivacyMutationVariables>;

/**
 * __useUpdatePrivacyMutation__
 *
 * To run a mutation, you first call `useUpdatePrivacyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePrivacyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePrivacyMutation, { data, loading, error }] = useUpdatePrivacyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePrivacyMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePrivacyMutation, UpdatePrivacyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePrivacyMutation, UpdatePrivacyMutationVariables>(UpdatePrivacyDocument, options);
      }
export type UpdatePrivacyMutationHookResult = ReturnType<typeof useUpdatePrivacyMutation>;
export type UpdatePrivacyMutationResult = Apollo.MutationResult<UpdatePrivacyMutation>;
export type UpdatePrivacyMutationOptions = Apollo.BaseMutationOptions<UpdatePrivacyMutation, UpdatePrivacyMutationVariables>;