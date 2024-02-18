/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MuteMainEventSpeakerMutationVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
  speakerId: Types.Scalars['ID'];
  actionType: Types.MuteSpeakerType;
}>;


export type MuteMainEventSpeakerMutation = { __typename?: 'Mutation', muteSpeaker?: { __typename?: 'SocialGroup', _id: string } | null };


export const MuteMainEventSpeakerDocument = gql`
    mutation muteMainEventSpeaker($groupId: ID!, $speakerId: ID!, $actionType: MuteSpeakerType!) {
  muteSpeaker(groupId: $groupId, speakerId: $speakerId, actionType: $actionType) {
    _id
  }
}
    `;
export type MuteMainEventSpeakerMutationFn = Apollo.MutationFunction<MuteMainEventSpeakerMutation, MuteMainEventSpeakerMutationVariables>;

/**
 * __useMuteMainEventSpeakerMutation__
 *
 * To run a mutation, you first call `useMuteMainEventSpeakerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMuteMainEventSpeakerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [muteMainEventSpeakerMutation, { data, loading, error }] = useMuteMainEventSpeakerMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      speakerId: // value for 'speakerId'
 *      actionType: // value for 'actionType'
 *   },
 * });
 */
export function useMuteMainEventSpeakerMutation(baseOptions?: Apollo.MutationHookOptions<MuteMainEventSpeakerMutation, MuteMainEventSpeakerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MuteMainEventSpeakerMutation, MuteMainEventSpeakerMutationVariables>(MuteMainEventSpeakerDocument, options);
      }
export type MuteMainEventSpeakerMutationHookResult = ReturnType<typeof useMuteMainEventSpeakerMutation>;
export type MuteMainEventSpeakerMutationResult = Apollo.MutationResult<MuteMainEventSpeakerMutation>;
export type MuteMainEventSpeakerMutationOptions = Apollo.BaseMutationOptions<MuteMainEventSpeakerMutation, MuteMainEventSpeakerMutationVariables>;