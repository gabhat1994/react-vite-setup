/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ProfileOutputFragmentDoc } from './profileOutput.generated';
import { MaxMinValueFragmentDoc } from './maxMinValue.generated';
import { UserOutputVisibilityFragmentDoc } from './userOutputVisibility.generated';
import { UserOutputVisibilityToFragmentDoc } from './userOutputVisibilityTo.generated';
import { UserRoleOutputFragmentDoc } from './userRoleOutput.generated';
import { LogsOutputFragmentDoc } from './logsOutput.generated';
import { ChamberByUserIdRefFragmentDoc } from './chamberByUserIdRef.generated';
import { SkillFragmentDoc } from './skill.generated';
export type UserOutputFragment = { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, location?: string | null, bio?: string | null, connection?: Types.ConnectionType | null, userStatus?: string | null, userType?: Types.NoumenaUserType | null, createdAt?: any | null, updatedAt?: any | null, isAcceptedSkipMediaTesting?: boolean | null, citizenship?: string | null, SocialHallTCAccepted?: boolean | null, status?: string | null, unreadConnectionCount?: number | null, referralCode?: string | null, profileUrl?: string | null, userOwnReferralCode?: string | null, kycResult?: string | null, creditCheckResult?: string | null, lastLoginAt?: any | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, visibility?: { __typename?: 'UserOutputVisibility', email?: string | null, phone?: string | null, location?: string | null } | null, visibleTo?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, connections?: Array<{ __typename?: 'UserOutputVisibilityTo', userid?: string | null } | null> | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, roleType?: string | null, permissions?: Array<string | null> | null } | null> | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, reason?: string | null, moreInfo?: string | null, statusTo?: string | null, statusFrom?: string | null, changeOn?: any | null, changedBy?: string | null, changedByDetails?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null, type?: string | null, name?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, skills?: Array<{ __typename?: 'Skill', _id: string, name: string, icon: string } | null> | null };

export const UserOutputFragmentDoc = gql`
    fragment UserOutput on UserOutput {
  _id
  firstName
  lastName
  middleName
  username
  title
  phone
  email
  location
  bio
  profile {
    ...ProfileOutput
  }
  connection
  userStatus
  userType
  createdAt
  updatedAt
  ageGroup {
    ...MaxMinValue
  }
  freelancingExperience {
    ...MaxMinValue
  }
  isAcceptedSkipMediaTesting
  citizenship
  SocialHallTCAccepted
  status
  visibility {
    ...UserOutputVisibility
  }
  visibleTo {
    ...UserOutputVisibilityTo
  }
  connections {
    ...UserOutputVisibilityTo
  }
  unreadConnectionCount
  referralCode
  profileUrl
  userOwnReferralCode
  kycResult
  creditCheckResult
  roles {
    ...UserRoleOutput
  }
  metadata {
    ...LogsOutput
  }
  lastLoginAt
  chamber {
    ...ChamberByUserIdRef
  }
  skills {
    ...Skill
  }
}
    ${ProfileOutputFragmentDoc}
${MaxMinValueFragmentDoc}
${UserOutputVisibilityFragmentDoc}
${UserOutputVisibilityToFragmentDoc}
${UserRoleOutputFragmentDoc}
${LogsOutputFragmentDoc}
${ChamberByUserIdRefFragmentDoc}
${SkillFragmentDoc}`;