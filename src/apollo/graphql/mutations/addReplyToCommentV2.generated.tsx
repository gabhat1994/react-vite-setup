/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ThreadOutputFragmentDoc } from '../fragments/threadOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddReplyToCommentV2MutationVariables = Types.Exact<{
  commentId?: Types.InputMaybe<Types.Scalars['ID']>;
  content?: Types.InputMaybe<Types.Scalars['String']>;
  tags?: Types.InputMaybe<Array<Types.InputMaybe<Types.TagsInput>> | Types.InputMaybe<Types.TagsInput>>;
}>;


export type AddReplyToCommentV2Mutation = { __typename?: 'Mutation', addReplyToCommentV2?: { __typename?: 'ThreadOutput', _id?: string | null, content?: string | null, createdAt?: any | null, tags?: Array<{ __typename?: 'TagsOutput', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null };


export const AddReplyToCommentV2Document = gql`
    mutation addReplyToCommentV2($commentId: ID, $content: String, $tags: [TagsInput]) {
  addReplyToCommentV2(commentId: $commentId, content: $content, tags: $tags) {
    ...ThreadOutput
  }
}
    ${ThreadOutputFragmentDoc}`;
export type AddReplyToCommentV2MutationFn = Apollo.MutationFunction<AddReplyToCommentV2Mutation, AddReplyToCommentV2MutationVariables>;

/**
 * __useAddReplyToCommentV2Mutation__
 *
 * To run a mutation, you first call `useAddReplyToCommentV2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReplyToCommentV2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReplyToCommentV2Mutation, { data, loading, error }] = useAddReplyToCommentV2Mutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      content: // value for 'content'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useAddReplyToCommentV2Mutation(baseOptions?: Apollo.MutationHookOptions<AddReplyToCommentV2Mutation, AddReplyToCommentV2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddReplyToCommentV2Mutation, AddReplyToCommentV2MutationVariables>(AddReplyToCommentV2Document, options);
      }
export type AddReplyToCommentV2MutationHookResult = ReturnType<typeof useAddReplyToCommentV2Mutation>;
export type AddReplyToCommentV2MutationResult = Apollo.MutationResult<AddReplyToCommentV2Mutation>;
export type AddReplyToCommentV2MutationOptions = Apollo.BaseMutationOptions<AddReplyToCommentV2Mutation, AddReplyToCommentV2MutationVariables>;