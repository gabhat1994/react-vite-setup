/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateNotificationMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type CreateNotificationMutation = { __typename?: 'Mutation', createNotification?: boolean | null };


export const CreateNotificationDocument = gql`
    mutation createNotification($input: String) {
  createNotification(input: $input)
}
    `;
export type CreateNotificationMutationFn = Apollo.MutationFunction<CreateNotificationMutation, CreateNotificationMutationVariables>;

/**
 * __useCreateNotificationMutation__
 *
 * To run a mutation, you first call `useCreateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNotificationMutation, { data, loading, error }] = useCreateNotificationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNotificationMutation(baseOptions?: Apollo.MutationHookOptions<CreateNotificationMutation, CreateNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNotificationMutation, CreateNotificationMutationVariables>(CreateNotificationDocument, options);
      }
export type CreateNotificationMutationHookResult = ReturnType<typeof useCreateNotificationMutation>;
export type CreateNotificationMutationResult = Apollo.MutationResult<CreateNotificationMutation>;
export type CreateNotificationMutationOptions = Apollo.BaseMutationOptions<CreateNotificationMutation, CreateNotificationMutationVariables>;