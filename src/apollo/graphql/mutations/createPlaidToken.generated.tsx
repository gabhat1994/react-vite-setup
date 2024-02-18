/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreatePlaidLinkMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreatePlaidLinkMutation = { __typename?: 'Mutation', createPlaidLink?: { __typename?: 'CreatePlaidLinkOutput', link_token: string } | null };


export const CreatePlaidLinkDocument = gql`
    mutation createPlaidLink {
  createPlaidLink {
    link_token
  }
}
    `;
export type CreatePlaidLinkMutationFn = Apollo.MutationFunction<CreatePlaidLinkMutation, CreatePlaidLinkMutationVariables>;

/**
 * __useCreatePlaidLinkMutation__
 *
 * To run a mutation, you first call `useCreatePlaidLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePlaidLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPlaidLinkMutation, { data, loading, error }] = useCreatePlaidLinkMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreatePlaidLinkMutation(baseOptions?: Apollo.MutationHookOptions<CreatePlaidLinkMutation, CreatePlaidLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePlaidLinkMutation, CreatePlaidLinkMutationVariables>(CreatePlaidLinkDocument, options);
      }
export type CreatePlaidLinkMutationHookResult = ReturnType<typeof useCreatePlaidLinkMutation>;
export type CreatePlaidLinkMutationResult = Apollo.MutationResult<CreatePlaidLinkMutation>;
export type CreatePlaidLinkMutationOptions = Apollo.BaseMutationOptions<CreatePlaidLinkMutation, CreatePlaidLinkMutationVariables>;