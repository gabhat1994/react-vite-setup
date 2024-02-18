/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { UserBasicOutputFragmentDoc } from './userBasicOutput.generated';
export type NoumMemberBasicFragment = { __typename?: 'NoumMember', _id: string, noumId: string, status: Types.NoumMemberStatus, connectedAt?: any | null, updatedAt?: any | null, requestedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, noum?: { __typename?: 'SpaceOutput', _id?: string | null, type?: string | null } | null, role: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null }, previousRole?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, rolePromotionToApprove?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null };

export type NoumMemberRoleBasicFragment = { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null };

export type NoumMemberRoleForPromotionFragment = { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null };

export type NoumMemberWithInvitationFragment = { __typename?: 'NoumMember', _id: string, noumId: string, status: Types.NoumMemberStatus, connectedAt?: any | null, updatedAt?: any | null, requestedAt?: any | null, activeRequest?: { __typename?: 'NoumConnectionRequest', _id: string, requestedAt: any, user?: { __typename?: 'UserOutput', _id: string } | null } | null, activeInvitation?: { __typename?: 'ActiveNoumInvitation', _id: string, invitedAt: any } | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, noum?: { __typename?: 'SpaceOutput', _id?: string | null, type?: string | null } | null, role: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null }, previousRole?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, rolePromotionToApprove?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null };

export type NoumRoleForDropdownFragment = { __typename?: 'NoumRole', _id: string, name: string };

export type NoumRoleForInfoFragment = { __typename?: 'NoumRole', _id: string, name: string, description: string, groupedPermissions: Array<{ __typename?: 'NoumRolePermissionGroup', level: Types.NoumRolePermissionLevel, elementType?: Types.PermissibleElementType | null, permissionIDs: Array<string>, permissions: Array<{ __typename?: 'NoumRolePermissionItem', id: string, isActive: boolean }> }> };

export type NoumRolePermissionGroupForInfoFragment = { __typename?: 'NoumRolePermissionGroup', level: Types.NoumRolePermissionLevel, elementType?: Types.PermissibleElementType | null, permissionIDs: Array<string>, permissions: Array<{ __typename?: 'NoumRolePermissionItem', id: string, isActive: boolean }> };

export type NoumMemberForUserMembersFragment = { __typename?: 'NoumMember', _id: string, requestedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, noum?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImage?: string | null, type?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null };

export const NoumMemberRoleBasicFragmentDoc = gql`
    fragment NoumMemberRoleBasic on NoumMemberRole {
  _id
  name
  isManager
  rolePromotedBy {
    ...UserBasicOutput
  }
}
    ${UserBasicOutputFragmentDoc}`;
export const NoumMemberRoleForPromotionFragmentDoc = gql`
    fragment NoumMemberRoleForPromotion on NoumMemberRole {
  ...NoumMemberRoleBasic
  rolePromotedBy {
    ...UserBasicOutput
  }
}
    ${NoumMemberRoleBasicFragmentDoc}
${UserBasicOutputFragmentDoc}`;
export const NoumMemberBasicFragmentDoc = gql`
    fragment NoumMemberBasic on NoumMember {
  _id
  noumId
  user {
    ...UserBasicOutput
  }
  noum {
    _id
    type
  }
  role {
    ...NoumMemberRoleBasic
  }
  previousRole {
    ...NoumMemberRoleBasic
  }
  status
  connectedAt
  updatedAt
  rolePromotionToApprove {
    ...NoumMemberRoleForPromotion
  }
  noumId
  requestedAt
}
    ${UserBasicOutputFragmentDoc}
${NoumMemberRoleBasicFragmentDoc}
${NoumMemberRoleForPromotionFragmentDoc}`;
export const NoumMemberWithInvitationFragmentDoc = gql`
    fragment NoumMemberWithInvitation on NoumMember {
  ...NoumMemberBasic
  activeRequest(noumId: $noumId) {
    _id
    requestedAt
    user {
      _id
    }
  }
  activeInvitation(noumId: $noumId) {
    _id
    invitedAt
  }
}
    ${NoumMemberBasicFragmentDoc}`;
export const NoumRoleForDropdownFragmentDoc = gql`
    fragment NoumRoleForDropdown on NoumRole {
  _id
  name
}
    `;
export const NoumRolePermissionGroupForInfoFragmentDoc = gql`
    fragment NoumRolePermissionGroupForInfo on NoumRolePermissionGroup {
  level
  elementType
  permissionIDs
  permissions {
    id
    isActive
  }
}
    `;
export const NoumRoleForInfoFragmentDoc = gql`
    fragment NoumRoleForInfo on NoumRole {
  _id
  name
  description
  groupedPermissions {
    ...NoumRolePermissionGroupForInfo
  }
}
    ${NoumRolePermissionGroupForInfoFragmentDoc}`;
export const NoumMemberForUserMembersFragmentDoc = gql`
    fragment NoumMemberForUserMembers on NoumMember {
  _id
  user {
    ...UserBasicOutput
  }
  noum {
    _id
    name
    profileImage
    type
    uid {
      ...UserBasicOutput
    }
  }
  requestedAt
}
    ${UserBasicOutputFragmentDoc}`;