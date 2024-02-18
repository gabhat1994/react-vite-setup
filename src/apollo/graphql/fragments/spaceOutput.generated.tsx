/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ThemeOutputFragmentDoc } from './themeOutput.generated';
import { NoumMembershipStatusFragmentDoc } from './noumMembershipStatus.generated';
import { UserBasicOutputFragmentDoc } from './userBasicOutput.generated';
import { NoumLayoutFragmentDoc } from './noumLayout.generated';
import { ElementOutputFragmentDoc } from './elementOutput.generated';
import { NoumLinkFragmentDoc } from './noumLink.generated';
import { NetworkOutputFragmentDoc } from './networkOutput.generated';
import { TokenFragmentDoc, TokenTransactionFragmentDoc } from './token.generated';
import { ProjectChamberCategoryFragmentDoc } from './projectChamberCategory.generated';
import { ChamberByUserIdRefFragmentDoc } from './chamberByUserIdRef.generated';
export type SpaceBasicFragment = { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, description?: string | null, profileImage?: string | null, isFollowing?: boolean | null, followersCount?: number | null, fonts?: any | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null };

export type NoumTransactionOnSpaceOutputFragment = { __typename?: 'NoumTransactionFeeByChamberIdRef', subscription_id?: { __typename?: 'SubscriptionOutput', subscription_id: number } | null };

export type NoumUserConnectionStateFragment = { __typename?: 'SpaceOutput', isFollowing?: boolean | null, connectionRole?: string | null, connectionId?: string | null, isConnected?: boolean | null, connectionWithNoum?: { __typename?: 'SpaceConnection', _id?: string | null, status?: Types.ConnectionRequestTypeEnum | null, type?: Types.ConnectionTypeEnum | null, message?: string | null, approvedAt?: string | null, permission?: Types.ConnectionPermissionTypeEnum | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, draft?: { __typename?: 'SpaceConnectionDraft', permission?: Types.ConnectionPermissionTypeEnum | null } | null } | null, membershipStatus?: { __typename?: 'NoumMembershipStatus', _id: string, status: Types.NoumMemberStatus, connectedAt?: any | null, role: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null }, invitationSentFrom?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, rolePromotionToApprove?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null } | null, activeInvitation?: { __typename?: 'ActiveNoumInvitation', _id: string, invitedAt: any } | null };

export type NoumWithLayoutFragment = { __typename?: 'SpaceOutput', lastCustomPreviewSavedTime?: any | null, layout?: { __typename?: 'NoumLayout', _id: string, status: Types.NoumLayoutStatus, hasUndoAction: boolean, hasRedoAction: boolean, sections: Array<{ __typename?: 'NoumLayoutSection', _id: string, type: Types.NoumLayoutSectionType, position: number, columnsVerticalAlignType: Types.NoumLayoutSectionVerticalAlignType, background: boolean, visible: boolean, columns: Array<{ __typename?: 'NoumLayoutColumn', _id: string, background: boolean, position: number, tools: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null }> }> }>, uniqueToolStatuses: Array<{ __typename?: 'UniqueToolStatus', toolType: Types.ElementTypeEnum, isAlreadyUsed: boolean }> } | null, elements?: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null } | null> | null };

