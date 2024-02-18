/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SocialHallAttendeeFragmentDoc, SocialHallGroupFragmentDoc } from '../fragments/socialHall.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type JoinSocialHallV2MutationVariables = Types.Exact<{
  name?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type JoinSocialHallV2Mutation = { __typename?: 'Mutation', joinSocialHallV2?: { __typename?: 'SocialHallAttendee', _id: string, socialHallId: string, isHost?: boolean | null, hallGroupId?: string | null, rtmToken?: string | null, waitingRoomChannelName?: string | null, eventRole?: { __typename?: 'CurrentUser', userRole?: Types.UserRole | null } | null, attendeeId?: { __typename?: 'UserOutput', bio?: string | null, _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, skills?: Array<{ __typename?: 'Skill', _id: string, name: string, icon: string } | null> | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null };


export const JoinSocialHallV2Document = gql`
    mutation joinSocialHallV2($name: String) {
  joinSocialHallV2(name: $name) {
    ...SocialHallAttendee
  }
}
    ${SocialHallAttendeeFragmentDoc}`;
export type JoinSocialHallV2MutationFn = Apollo.MutationFunction<JoinSocialHallV2Mutation, JoinSocialHallV2MutationVariables>;

/**
 * __useJoinSocialHallV2Mutation__
 *
 * To run a mutation, you first call `useJoinSocialHallV2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinSocialHallV2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinSocialHallV2Mutation, { data, loading, error }] = useJoinSocialHallV2Mutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useJoinSocialHallV2Mutation(baseOptions?: Apollo.MutationHookOptions<JoinSocialHallV2Mutation, JoinSocialHallV2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinSocialHallV2Mutation, JoinSocialHallV2MutationVariables>(JoinSocialHallV2Document, options);
      }
export type JoinSocialHallV2MutationHookResult = ReturnType<typeof useJoinSocialHallV2Mutation>;
export type JoinSocialHallV2MutationResult = Apollo.MutationResult<JoinSocialHallV2Mutation>;
export type JoinSocialHallV2MutationOptions = Apollo.BaseMutationOptions<JoinSocialHallV2Mutation, JoinSocialHallV2MutationVariables>;