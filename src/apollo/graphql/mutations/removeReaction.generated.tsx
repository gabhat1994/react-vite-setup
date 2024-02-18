/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { PostReactionFragmentFragmentDoc } from '../fragments/postOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveReactionMutationVariables = Types.Exact<{
  _id: Types.Scalars['ID'];
  type?: Types.InputMaybe<Types.ReactionCategory>;
}>;


export type RemoveReactionMutation = { __typename?: 'Mutation', removeReaction?: { __typename?: 'PostOutput', _id: string, reactions?: Array<{ __typename?: 'Reaction', _id: string, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null };


export const RemoveReactionDocument = gql`
    mutation removeReaction($_id: ID!, $type: ReactionCategory) {
  removeReaction(_id: $_id, type: $type) {
    _id
    reactions {
      ...PostReactionFragment
    }
  }
}
    ${PostReactionFragmentFragmentDoc}`;
export type RemoveReactionMutationFn = Apollo.MutationFunction<RemoveReactionMutation, RemoveReactionMutationVariables>;

/**
 * __useRemoveReactionMutation__
 *
 * To run a mutation, you first call `useRemoveReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeReactionMutation, { data, loading, error }] = useRemoveReactionMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useRemoveReactionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveReactionMutation, RemoveReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveReactionMutation, RemoveReactionMutationVariables>(RemoveReactionDocument, options);
      }
export type RemoveReactionMutationHookResult = ReturnType<typeof useRemoveReactionMutation>;
export type RemoveReactionMutationResult = Apollo.MutationResult<RemoveReactionMutation>;
export type RemoveReactionMutationOptions = Apollo.BaseMutationOptions<RemoveReactionMutation, RemoveReactionMutationVariables>;