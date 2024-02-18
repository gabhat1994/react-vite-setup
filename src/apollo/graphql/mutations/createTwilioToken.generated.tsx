/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateTwilioTokenMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CreateTwilioTokenMutation = { __typename?: 'Mutation', createTwilioToken?: { __typename?: 'TwilioTokenOutput', token?: string | null } | null };


export const CreateTwilioTokenDocument = gql`
    mutation createTwilioToken {
  createTwilioToken {
    token
  }
}
    `;
export type CreateTwilioTokenMutationFn = Apollo.MutationFunction<CreateTwilioTokenMutation, CreateTwilioTokenMutationVariables>;

/**
 * __useCreateTwilioTokenMutation__
 *
 * To run a mutation, you first call `useCreateTwilioTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTwilioTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTwilioTokenMutation, { data, loading, error }] = useCreateTwilioTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateTwilioTokenMutation(baseOptions?: Apollo.MutationHookOptions<CreateTwilioTokenMutation, CreateTwilioTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTwilioTokenMutation, CreateTwilioTokenMutationVariables>(CreateTwilioTokenDocument, options);
      }
export type CreateTwilioTokenMutationHookResult = ReturnType<typeof useCreateTwilioTokenMutation>;
export type CreateTwilioTokenMutationResult = Apollo.MutationResult<CreateTwilioTokenMutation>;
export type CreateTwilioTokenMutationOptions = Apollo.BaseMutationOptions<CreateTwilioTokenMutation, CreateTwilioTokenMutationVariables>;