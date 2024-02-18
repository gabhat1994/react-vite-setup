/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InitiateTipForAnswerMutationVariables = Types.Exact<{
  input: Types.TipsInput;
}>;


export type InitiateTipForAnswerMutation = { __typename?: 'Mutation', initiateTipForAnswer?: boolean | null };


export const InitiateTipForAnswerDocument = gql`
    mutation initiateTipForAnswer($input: TipsInput!) {
  initiateTipForAnswer(input: $input)
}
    `;
export type InitiateTipForAnswerMutationFn = Apollo.MutationFunction<InitiateTipForAnswerMutation, InitiateTipForAnswerMutationVariables>;

/**
 * __useInitiateTipForAnswerMutation__
 *
 * To run a mutation, you first call `useInitiateTipForAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitiateTipForAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initiateTipForAnswerMutation, { data, loading, error }] = useInitiateTipForAnswerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInitiateTipForAnswerMutation(baseOptions?: Apollo.MutationHookOptions<InitiateTipForAnswerMutation, InitiateTipForAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InitiateTipForAnswerMutation, InitiateTipForAnswerMutationVariables>(InitiateTipForAnswerDocument, options);
      }
export type InitiateTipForAnswerMutationHookResult = ReturnType<typeof useInitiateTipForAnswerMutation>;
export type InitiateTipForAnswerMutationResult = Apollo.MutationResult<InitiateTipForAnswerMutation>;
export type InitiateTipForAnswerMutationOptions = Apollo.BaseMutationOptions<InitiateTipForAnswerMutation, InitiateTipForAnswerMutationVariables>;