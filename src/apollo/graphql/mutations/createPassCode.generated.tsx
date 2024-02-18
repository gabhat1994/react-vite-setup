/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreatePassCodeMutationVariables = Types.Exact<{
  input: Types.CreatePassCodeInput;
}>;


export type CreatePassCodeMutation = { __typename?: 'Mutation', createPassCode?: { __typename?: 'MessageOutput', message?: string | null } | null };


export const CreatePassCodeDocument = gql`
    mutation createPassCode($input: CreatePassCodeInput!) {
  createPassCode(input: $input) {
    message
  }
}
    `;
export type CreatePassCodeMutationFn = Apollo.MutationFunction<CreatePassCodeMutation, CreatePassCodeMutationVariables>;

/**
 * __useCreatePassCodeMutation__
 *
 * To run a mutation, you first call `useCreatePassCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePassCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPassCodeMutation, { data, loading, error }] = useCreatePassCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePassCodeMutation(baseOptions?: Apollo.MutationHookOptions<CreatePassCodeMutation, CreatePassCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePassCodeMutation, CreatePassCodeMutationVariables>(CreatePassCodeDocument, options);
      }
export type CreatePassCodeMutationHookResult = ReturnType<typeof useCreatePassCodeMutation>;
export type CreatePassCodeMutationResult = Apollo.MutationResult<CreatePassCodeMutation>;
export type CreatePassCodeMutationOptions = Apollo.BaseMutationOptions<CreatePassCodeMutation, CreatePassCodeMutationVariables>;