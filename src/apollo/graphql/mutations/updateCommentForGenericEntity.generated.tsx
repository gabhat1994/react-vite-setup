/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type UpdateCommentForGenericEntityMutationVariables = Types.Exact<{
  _id: Types.Scalars['String'];
  content?: Types.InputMaybe<Types.Scalars['String']>;
  entityType?: Types.InputMaybe<Types.Scalars['String']>;
  tags?: Types.InputMaybe<Array<Types.InputMaybe<Types.TagsInput>> | Types.InputMaybe<Types.TagsInput>>;
}>;


export type UpdateCommentForGenericEntityMutation = { __typename?: 'Mutation', updateCommentForGenericEntity?: { __typename?: 'CommentOutput', _id: string, content?: string | null, createdAt?: any | null, updatedAt?: any | null, replies?: { __typename?: 'ReplyOutput', total?: number | null, firstReply?: { __typename?: 'ThreadOutput', _id?: string | null, content?: string | null, createdAt?: any | null, tags?: Array<{ __typename?: 'TagsOutput', groupId?: string | null, uid?: { __typename?: 'UserOutput', SocialHallTCAccepted?: boolean | null, _id: string, bio?: string | null, citizenship?: string | null, connection?: Types.ConnectionType | null, createdAt?: any | null, creditCheckResult?: string | null, email?: string | null, firstName?: string | null, kycResult?: string | null, lastLoginAt?: any | null, lastName?: string | null, location?: string | null, middleName?: string | null, phone?: string | null, profileUrl?: string | null, referralCode?: string | null, status?: string | null, title?: string | null, unreadConnectionCount?: number | null, updatedAt?: any | null, userOwnReferralCode?: string | null, userStatus?: string | null, username?: string | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, connections?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, changeOn?: any | null, changedBy?: string | null, moreInfo?: string | null, reason?: string | null, statusFrom?: string | null, statusTo?: string | null } | null> | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, permissions?: Array<string | null> | null, roleType?: string | null } | null> | null, skills?: Array<{ __typename?: 'Skill', _id: string, icon: string, name: string } | null> | null, visibility?: { __typename?: 'UserOutputVisibility', email?: string | null, location?: string | null, phone?: string | null } | null, visibleTo?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null } | null } | null> | null, uid?: { __typename?: 'UserOutput', SocialHallTCAccepted?: boolean | null, _id: string, bio?: string | null, citizenship?: string | null, connection?: Types.ConnectionType | null, createdAt?: any | null, creditCheckResult?: string | null, email?: string | null, firstName?: string | null, kycResult?: string | null, lastLoginAt?: any | null, lastName?: string | null, location?: string | null, middleName?: string | null, phone?: string | null, profileUrl?: string | null, referralCode?: string | null, status?: string | null, title?: string | null, unreadConnectionCount?: number | null, updatedAt?: any | null, userOwnReferralCode?: string | null, userStatus?: string | null, username?: string | null } | null } | null, userIdList?: Array<{ __typename?: 'ThreadUser', _id?: { __typename?: 'UserOutput', SocialHallTCAccepted?: boolean | null, _id: string, bio?: string | null, citizenship?: string | null, connection?: Types.ConnectionType | null, createdAt?: any | null, creditCheckResult?: string | null, email?: string | null, firstName?: string | null, kycResult?: string | null, lastLoginAt?: any | null, lastName?: string | null, location?: string | null, middleName?: string | null, phone?: string | null, profileUrl?: string | null, referralCode?: string | null, status?: string | null, title?: string | null, unreadConnectionCount?: number | null, updatedAt?: any | null, userOwnReferralCode?: string | null, userStatus?: string | null, username?: string | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, connections?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, changeOn?: any | null, changedBy?: string | null, moreInfo?: string | null, reason?: string | null, statusFrom?: string | null, statusTo?: string | null } | null> | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, permissions?: Array<string | null> | null, roleType?: string | null } | null> | null, skills?: Array<{ __typename?: 'Skill', _id: string, icon: string, name: string } | null> | null, visibility?: { __typename?: 'UserOutputVisibility', email?: string | null, location?: string | null, phone?: string | null } | null, visibleTo?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null } | null } | null> | null } | null, uid?: { __typename?: 'UserOutput', SocialHallTCAccepted?: boolean | null, _id: string, bio?: string | null, citizenship?: string | null, connection?: Types.ConnectionType | null, createdAt?: any | null, creditCheckResult?: string | null, email?: string | null, firstName?: string | null, kycResult?: string | null, lastLoginAt?: any | null, lastName?: string | null, location?: string | null, middleName?: string | null, phone?: string | null, profileUrl?: string | null, referralCode?: string | null, status?: string | null, title?: string | null, unreadConnectionCount?: number | null, updatedAt?: any | null, userOwnReferralCode?: string | null, userStatus?: string | null, username?: string | null } | null } | null };


export const UpdateCommentForGenericEntityDocument = gql`
    mutation updateCommentForGenericEntity($_id: String!, $content: String, $entityType: String, $tags: [TagsInput]) {
  updateCommentForGenericEntity(
    _id: $_id
    content: $content
    entityType: $entityType
    tags: $tags
  ) {
    _id
    content
    createdAt
    replies {
      firstReply {
        _id
        content
        createdAt
        tags {
          groupId
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
        uid {
          SocialHallTCAccepted
          _id
          bio
          citizenship
          connection
          createdAt
          creditCheckResult
          email
          firstName
          kycResult
          lastLoginAt
          lastName
          location
          middleName
          phone
          profileUrl
          referralCode
          status
          title
          unreadConnectionCount
          updatedAt
          userOwnReferralCode
          userStatus
          username
        }
      }
      total
      userIdList {
        _id {
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
    uid {
      SocialHallTCAccepted
      _id
      bio
      citizenship
      connection
      createdAt
      creditCheckResult
      email
      firstName
      kycResult
      lastLoginAt
      lastName
      location
      middleName
      phone
      profileUrl
      referralCode
      status
      title
      unreadConnectionCount
      updatedAt
      userOwnReferralCode
      userStatus
      username
    }
    updatedAt
  }
}
    `;
export type UpdateCommentForGenericEntityMutationFn = Apollo.MutationFunction<UpdateCommentForGenericEntityMutation, UpdateCommentForGenericEntityMutationVariables>;

/**
 * __useUpdateCommentForGenericEntityMutation__
 *
 * To run a mutation, you first call `useUpdateCommentForGenericEntityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentForGenericEntityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentForGenericEntityMutation, { data, loading, error }] = useUpdateCommentForGenericEntityMutation({
 *   variables: {
 *      _id: // value for '_id'
 *      content: // value for 'content'
 *      entityType: // value for 'entityType'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useUpdateCommentForGenericEntityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentForGenericEntityMutation, UpdateCommentForGenericEntityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentForGenericEntityMutation, UpdateCommentForGenericEntityMutationVariables>(UpdateCommentForGenericEntityDocument, options);
      }
export type UpdateCommentForGenericEntityMutationHookResult = ReturnType<typeof useUpdateCommentForGenericEntityMutation>;
export type UpdateCommentForGenericEntityMutationResult = Apollo.MutationResult<UpdateCommentForGenericEntityMutation>;
export type UpdateCommentForGenericEntityMutationOptions = Apollo.BaseMutationOptions<UpdateCommentForGenericEntityMutation, UpdateCommentForGenericEntityMutationVariables>;