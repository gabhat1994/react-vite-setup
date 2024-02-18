/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateElementPositionMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Array<Types.InputMaybe<Types.ElementPositionInput>> | Types.InputMaybe<Types.ElementPositionInput>>;
  spaceId: Types.Scalars['ID'];
}>;


export type UpdateElementPositionMutation = { __typename?: 'Mutation', updateElementPosition?: { __typename?: 'SpaceOutput', _id?: string | null, description?: string | null, publishedAt?: any | null, updatedAt?: any | null, institution?: string | null, name?: string | null, permission?: string | null, profileImage?: string | null, status?: string | null, title?: string | null, type?: string | null, elements?: Array<{ __typename?: 'ElementOutput', _id?: string | null, bodyContent?: string | null, bodyContentJson?: any | null, bodyContentType?: Types.BodyContentEnum | null, elementType?: string | null, headerContent?: string | null, position?: number | null, status?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, bodyContentJson?: any | null, headerContent?: string | null, isDeleted?: boolean | null, position?: number | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, bodyContentJson?: any | null, headerContent?: string | null, isDeleted?: boolean | null, position?: number | null } | null } | null> | null, networks?: Array<{ __typename?: 'NetworkOutput', _id?: string | null, accessToken?: string | null, connectionType?: Types.ConnectionTypeEnum | null, expiryDate?: string | null, isActive?: boolean | null, userId?: string | null } | null> | null, token?: { __typename?: 'Token', _id: string, count: number, walletId?: string | null } | null, uid?: { __typename?: 'UserOutput', SocialHallTCAccepted?: boolean | null, _id: string, bio?: string | null, citizenship?: string | null, connection?: Types.ConnectionType | null, createdAt?: any | null, creditCheckResult?: string | null, email?: string | null, firstName?: string | null, kycResult?: string | null, lastLoginAt?: any | null, lastName?: string | null, location?: string | null, middleName?: string | null, phone?: string | null, profileUrl?: string | null, referralCode?: string | null, status?: string | null, title?: string | null, unreadConnectionCount?: number | null, updatedAt?: any | null, userOwnReferralCode?: string | null, userStatus?: string | null, username?: string | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, connections?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, changeOn?: any | null, changedBy?: string | null, moreInfo?: string | null, reason?: string | null, statusFrom?: string | null, statusTo?: string | null } | null> | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, permissions?: Array<string | null> | null, roleType?: string | null } | null> | null, skills?: Array<{ __typename?: 'Skill', _id: string, icon: string, name: string } | null> | null, visibility?: { __typename?: 'UserOutputVisibility', email?: string | null, location?: string | null, phone?: string | null } | null, visibleTo?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null } | null } | null };


export const UpdateElementPositionDocument = gql`
    mutation updateElementPosition($input: [ElementPositionInput], $spaceId: ID!) {
  updateElementPosition(input: $input, spaceId: $spaceId) {
    _id
    description
    publishedAt
    updatedAt
    elements {
      _id
      bodyContent
      bodyContentJson
      bodyContentType
      draft {
        bodyContent
        bodyContentJson
        headerContent
        isDeleted
        position
      }
      elementType
      headerContent
      position
      status
      tempStatus
      unSaved {
        bodyContent
        bodyContentJson
        headerContent
        isDeleted
        position
      }
      viewOnly
    }
    institution
    name
    networks {
      _id
      accessToken
      connectionType
      expiryDate
      isActive
      userId
    }
    permission
    profileImage
    status
    title
    token {
      _id
      count
      walletId
    }
    type
    uid {
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
  }
}
    `;
export type UpdateElementPositionMutationFn = Apollo.MutationFunction<UpdateElementPositionMutation, UpdateElementPositionMutationVariables>;

/**
 * __useUpdateElementPositionMutation__
 *
 * To run a mutation, you first call `useUpdateElementPositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateElementPositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateElementPositionMutation, { data, loading, error }] = useUpdateElementPositionMutation({
 *   variables: {
 *      input: // value for 'input'
 *      spaceId: // value for 'spaceId'
 *   },
 * });
 */
export function useUpdateElementPositionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateElementPositionMutation, UpdateElementPositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateElementPositionMutation, UpdateElementPositionMutationVariables>(UpdateElementPositionDocument, options);
      }
export type UpdateElementPositionMutationHookResult = ReturnType<typeof useUpdateElementPositionMutation>;
export type UpdateElementPositionMutationResult = Apollo.MutationResult<UpdateElementPositionMutation>;
export type UpdateElementPositionMutationOptions = Apollo.BaseMutationOptions<UpdateElementPositionMutation, UpdateElementPositionMutationVariables>;