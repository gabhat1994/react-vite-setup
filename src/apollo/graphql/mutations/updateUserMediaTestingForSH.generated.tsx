/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserMediaTestingForShMutationVariables = Types.Exact<{
  accept: Types.Scalars['Boolean'];
}>;


export type UpdateUserMediaTestingForShMutation = { __typename?: 'Mutation', updateUserMediaTestingForSH?: boolean | null };


export const UpdateUserMediaTestingForShDocument = gql`
    mutation updateUserMediaTestingForSH($accept: Boolean!) {
  updateUserMediaTestingForSH(accept: $accept)
}
    `;
export type UpdateUserMediaTestingForShMutationFn = Apollo.MutationFunction<UpdateUserMediaTestingForShMutation, UpdateUserMediaTestingForShMutationVariables>;

/**
 * __useUpdateUserMediaTestingForShMutation__
 *
 * To run a mutation, you first call `useUpdateUserMediaTestingForShMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMediaTestingForShMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMediaTestingForShMutation, { data, loading, error }] = useUpdateUserMediaTestingForShMutation({
 *   variables: {
 *      accept: // value for 'accept'
 *   },
 * });
 */
export function useUpdateUserMediaTestingForShMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMediaTestingForShMutation, UpdateUserMediaTestingForShMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMediaTestingForShMutation, UpdateUserMediaTestingForShMutationVariables>(UpdateUserMediaTestingForShDocument, options);
      }
export type UpdateUserMediaTestingForShMutationHookResult = ReturnType<typeof useUpdateUserMediaTestingForShMutation>;
export type UpdateUserMediaTestingForShMutationResult = Apollo.MutationResult<UpdateUserMediaTestingForShMutation>;
export type UpdateUserMediaTestingForShMutationOptions = Apollo.BaseMutationOptions<UpdateUserMediaTestingForShMutation, UpdateUserMediaTestingForShMutationVariables>;