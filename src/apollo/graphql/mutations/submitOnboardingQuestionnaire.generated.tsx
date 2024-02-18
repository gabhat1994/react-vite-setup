/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SubmitOnboardingQuestionnaireMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Array<Types.InputMaybe<Types.SubmitOnboardingQuestionnaire>> | Types.InputMaybe<Types.SubmitOnboardingQuestionnaire>>;
}>;


export type SubmitOnboardingQuestionnaireMutation = { __typename?: 'Mutation', submitOnboardingQuestionnaire?: { __typename?: 'submitOnboardingQuestionnaireOutput', userStatus?: string | null } | null };


export const SubmitOnboardingQuestionnaireDocument = gql`
    mutation submitOnboardingQuestionnaire($input: [submitOnboardingQuestionnaire]) {
  submitOnboardingQuestionnaire(input: $input) {
    userStatus
  }
}
    `;
export type SubmitOnboardingQuestionnaireMutationFn = Apollo.MutationFunction<SubmitOnboardingQuestionnaireMutation, SubmitOnboardingQuestionnaireMutationVariables>;

/**
 * __useSubmitOnboardingQuestionnaireMutation__
 *
 * To run a mutation, you first call `useSubmitOnboardingQuestionnaireMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitOnboardingQuestionnaireMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitOnboardingQuestionnaireMutation, { data, loading, error }] = useSubmitOnboardingQuestionnaireMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitOnboardingQuestionnaireMutation(baseOptions?: Apollo.MutationHookOptions<SubmitOnboardingQuestionnaireMutation, SubmitOnboardingQuestionnaireMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitOnboardingQuestionnaireMutation, SubmitOnboardingQuestionnaireMutationVariables>(SubmitOnboardingQuestionnaireDocument, options);
      }
export type SubmitOnboardingQuestionnaireMutationHookResult = ReturnType<typeof useSubmitOnboardingQuestionnaireMutation>;
export type SubmitOnboardingQuestionnaireMutationResult = Apollo.MutationResult<SubmitOnboardingQuestionnaireMutation>;
export type SubmitOnboardingQuestionnaireMutationOptions = Apollo.BaseMutationOptions<SubmitOnboardingQuestionnaireMutation, SubmitOnboardingQuestionnaireMutationVariables>;