export type SpaceOutputFragment = { __typename?: 'SpaceOutput', name?: string | null, title?: string | null, description?: string | null, broadcastedAt?: any | null, tempStatus?: Types.ElementStatusEnum | null, isFavourited?: boolean | null, profileImage?: string | null, headerBackgroundUrl?: string | null, requestedAt?: any | null, createdAt?: any | null, enableAds?: boolean | null, adsMeta?: any | null, keywords?: Array<string | null> | null, approvedAt?: any | null, slug?: string | null, institution?: string | null, type?: string | null, status?: string | null, permission?: string | null, connectionsCount?: number | null, percentCompleted?: number | null, updatedAt?: any | null, publishedAt?: any | null, projectType?: string | null, followersCount?: number | null, archivedAt?: any | null, fonts?: any | null, _id?: string | null, isFollowing?: boolean | null, connectionRole?: string | null, connectionId?: string | null, isConnected?: boolean | null, lastCustomPreviewSavedTime?: any | null, connectionWithNoum?: { __typename?: 'SpaceConnection', _id?: string | null, status?: Types.ConnectionRequestTypeEnum | null, type?: Types.ConnectionTypeEnum | null, message?: string | null, approvedAt?: string | null, permission?: Types.ConnectionPermissionTypeEnum | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, draft?: { __typename?: 'SpaceConnectionDraft', permission?: Types.ConnectionPermissionTypeEnum | null } | null } | null, uid?: { __typename?: 'UserOutput', location?: string | null, bio?: string | null, _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, skills?: Array<{ __typename?: 'Skill', _id: string, name: string, icon: string } | null> | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, draft?: { __typename?: 'SpaceDraftData', projectType?: Types.ProjectChamberType | null, title?: string | null, description?: string | null, name?: string | null, profileImage?: string | null, fonts?: any | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null } | null, link?: { __typename?: 'NoumLink', _id: string, linkedNoumsCount: number, status: Types.NoumLinkStatus, followersCount: number, projectType: Types.ProjectChamberType, linkedAt: any, connectionsCount: number, linkedNoums: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, profileImage?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, connectionId?: string | null, projectType?: string | null, connectionsCount?: number | null, createdAt?: any | null, link?: { __typename?: 'NoumLink', _id: string, status: Types.NoumLinkStatus, linkedNoumsCount: number } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, members?: { __typename?: 'PaginatedNoumMembers', count: number } | null } | null> } | null, networks?: Array<{ __typename?: 'NetworkOutput', _id?: string | null, accessToken?: string | null, connectionType?: Types.ConnectionTypeEnum | null, expiryDate?: string | null, isActive?: boolean | null, userId?: string | null } | null> | null, token?: { __typename?: 'Token', _id: string, count: number } | null, tokenTransaction?: { __typename?: 'TokenTransaction', chamberId: string, data?: Array<{ __typename?: 'TokenTransactionType', count?: number | null, activityType?: string | null, message?: string | null, createdAt?: any | null, id?: string | null } | null> | null } | null, noumTransactionFee?: { __typename?: 'NoumTransactionFeeByChamberIdRef', subscription_id?: { __typename?: 'SubscriptionOutput', subscription_id: number } | null } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null, unSaved?: { __typename?: 'SpaceDraftData', title?: string | null, description?: string | null, projectType?: Types.ProjectChamberType | null, name?: string | null, profileImage?: string | null, fonts?: any | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string } | null } | null, membershipStatus?: { __typename?: 'NoumMembershipStatus', _id: string, status: Types.NoumMemberStatus, connectedAt?: any | null, role: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null }, invitationSentFrom?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, rolePromotionToApprove?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null } | null, activeInvitation?: { __typename?: 'ActiveNoumInvitation', _id: string, invitedAt: any } | null, layout?: { __typename?: 'NoumLayout', _id: string, status: Types.NoumLayoutStatus, hasUndoAction: boolean, hasRedoAction: boolean, sections: Array<{ __typename?: 'NoumLayoutSection', _id: string, type: Types.NoumLayoutSectionType, position: number, columnsVerticalAlignType: Types.NoumLayoutSectionVerticalAlignType, background: boolean, visible: boolean, columns: Array<{ __typename?: 'NoumLayoutColumn', _id: string, background: boolean, position: number, tools: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null }> }> }>, uniqueToolStatuses: Array<{ __typename?: 'UniqueToolStatus', toolType: Types.ElementTypeEnum, isAlreadyUsed: boolean }> } | null, elements?: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, position?: number | null, status?: string | null, bodyContentType?: Types.BodyContentEnum | null, bodyContent?: string | null, headerContent?: string | null, tempStatus?: Types.ElementStatusEnum | null, viewOnly?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null, isCustomPreviewAdditionalInfo?: boolean | null, draft?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null, unSaved?: { __typename?: 'ElementInnerOutput', bodyContent?: string | null, headerContent?: string | null, position?: number | null, isDeleted?: boolean | null, bodyContentJson?: any | null, percentCompleted?: number | null, customPreviewPosition?: number | null, isCustomPreviewVisible?: boolean | null, meta?: any | null } | null } | null> | null };

export type ActiveNoumInvitationFragment = { __typename?: 'ActiveNoumInvitation', _id: string, invitedAt: any };

