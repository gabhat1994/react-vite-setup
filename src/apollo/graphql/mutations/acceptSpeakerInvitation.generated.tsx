/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type AcceptSpeakerInvitationMutationVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
}>;


export type AcceptSpeakerInvitationMutation = { __typename?: 'Mutation', acceptSpeakerInvitation?: { __typename?: 'SocialGroup', _id: string, invitedAsSpeakers?: Array<{ __typename?: 'SpeakerInvitation', invitee?: { __typename?: 'UserOutput', _id: string, firstName?: string | null } | null, inviter?: { __typename?: 'UserOutput', _id: string, firstName?: string | null } | null } | null> | null } | null };


export const AcceptSpeakerInvitationDocument = gql`
    mutation acceptSpeakerInvitation($groupId: ID!) {
  acceptSpeakerInvitation(groupId: $groupId) {
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
export type AcceptSpeakerInvitationMutationFn = Apollo.MutationFunction<AcceptSpeakerInvitationMutation, AcceptSpeakerInvitationMutationVariables>;

/**
 * __useAcceptSpeakerInvitationMutation__
 *
 * To run a mutation, you first call `useAcceptSpeakerInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptSpeakerInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptSpeakerInvitationMutation, { data, loading, error }] = useAcceptSpeakerInvitationMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useAcceptSpeakerInvitationMutation(baseOptions?: Apollo.MutationHookOptions<AcceptSpeakerInvitationMutation, AcceptSpeakerInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptSpeakerInvitationMutation, AcceptSpeakerInvitationMutationVariables>(AcceptSpeakerInvitationDocument, options);
      }
export type AcceptSpeakerInvitationMutationHookResult = ReturnType<typeof useAcceptSpeakerInvitationMutation>;
export type AcceptSpeakerInvitationMutationResult = Apollo.MutationResult<AcceptSpeakerInvitationMutation>;
export type AcceptSpeakerInvitationMutationOptions = Apollo.BaseMutationOptions<AcceptSpeakerInvitationMutation, AcceptSpeakerInvitationMutationVariables>;