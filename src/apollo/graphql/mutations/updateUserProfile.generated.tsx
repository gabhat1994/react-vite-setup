/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { UserFragmentDoc } from '../fragments/user.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateUserProfileMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.UserProfileInput>;
}>;


export type UpdateUserProfileMutation = { __typename?: 'Mutation', updateUserProfile?: { __typename?: 'User', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, username?: string | null, email?: string | null, userStatus?: string | null, phone?: string | null, dob?: string | null, referralCode?: string | null, createdAt?: any | null, isAcceptedSkipMediaTesting?: boolean | null, location?: string | null, title?: string | null, bio?: string | null, userSocialHall?: { __typename?: 'UserSocialHall', _id?: string | null, name?: string | null, type?: Types.SocialHallType | null, isActive: boolean } | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, roleType?: string | null, permissions?: Array<string | null> | null } | null> | null, credentials?: Array<{ __typename?: 'UserCredentialsOutput', providerType?: Types.ProviderVariant | null } | null> | null, profile?: { __typename?: 'Profile', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, reason?: string | null, moreInfo?: string | null, statusTo?: string | null, statusFrom?: string | null, changeOn?: any | null, changedBy?: string | null, changedByDetails?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null, skills?: Array<{ __typename?: 'Skill', _id: string, name: string, icon: string } | null> | null } | null };


export const UpdateUserProfileDocument = gql`
    mutation updateUserProfile($input: UserProfileInput) {
  updateUserProfile(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>(UpdateUserProfileDocument, options);
      }
export type UpdateUserProfileMutationHookResult = ReturnType<typeof useUpdateUserProfileMutation>;
export type UpdateUserProfileMutationResult = Apollo.MutationResult<UpdateUserProfileMutation>;
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<UpdateUserProfileMutation, UpdateUserProfileMutationVariables>;