export type SpaceForListFragment = { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, description?: string | null, profileImage?: string | null, status?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, isFollowing?: boolean | null, isConnected?: boolean | null, connectionsCount?: number | null, connectionId?: string | null, isFavourited?: boolean | null, broadcastedAt?: any | null, projectType?: string | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, elements?: Array<{ __typename?: 'ElementOutput', _id?: string | null, elementType?: string | null, status?: string | null, tempStatus?: Types.ElementStatusEnum | null } | null> | null, networks?: Array<{ __typename?: 'NetworkOutput', _id?: string | null } | null> | null, uid?: { __typename?: 'UserOutput', location?: string | null, _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null };

export type SpaceConnectionBasicFragment = { __typename?: 'SpaceConnection', _id?: string | null, status?: Types.ConnectionRequestTypeEnum | null, type?: Types.ConnectionTypeEnum | null, message?: string | null, approvedAt?: string | null, permission?: Types.ConnectionPermissionTypeEnum | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, draft?: { __typename?: 'SpaceConnectionDraft', permission?: Types.ConnectionPermissionTypeEnum | null } | null };

export type SpaceDraftDataFragment = { __typename?: 'SpaceDraftData', projectType?: Types.ProjectChamberType | null, title?: string | null, description?: string | null, name?: string | null, profileImage?: string | null, fonts?: any | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null };

export type NoumOwnerUserFragment = { __typename?: 'UserOutput', location?: string | null, bio?: string | null, _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, skills?: Array<{ __typename?: 'Skill', _id: string, name: string, icon: string } | null> | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null };

export type SpaceConnectionsForRequestFragment = { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, projectType?: string | null, permission?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null, type?: string | null, name?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null } | null };

export type SpaceConnectionForNotificationFragment = { __typename?: 'SpaceConnection', requestedAt?: string | null, _id?: string | null, status?: Types.ConnectionRequestTypeEnum | null, type?: Types.ConnectionTypeEnum | null, message?: string | null, approvedAt?: string | null, permission?: Types.ConnectionPermissionTypeEnum | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, projectType?: string | null, permission?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null, type?: string | null, name?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, projectType?: string | null, permission?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null, type?: string | null, name?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null } | null } | null, draft?: { __typename?: 'SpaceConnectionDraft', permission?: Types.ConnectionPermissionTypeEnum | null } | null };

export const SpaceBasicFragmentDoc = gql`
    fragment SpaceBasic on SpaceOutput {
  _id
  name
  description
  profileImage
  isFollowing
  followersCount
  category {
    _id
    name
  }
  theme {
    ...ThemeOutput
  }
  fonts
}
    ${ThemeOutputFragmentDoc}`;
export const SpaceConnectionBasicFragmentDoc = gql`
    fragment SpaceConnectionBasic on SpaceConnection {
  _id
  status
  requestTo {
    _id
    uid {
      ...UserBasicOutput
    }
  }
  requestFrom {
    _id
    uid {
      ...UserBasicOutput
    }
  }
  type
  message
  approvedAt
  permission
  draft {
    permission
  }
}
    ${UserBasicOutputFragmentDoc}`;
export const ActiveNoumInvitationFragmentDoc = gql`
    fragment ActiveNoumInvitation on ActiveNoumInvitation {
  _id
  invitedAt
}
    `;
export const NoumUserConnectionStateFragmentDoc = gql`
    fragment NoumUserConnectionState on SpaceOutput {
  isFollowing
  connectionRole
  connectionWithNoum(noumId: $userHomeNoumId) {
    ...SpaceConnectionBasic
  }
  connectionId
  isConnected
  membershipStatus {
    ...NoumMembershipStatus
  }
  activeInvitation {
    ...ActiveNoumInvitation
  }
}
    ${SpaceConnectionBasicFragmentDoc}
${NoumMembershipStatusFragmentDoc}
${ActiveNoumInvitationFragmentDoc}`;
export const NoumWithLayoutFragmentDoc = gql`
    fragment NoumWithLayout on SpaceOutput {
  layout(status: $status, editorV2Enabled: $editorV2Enabled) @include(if: $editorV2Enabled) {
    ...NoumLayout
  }
  elements @skip(if: $editorV2Enabled) {
    ...ElementOutput
  }
  lastCustomPreviewSavedTime
}
    ${NoumLayoutFragmentDoc}
${ElementOutputFragmentDoc}`;
export const NoumOwnerUserFragmentDoc = gql`
    fragment NoumOwnerUser on UserOutput {
  ...UserBasicOutput
  skills {
    _id
    name
    icon
  }
  location
  bio
}
    ${UserBasicOutputFragmentDoc}`;
