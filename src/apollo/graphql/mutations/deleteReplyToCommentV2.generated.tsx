/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeleteReplyToCommentV2MutationVariables = Types.Exact<{
  commentId?: Types.InputMaybe<Types.Scalars['String']>;
  postId: Types.Scalars['ID'];
  replyId?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type DeleteReplyToCommentV2Mutation = { __typename?: 'Mutation', deleteReplyToCommentV2?: boolean | null };


export const DeleteReplyToCommentV2Document = gql`
    mutation deleteReplyToCommentV2($commentId: String, $postId: ID!, $replyId: String) {
  deleteReplyToCommentV2(
    commentId: $commentId
    postId: $postId
    replyId: $replyId
  )
}
    `;
export type DeleteReplyToCommentV2MutationFn = Apollo.MutationFunction<DeleteReplyToCommentV2Mutation, DeleteReplyToCommentV2MutationVariables>;

/**
 * __useDeleteReplyToCommentV2Mutation__
 *
 * To run a mutation, you first call `useDeleteReplyToCommentV2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReplyToCommentV2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReplyToCommentV2Mutation, { data, loading, error }] = useDeleteReplyToCommentV2Mutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      postId: // value for 'postId'
 *      replyId: // value for 'replyId'
 *   },
 * });
 */
export function useDeleteReplyToCommentV2Mutation(baseOptions?: Apollo.MutationHookOptions<DeleteReplyToCommentV2Mutation, DeleteReplyToCommentV2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteReplyToCommentV2Mutation, DeleteReplyToCommentV2MutationVariables>(DeleteReplyToCommentV2Document, options);
      }
export type DeleteReplyToCommentV2MutationHookResult = ReturnType<typeof useDeleteReplyToCommentV2Mutation>;
export type DeleteReplyToCommentV2MutationResult = Apollo.MutationResult<DeleteReplyToCommentV2Mutation>;
export type DeleteReplyToCommentV2MutationOptions = Apollo.BaseMutationOptions<DeleteReplyToCommentV2Mutation, DeleteReplyToCommentV2MutationVariables>;