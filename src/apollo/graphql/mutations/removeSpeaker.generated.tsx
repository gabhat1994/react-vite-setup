/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type RemoveSpeakerMutationVariables = Types.Exact<{
  groupId: Types.Scalars['ID'];
  speakerId: Types.Scalars['ID'];
}>;


export type RemoveSpeakerMutation = { __typename?: 'Mutation', removeSpeaker?: { __typename?: 'SocialGroup', _id: string, speakers?: Array<string | null> | null } | null };


export const RemoveSpeakerDocument = gql`
    mutation removeSpeaker($groupId: ID!, $speakerId: ID!) {
  removeSpeaker(groupId: $groupId, speakerId: $speakerId) {
    _id
    speakers
  }
}
    `;
export type RemoveSpeakerMutationFn = Apollo.MutationFunction<RemoveSpeakerMutation, RemoveSpeakerMutationVariables>;

/**
 * __useRemoveSpeakerMutation__
 *
 * To run a mutation, you first call `useRemoveSpeakerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSpeakerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeSpeakerMutation, { data, loading, error }] = useRemoveSpeakerMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      speakerId: // value for 'speakerId'
 *   },
 * });
 */
export function useRemoveSpeakerMutation(baseOptions?: Apollo.MutationHookOptions<RemoveSpeakerMutation, RemoveSpeakerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveSpeakerMutation, RemoveSpeakerMutationVariables>(RemoveSpeakerDocument, options);
      }
export type RemoveSpeakerMutationHookResult = ReturnType<typeof useRemoveSpeakerMutation>;
export type RemoveSpeakerMutationResult = Apollo.MutationResult<RemoveSpeakerMutation>;
export type RemoveSpeakerMutationOptions = Apollo.BaseMutationOptions<RemoveSpeakerMutation, RemoveSpeakerMutationVariables>;