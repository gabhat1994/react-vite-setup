/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InviteAsSpeakerMutationVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
  invitedUserIds: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
}>;


export type InviteAsSpeakerMutation = { __typename?: 'Mutation', inviteAsSpeaker?: { __typename?: 'SocialGroup', _id: string, invitedAsSpeakers?: Array<{ __typename?: 'SpeakerInvitation', invitee?: { __typename?: 'UserOutput', _id: string, firstName?: string | null } | null, inviter?: { __typename?: 'UserOutput', _id: string, firstName?: string | null } | null } | null> | null } | null };


export const InviteAsSpeakerDocument = gql`
    mutation inviteAsSpeaker($groupId: ID!, $invitedUserIds: [ID!]!) {
  inviteAsSpeaker(groupId: $groupId, invitedUserIds: $invitedUserIds) {
    _id
    invitedAsSpeakers {
      invitee {
        _id
        firstName
      }
      inviter {
        _id
        firstName
      }
    }
  }
}
    `;
export type InviteAsSpeakerMutationFn = Apollo.MutationFunction<InviteAsSpeakerMutation, InviteAsSpeakerMutationVariables>;

/**
 * __useInviteAsSpeakerMutation__
 *
 * To run a mutation, you first call `useInviteAsSpeakerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteAsSpeakerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteAsSpeakerMutation, { data, loading, error }] = useInviteAsSpeakerMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      invitedUserIds: // value for 'invitedUserIds'
 *   },
 * });
 */
export function useInviteAsSpeakerMutation(baseOptions?: Apollo.MutationHookOptions<InviteAsSpeakerMutation, InviteAsSpeakerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteAsSpeakerMutation, InviteAsSpeakerMutationVariables>(InviteAsSpeakerDocument, options);
      }
export type InviteAsSpeakerMutationHookResult = ReturnType<typeof useInviteAsSpeakerMutation>;
export type InviteAsSpeakerMutationResult = Apollo.MutationResult<InviteAsSpeakerMutation>;
export type InviteAsSpeakerMutationOptions = Apollo.BaseMutationOptions<InviteAsSpeakerMutation, InviteAsSpeakerMutationVariables>;