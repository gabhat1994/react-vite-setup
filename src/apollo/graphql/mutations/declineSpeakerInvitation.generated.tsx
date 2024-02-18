/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type DeclineSpeakerInvitationMutationVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
}>;


export type DeclineSpeakerInvitationMutation = { __typename?: 'Mutation', declineSpeakerInvitation?: { __typename?: 'SocialGroup', _id: string, invitedAsSpeakers?: Array<{ __typename?: 'SpeakerInvitation', invitee?: { __typename?: 'UserOutput', _id: string, firstName?: string | null } | null, inviter?: { __typename?: 'UserOutput', _id: string, firstName?: string | null } | null } | null> | null } | null };


export const DeclineSpeakerInvitationDocument = gql`
    mutation declineSpeakerInvitation($groupId: ID!) {
  declineSpeakerInvitation(groupId: $groupId) {
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
export type DeclineSpeakerInvitationMutationFn = Apollo.MutationFunction<DeclineSpeakerInvitationMutation, DeclineSpeakerInvitationMutationVariables>;

/**
 * __useDeclineSpeakerInvitationMutation__
 *
 * To run a mutation, you first call `useDeclineSpeakerInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineSpeakerInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineSpeakerInvitationMutation, { data, loading, error }] = useDeclineSpeakerInvitationMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useDeclineSpeakerInvitationMutation(baseOptions?: Apollo.MutationHookOptions<DeclineSpeakerInvitationMutation, DeclineSpeakerInvitationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineSpeakerInvitationMutation, DeclineSpeakerInvitationMutationVariables>(DeclineSpeakerInvitationDocument, options);
      }
export type DeclineSpeakerInvitationMutationHookResult = ReturnType<typeof useDeclineSpeakerInvitationMutation>;
export type DeclineSpeakerInvitationMutationResult = Apollo.MutationResult<DeclineSpeakerInvitationMutation>;
export type DeclineSpeakerInvitationMutationOptions = Apollo.BaseMutationOptions<DeclineSpeakerInvitationMutation, DeclineSpeakerInvitationMutationVariables>;