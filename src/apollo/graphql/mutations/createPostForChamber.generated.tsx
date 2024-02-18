/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreatePostForChamberMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.PostInput>;
}>;


export type CreatePostForChamberMutation = { __typename?: 'Mutation', createPostForChamber?: { __typename?: 'PostOutput', _id: string, postStatus?: Types.PostStatus | null } | null };


export const CreatePostForChamberDocument = gql`
    mutation createPostForChamber($input: PostInput) {
  createPostForChamber(input: $input) {
    _id
    postStatus
  }
}
    `;
export type CreatePostForChamberMutationFn = Apollo.MutationFunction<CreatePostForChamberMutation, CreatePostForChamberMutationVariables>;

/**
 * __useCreatePostForChamberMutation__
 *
 * To run a mutation, you first call `useCreatePostForChamberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostForChamberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostForChamberMutation, { data, loading, error }] = useCreatePostForChamberMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostForChamberMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostForChamberMutation, CreatePostForChamberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostForChamberMutation, CreatePostForChamberMutationVariables>(CreatePostForChamberDocument, options);
      }
export type CreatePostForChamberMutationHookResult = ReturnType<typeof useCreatePostForChamberMutation>;
export type CreatePostForChamberMutationResult = Apollo.MutationResult<CreatePostForChamberMutation>;
export type CreatePostForChamberMutationOptions = Apollo.BaseMutationOptions<CreatePostForChamberMutation, CreatePostForChamberMutationVariables>;