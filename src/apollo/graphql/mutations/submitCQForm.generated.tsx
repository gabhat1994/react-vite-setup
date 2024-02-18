/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CqFormOutputFragmentDoc } from '../fragments/capitalQuotient.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SubmitCqFormMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.CqFormInput>;
}>;


export type SubmitCqFormMutation = { __typename?: 'Mutation', capitalquotient?: { __typename?: 'CapitalquotientMutations', submitCQForm?: { __typename?: 'CQFormOutput', updatedAt?: string | null, status?: string | null, forms?: Array<{ __typename?: 'CQForm', details?: any | null, formId?: string | null, status?: string | null } | null> | null } | null } | null };


export const SubmitCqFormDocument = gql`
    mutation submitCQForm($input: CQFormInput) {
  capitalquotient {
    submitCQForm(input: $input) {
      ...CQFormOutput
    }
  }
}
    ${CqFormOutputFragmentDoc}`;
export type SubmitCqFormMutationFn = Apollo.MutationFunction<SubmitCqFormMutation, SubmitCqFormMutationVariables>;

/**
 * __useSubmitCqFormMutation__
 *
 * To run a mutation, you first call `useSubmitCqFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitCqFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitCqFormMutation, { data, loading, error }] = useSubmitCqFormMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitCqFormMutation(baseOptions?: Apollo.MutationHookOptions<SubmitCqFormMutation, SubmitCqFormMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitCqFormMutation, SubmitCqFormMutationVariables>(SubmitCqFormDocument, options);
      }
export type SubmitCqFormMutationHookResult = ReturnType<typeof useSubmitCqFormMutation>;
export type SubmitCqFormMutationResult = Apollo.MutationResult<SubmitCqFormMutation>;
export type SubmitCqFormMutationOptions = Apollo.BaseMutationOptions<SubmitCqFormMutation, SubmitCqFormMutationVariables>;