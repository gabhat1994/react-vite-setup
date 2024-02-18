/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { UserRoleOutputFragmentDoc } from './userRoleOutput.generated';
import { MaxMinValueFragmentDoc } from './maxMinValue.generated';
import { LogsOutputFragmentDoc } from './logsOutput.generated';
import { SocialLinkFragmentDoc } from './socialLink.generated';
import { SkillFragmentDoc } from './skill.generated';
export type UserFragment = { __typename?: 'User', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, username?: string | null, email?: string | null, userStatus?: string | null, phone?: string | null, dob?: string | null, referralCode?: string | null, createdAt?: any | null, isAcceptedSkipMediaTesting?: boolean | null, location?: string | null, title?: string | null, bio?: string | null, userSocialHall?: { __typename?: 'UserSocialHall', _id?: string | null, name?: string | null, type?: Types.SocialHallType | null, isActive: boolean } | null, roles?: Array<{ __typename?: 'UserRoleOutput', _id: string, roleType?: string | null, permissions?: Array<string | null> | null } | null> | null, credentials?: Array<{ __typename?: 'UserCredentialsOutput', providerType?: Types.ProviderVariant | null } | null> | null, profile?: { __typename?: 'Profile', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, freelancingExperience?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, metadata?: Array<{ __typename?: 'LogsOutput', additionalInfo?: string | null, reason?: string | null, moreInfo?: string | null, statusTo?: string | null, statusFrom?: string | null, changeOn?: any | null, changedBy?: string | null, changedByDetails?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, ageGroup?: { __typename?: 'MaxMinValue', max?: number | null, min?: number | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null, skills?: Array<{ __typename?: 'Skill', _id: string, name: string, icon: string } | null> | null };

export type UserProfileFragment = { __typename?: 'Profile', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null };

export type UserSocialHallFragment = { __typename?: 'UserSocialHall', _id?: string | null, name?: string | null, type?: Types.SocialHallType | null, isActive: boolean };

export type UserAddressFragment = { __typename?: 'AddressOutput', street?: string | null, apartment?: string | null, city?: string | null, zipcode?: string | null, state?: string | null };

export const UserSocialHallFragmentDoc = gql`
    fragment UserSocialHall on UserSocialHall {
  _id
  name
  type
  isActive
}
    `;
export const UserProfileFragmentDoc = gql`
    fragment UserProfile on Profile {
  _id
  profilePicture
  profilePictureThumbnail
  socialLinks {
    ...SocialLink
  }
}
    ${SocialLinkFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  _id
  firstName
  middleName
  lastName
  username
  email
  userStatus
  phone
  dob
  referralCode
  createdAt
  isAcceptedSkipMediaTesting
  location
  title
  bio
  userSocialHall {
    ...UserSocialHall
  }
  roles {
    ...UserRoleOutput
  }
  credentials {
    providerType
  }
  profile {
    ...UserProfile
  }
  freelancingExperience {
    ...MaxMinValue
  }
  metadata {
    ...LogsOutput
  }
  ageGroup {
    ...MaxMinValue
  }
  chamber {
    _id
    userId
  }
  skills {
    ...Skill
  }
}
    ${UserSocialHallFragmentDoc}
${UserRoleOutputFragmentDoc}
${UserProfileFragmentDoc}
${MaxMinValueFragmentDoc}
${LogsOutputFragmentDoc}
${SkillFragmentDoc}`;
export const UserAddressFragmentDoc = gql`
    fragment UserAddress on AddressOutput {
  street
  apartment
  city
  zipcode
  state
}
    `;