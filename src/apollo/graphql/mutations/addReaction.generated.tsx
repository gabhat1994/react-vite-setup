/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { PostReactionFragmentFragmentDoc } from '../fragments/postOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AddReactionMutationVariables = Types.Exact<{
  _id: Types.Scalars['ID'];
  type?: Types.InputMaybe<Types.ReactionCategory>;
}>;


export type AddReactionMutation = { __typename?: 'Mutation', addReaction?: { __typename?: 'PostOutput', _id: string, reactions?: Array<{ __typename?: 'Reaction', _id: string, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null };


export const AddReactionDocument = gql`
    mutation addReaction($_id: ID!, $type: ReactionCategory) {
  addReaction(_id: $_id, type: $type) {
    _id
    reactions {
      ...PostReactionFragment
    }
  }
}
    ${PostReactionFragmentFragmentDoc}`;
export type AddReactionMutationFn = Apollo.MutationFunction<AddReactionMutation, AddReactionMutationVariables>;

/**
 * __useAddReactionMutation__
 *
 * To run a mutation, you first call `useAddReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReactionMutation, { data, loading, error }] = useAddReactionMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useAddReactionMutation(baseOptions?: Apollo.MutationHookOptions<AddReactionMutation, AddReactionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddReactionMutation, AddReactionMutationVariables>(AddReactionDocument, options);
      }
export type AddReactionMutationHookResult = ReturnType<typeof useAddReactionMutation>;
export type AddReactionMutationResult = Apollo.MutationResult<AddReactionMutation>;
export type AddReactionMutationOptions = Apollo.BaseMutationOptions<AddReactionMutation, AddReactionMutationVariables>;