/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateSocialHallMutationVariables = Types.Exact<{
  hallId?: Types.InputMaybe<Types.Scalars['String']>;
  input?: Types.InputMaybe<Types.UpdateSocialHallInput>;
}>;


export type UpdateSocialHallMutation = { __typename?: 'Mutation', updateSocialHall?: { __typename?: 'SocialHall', _id: string, endTime?: any | null, isActive: boolean, name?: string | null, startTime?: any | null, attendees?: Array<{ __typename?: 'UserOutput', SocialHallTCAccepted?: boolean | null, _id: string, bio?: string | null, citizenship?: string | null, connection?: Types.ConnectionType | null, createdAt?: any | null, creditCheckResult?: string | null, email?: string | null, firstName?: string | null, kycResult?: string | null, lastLoginAt?: any | null, lastName?: string | null, location?: string | null, middleName?: string | null, phone?: string | null, profileUrl?: string | null, referralCode?: string | null, status?: string | null, title?: string | null, unreadConnectionCount?: number | null, updatedAt?: any | null, userOwnReferralCode?: string | null, userStatus?: string | null, username?: string | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, connections?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, changeOn?: any | null, changedBy?: string | null, moreInfo?: string | null, reason?: string | null, statusFrom?: string | null, statusTo?: string | null, changedByDetails?: { __typename?: 'UserOutput', SocialHallTCAccepted?: boolean | null, _id: string, bio?: string | null, citizenship?: string | null, connection?: Types.ConnectionType | null, createdAt?: any | null, creditCheckResult?: string | null, email?: string | null, firstName?: string | null, kycResult?: string | null, lastLoginAt?: any | null, lastName?: string | null, location?: string | null, middleName?: string | null, phone?: string | null, profileUrl?: string | null, referralCode?: string | null, status?: string | null, title?: string | null, unreadConnectionCount?: number | null, updatedAt?: any | null, userOwnReferralCode?: string | null, userStatus?: string | null, username?: string | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, connections?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, changeOn?: any | null, changedBy?: string | null, moreInfo?: string | null, reason?: string | null, statusFrom?: string | null, statusTo?: string | null } | null> | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', link?: string | null, name?: string | null } | null> | null } | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, permissions?: Array<string | null> | null, roleType?: string | null } | null> | null, skills?: Array<{ __typename?: 'Skill', _id: string, icon: string, name: string } | null> | null, visibility?: { __typename?: 'UserOutputVisibility', email?: string | null, location?: string | null, phone?: string | null } | null, visibleTo?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null } | null } | null> | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, permissions?: Array<string | null> | null, roleType?: string | null } | null> | null, skills?: Array<{ __typename?: 'Skill', _id: string, icon: string, name: string } | null> | null, visibility?: { __typename?: 'UserOutputVisibility', email?: string | null, location?: string | null, phone?: string | null } | null, visibleTo?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null } | null> | null, hosts?: Array<{ __typename?: 'UserOutput', SocialHallTCAccepted?: boolean | null, _id: string, bio?: string | null, citizenship?: string | null, connection?: Types.ConnectionType | null, createdAt?: any | null, creditCheckResult?: string | null, email?: string | null, firstName?: string | null, kycResult?: string | null, lastLoginAt?: any | null, lastName?: string | null, location?: string | null, middleName?: string | null, phone?: string | null, profileUrl?: string | null, referralCode?: string | null, status?: string | null, title?: string | null, unreadConnectionCount?: number | null, updatedAt?: any | null, userOwnReferralCode?: string | null, userStatus?: string | null, username?: string | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, connections?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, changeOn?: any | null, changedBy?: string | null, moreInfo?: string | null, reason?: string | null, statusFrom?: string | null, statusTo?: string | null } | null> | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, permissions?: Array<string | null> | null, roleType?: string | null } | null> | null, skills?: Array<{ __typename?: 'Skill', _id: string, icon: string, name: string } | null> | null, visibility?: { __typename?: 'UserOutputVisibility', email?: string | null, location?: string | null, phone?: string | null } | null, visibleTo?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null } | null> | null, ownerUserId?: { __typename?: 'UserOutput', SocialHallTCAccepted?: boolean | null, _id: string, bio?: string | null, citizenship?: string | null, connection?: Types.ConnectionType | null, createdAt?: any | null, creditCheckResult?: string | null, email?: string | null, firstName?: string | null, kycResult?: string | null, lastLoginAt?: any | null, lastName?: string | null, location?: string | null, middleName?: string | null, phone?: string | null, profileUrl?: string | null, referralCode?: string | null, status?: string | null, title?: string | null, unreadConnectionCount?: number | null, updatedAt?: any | null, userOwnReferralCode?: string | null, userStatus?: string | null, username?: string | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, connections?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, changeOn?: any | null, changedBy?: string | null, moreInfo?: string | null, reason?: string | null, statusFrom?: string | null, statusTo?: string | null } | null> | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, permissions?: Array<string | null> | null, roleType?: string | null } | null> | null, skills?: Array<{ __typename?: 'Skill', _id: string, icon: string, name: string } | null> | null, visibility?: { __typename?: 'UserOutputVisibility', email?: string | null, location?: string | null, phone?: string | null } | null, visibleTo?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null } | null } | null };


export const UpdateSocialHallDocument = gql`
    mutation updateSocialHall($hallId: String, $input: UpdateSocialHallInput) {
  updateSocialHall(hallId: $hallId, input: $input) {
    _id
    attendees {
      SocialHallTCAccepted
      _id
      ageGroup {
        max
        min
      }
      bio
      citizenship
      connection
      connections {
        userid
      }
      createdAt
      creditCheckResult
      email
      firstName
      freelancingExperience {
        max
        min
      }
      kycResult
      lastLoginAt
      lastName
      location
      metadata {
        additionalInfo
        changeOn
        changedBy
        changedByDetails {
          SocialHallTCAccepted
          _id
          ageGroup {
            max
            min
          }
          bio
          citizenship
          connection
          connections {
            userid
          }
          createdAt
          creditCheckResult
          email
          firstName
          freelancingExperience {
            max
            min
          }
          kycResult
          lastLoginAt
          lastName
          location
          metadata {
            additionalInfo
            changeOn
            changedBy
            moreInfo
            reason
            statusFrom
            statusTo
          }
          middleName
          phone
          profile {
            _id
            profilePicture
            profilePictureThumbnail
            socialLinks {
              link
              name
            }
          }
          profileUrl
          referralCode
          roles {
            _id
            permissions
            roleType
          }
          skills {
            _id
            icon
            name
          }
          status
          title
          unreadConnectionCount
          updatedAt
          userOwnReferralCode
          userStatus
          username
          visibility {
            email
            location
            phone
          }
          visibleTo {
            userid
          }
        }
        moreInfo
        reason
        statusFrom
        statusTo
      }
      middleName
      phone
      profile {
        _id
        profilePicture
        profilePictureThumbnail
      }
      profileUrl
      referralCode
      roles {
        _id
        permissions
        roleType
      }
      skills {
        _id
        icon
        name
      }
      status
      title
      unreadConnectionCount
      updatedAt
      userOwnReferralCode
      userStatus
      username
      visibility {
        email
        location
        phone
      }
      visibleTo {
        userid
      }
    }
    endTime
    hosts {
      SocialHallTCAccepted
      _id
      ageGroup {
        max
        min
      }
      bio
      citizenship
      connection
      connections {
        userid
      }
      createdAt
      creditCheckResult
      email
      firstName
      freelancingExperience {
        max
        min
      }
      kycResult
      lastLoginAt
      lastName
      location
      metadata {
        additionalInfo
        changeOn
        changedBy
        moreInfo
        reason
        statusFrom
        statusTo
      }
      middleName
      phone
      profile {
        _id
        profilePicture
        profilePictureThumbnail
      }
      profileUrl
      referralCode
      roles {
        _id
        permissions
        roleType
      }
      skills {
        _id
        icon
        name
      }
      status
      title
      unreadConnectionCount
      updatedAt
      userOwnReferralCode
      userStatus
      username
      visibility {
        email
        location
        phone
      }
      visibleTo {
        userid
      }
    }
    isActive
    name
    ownerUserId {
      SocialHallTCAccepted
      _id
      ageGroup {
        max
        min
      }
      bio
      citizenship
      connection
      connections {
        userid
      }
      createdAt
      creditCheckResult
      email
      firstName
      freelancingExperience {
        max
        min
      }
      kycResult
      lastLoginAt
      lastName
      location
      metadata {
        additionalInfo
        changeOn
        changedBy
        moreInfo
        reason
        statusFrom
        statusTo
      }
      middleName
      phone
      profile {
        _id
        profilePicture
        profilePictureThumbnail
      }
      profileUrl
      referralCode
      roles {
        _id
        permissions
        roleType
      }
      skills {
        _id
        icon
        name
      }
      status
      title
      unreadConnectionCount
      updatedAt
      userOwnReferralCode
      userStatus
      username
      visibility {
        email
        location
        phone
      }
      visibleTo {
        userid
      }
    }
    startTime
  }
}
    `;
export type UpdateSocialHallMutationFn = Apollo.MutationFunction<UpdateSocialHallMutation, UpdateSocialHallMutationVariables>;

/**
 * __useUpdateSocialHallMutation__
 *
 * To run a mutation, you first call `useUpdateSocialHallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSocialHallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSocialHallMutation, { data, loading, error }] = useUpdateSocialHallMutation({
 *   variables: {
 *      hallId: // value for 'hallId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSocialHallMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSocialHallMutation, UpdateSocialHallMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSocialHallMutation, UpdateSocialHallMutationVariables>(UpdateSocialHallDocument, options);
      }
export type UpdateSocialHallMutationHookResult = ReturnType<typeof useUpdateSocialHallMutation>;
export type UpdateSocialHallMutationResult = Apollo.MutationResult<UpdateSocialHallMutation>;
export type UpdateSocialHallMutationOptions = Apollo.BaseMutationOptions<UpdateSocialHallMutation, UpdateSocialHallMutationVariables>;