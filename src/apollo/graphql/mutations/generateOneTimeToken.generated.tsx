/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GenerateOneTimeTokenMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type GenerateOneTimeTokenMutation = { __typename?: 'Mutation', generateOneTimeToken?: string | null };


export const GenerateOneTimeTokenDocument = gql`
    mutation generateOneTimeToken {
  generateOneTimeToken
}
    `;
export type GenerateOneTimeTokenMutationFn = Apollo.MutationFunction<GenerateOneTimeTokenMutation, GenerateOneTimeTokenMutationVariables>;

/**
 * __useGenerateOneTimeTokenMutation__
 *
 * To run a mutation, you first call `useGenerateOneTimeTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateOneTimeTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateOneTimeTokenMutation, { data, loading, error }] = useGenerateOneTimeTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateOneTimeTokenMutation(baseOptions?: Apollo.MutationHookOptions<GenerateOneTimeTokenMutation, GenerateOneTimeTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateOneTimeTokenMutation, GenerateOneTimeTokenMutationVariables>(GenerateOneTimeTokenDocument, options);
      }
export type GenerateOneTimeTokenMutationHookResult = ReturnType<typeof useGenerateOneTimeTokenMutation>;
export type GenerateOneTimeTokenMutationResult = Apollo.MutationResult<GenerateOneTimeTokenMutation>;
export type GenerateOneTimeTokenMutationOptions = Apollo.BaseMutationOptions<GenerateOneTimeTokenMutation, GenerateOneTimeTokenMutationVariables>;