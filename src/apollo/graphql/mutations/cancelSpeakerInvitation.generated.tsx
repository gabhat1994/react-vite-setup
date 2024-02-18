/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CancelSpeakerInvitationMutationVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
  invitedUserId: Types.Scalars['ID'];
}>;


export type CancelSpeakerInvitationMutation = { __typename?: 'Mutation', cancelSpeakerInvitation?: { __typename?: 'SocialGroup', _id: string, invitedAsSpeakers?: Array<{ __typename?: 'SpeakerInvitation', invitee?: { __typename?: 'UserOutput', _id: string, firstName?: string | null } | null, inviter?: { __typename?: 'UserOutput', _id: string, firstName?: string | null } | null } | null> | null } | null };


export const CancelSpeakerInvitationDocument = gql`
    mutation cancelSpeakerInvitation($groupId: ID!, $invitedUserId: ID!) {
  cancelSpeakerInvitation(groupId: $groupId, invitedUserId: $invitedUserId) {
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
export type CancelSpeakerInvitationMutationFn = Apollo.MutationFunction<CancelSpeakerInvitationMutation, CancelSpeakerInvitationMutationVariables>;

/**
 * __useCancelSpeakerInvitationMutation__
 *
 * To run a mutation, you first call `useCancelSpeakerInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelSpeakerInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelSpeakerInvitationMutation, { data, loading, error }] = useCancelSpeakerInvitationMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      invitedUserId: // value for 'invitedUserId'
 *   },
 * });
 */
export function useCancelSpeakerInvitationMutation(baseOptions?: Apollo.MutationHookOptions<CancelSpeakerInvitationMutation, CancelSpeakerInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelSpeakerInvitationMutation, CancelSpeakerInvitationMutationVariables>(CancelSpeakerInvitationDocument, options);
      }
export type CancelSpeakerInvitationMutationHookResult = ReturnType<typeof useCancelSpeakerInvitationMutation>;
export type CancelSpeakerInvitationMutationResult = Apollo.MutationResult<CancelSpeakerInvitationMutation>;
export type CancelSpeakerInvitationMutationOptions = Apollo.BaseMutationOptions<CancelSpeakerInvitationMutation, CancelSpeakerInvitationMutationVariables>;