export const SpaceDraftDataFragmentDoc = gql`
    fragment SpaceDraftData on SpaceDraftData {
  projectType
  title
  description
  name
  profileImage
  theme {
    ...ThemeOutput
  }
  fonts
}
    ${ThemeOutputFragmentDoc}`;
export const NoumTransactionOnSpaceOutputFragmentDoc = gql`
    fragment NoumTransactionOnSpaceOutput on NoumTransactionFeeByChamberIdRef {
  subscription_id {
    subscription_id
  }
}
    `;
export const SpaceOutputFragmentDoc = gql`
    fragment SpaceOutput on SpaceOutput {
  ...SpaceBasic
  ...NoumUserConnectionState
  ...NoumWithLayout
  connectionWithNoum(noumId: $userHomeNoumId) {
    ...SpaceConnectionBasic
  }
  uid {
    ...NoumOwnerUser
  }
  name
  title
  description
  broadcastedAt
  tempStatus
  isFavourited
  profileImage
  headerBackgroundUrl
  requestedAt
  createdAt
  enableAds
  adsMeta
  keywords
  approvedAt
  slug
  institution
  type
  status
  permission
  draft {
    ...SpaceDraftData
  }
  connectionsCount
  link {
    ...NoumLink
  }
  networks {
    ...NetworkOutput
  }
  token {
    ...Token
  }
  tokenTransaction {
    ...TokenTransaction
  }
  noumTransactionFee {
    ...NoumTransactionOnSpaceOutput
  }
  percentCompleted
  updatedAt
  publishedAt
  category {
    ...ProjectChamberCategory
  }
  projectType
  followersCount
  theme {
    _id
    name
  }
  archivedAt
  unSaved {
    title
    description
    projectType
    name
    profileImage
    theme {
      _id
      name
    }
    fonts
  }
  fonts
}
    ${SpaceBasicFragmentDoc}
${NoumUserConnectionStateFragmentDoc}
${NoumWithLayoutFragmentDoc}
${SpaceConnectionBasicFragmentDoc}
${NoumOwnerUserFragmentDoc}
${SpaceDraftDataFragmentDoc}
${NoumLinkFragmentDoc}
${NetworkOutputFragmentDoc}
${TokenFragmentDoc}
${TokenTransactionFragmentDoc}
${NoumTransactionOnSpaceOutputFragmentDoc}
${ProjectChamberCategoryFragmentDoc}`;
export const SpaceForListFragmentDoc = gql`
    fragment SpaceForList on SpaceOutput {
  _id
  name
  title
  description
  profileImage
  status
  type
  permission
  followersCount
  isFollowing
  isConnected
  connectionsCount
  connectionId
  isFavourited
  broadcastedAt
  projectType
  category {
    _id
    name
  }
  elements {
    _id
    elementType
    status
    tempStatus
  }
  networks {
    _id
  }
  uid {
    ...UserBasicOutput
    location
  }
}
    ${UserBasicOutputFragmentDoc}`;
export const SpaceConnectionsForRequestFragmentDoc = gql`
    fragment SpaceConnectionsForRequest on SpaceOutput {
  _id
  name
  projectType
  permission
  uid {
    ...UserBasicOutput
    chamber {
      ...ChamberByUserIdRef
    }
  }
}
    ${UserBasicOutputFragmentDoc}
${ChamberByUserIdRefFragmentDoc}`;
export const SpaceConnectionForNotificationFragmentDoc = gql`
    fragment SpaceConnectionForNotification on SpaceConnection {
  ...SpaceConnectionBasic
  requestedAt
  requestTo {
    ...SpaceConnectionsForRequest
  }
  requestFrom {
    ...SpaceConnectionsForRequest
  }
}
    ${SpaceConnectionBasicFragmentDoc}
${SpaceConnectionsForRequestFragmentDoc}`;