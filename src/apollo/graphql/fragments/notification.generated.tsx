/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { InvoiceOutputFragmentDoc } from './invoiceOutput.generated';
import { ContractBasicFragmentDoc } from './contract.generated';
import { SowBasicFragmentDoc } from './sow.generated';
import { NoumMemberBasicFragmentDoc } from './noumMember.generated';
import { EventCurrentUserFragmentDoc } from './event.generated';
export type NotificationFragment = { __typename?: 'Notification', _id: string, createdAt?: any | null, updatedAt?: any | null, type?: Types.NotificationType | null, unread?: boolean | null, inviteId?: string | null, inviteStatus?: Types.NotificationInviteStatus | null, postId?: string | null, commentId?: string | null, sourceUserNoum?: { __typename?: 'NoumType', name?: string | null, profileImage?: string | null } | null, adminUserId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null, data?: { __typename?: 'NotificationAdditionalData', message?: string | null, count?: number | null, topUpdatedElement?: string | null, invoiceStatus?: Types.NotificationInvoiceStatusEnum | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, name?: string | null, profileImage?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null } | null, invoiceId?: { __typename?: 'InvoiceOutput', id: string, invoiceNumber?: string | null, issueDate?: any | null, dueDate?: any | null, currency?: Types.AllCurrencyEnum | null, amount?: number | null, duplicatedFromInvoiceId?: string | null, duplicatedFromInvoiceNumber?: string | null, summary?: string | null, type?: string | null, notes?: string | null, paymentTerms?: Types.PaymentTerms | null, paymentDetails?: Types.PaymentDetails | null, lateFeeType?: Types.LateFeeType | null, lateFeeValue?: number | null, logoUrl?: string | null, status?: Types.InvoiceStatusEnum | null, invoiceURL?: string | null, noumId?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImage?: string | null, projectType?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null } | null, invoiceFrom?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, invoiceTo?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, lineItems?: Array<{ __typename?: 'InvoiceLineItem', id: string, description: string, quantity: number, unitPrice: number, taxRate?: number | null, taxLabel?: string | null, currency: Types.AllCurrencyEnum, amount: number } | null> | null, taxLine?: Array<{ __typename?: 'InvoiceTaxLine', id: string, description: string, taxCode: number, currency: Types.AllCurrencyEnum, amount: number } | null> | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null } | null, connection?: { __typename?: 'ConnectionByIdRef', _id: string, status?: Types.ConnectionRequestTypeEnum | null, message?: string | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null } | null } | null, paymentSub?: { __typename?: 'NotificationPaymentSubData', planName?: string | null, subscription_id?: number | null, noumName?: string | null, noumExpiryDays?: number | null } | null, contractId?: { __typename?: 'Contract', _id: string, contractNumber: number, title?: string | null, status: Types.ContractStatus, effectiveDate?: any | null, isCompleted: boolean, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string } | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null } | null, sowId?: { __typename?: 'SOW', _id: string, SOWNumber: number, status: Types.SowStatus, title?: string | null, effectiveDate?: any | null, isCompleted: boolean, createdBy?: { __typename?: 'UserOutput', _id: string } | null, linkedNoum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }, linkedContract?: { __typename?: 'Contract', status: Types.ContractStatus, contractNumber: number, isCompleted: boolean, _id: string, title?: string | null, effectiveDate?: any | null, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null } | null } | null, noumMember?: { __typename?: 'NoumMember', _id: string, noumId: string, status: Types.NoumMemberStatus, connectedAt?: any | null, updatedAt?: any | null, requestedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, noum?: { __typename?: 'SpaceOutput', _id?: string | null, type?: string | null } | null, role: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null }, previousRole?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, rolePromotionToApprove?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null } | null } | null, event?: { __typename?: 'EventNotificationDetails', time?: number | null, id?: { __typename?: 'Event', _id: string, status?: Types.EventsStatus | null, title: string, recurring?: boolean | null, totalAttendees?: number | null, eventDate?: any | null, duration?: number | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null, socialHall?: { __typename?: 'SocialHall', _id: string, chamberId?: string | null, eventId?: string | null, isActive: boolean } | null, invitations: Array<{ __typename?: 'Invitees', _id: string, status?: Types.InvitationStatus | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null }>, cohosts: Array<{ __typename?: 'Cohost', _id?: string | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null }>, currentUser?: { __typename?: 'CurrentUser', eventId: string, userId: string, userRole?: Types.UserRole | null, invitation?: { __typename?: 'Invitees', _id: string, status?: Types.InvitationStatus | null } | null } | null } | null, invitedBy?: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'Profile', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null } | null, group?: { __typename?: 'GroupRef', _id: string, name?: string | null } | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null, users?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null };

export type NotificationMetadataFragment = { __typename?: 'NotificationAdditionalData', message?: string | null, count?: number | null, topUpdatedElement?: string | null, invoiceStatus?: Types.NotificationInvoiceStatusEnum | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, name?: string | null, profileImage?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null } | null, invoiceId?: { __typename?: 'InvoiceOutput', id: string, invoiceNumber?: string | null, issueDate?: any | null, dueDate?: any | null, currency?: Types.AllCurrencyEnum | null, amount?: number | null, duplicatedFromInvoiceId?: string | null, duplicatedFromInvoiceNumber?: string | null, summary?: string | null, type?: string | null, notes?: string | null, paymentTerms?: Types.PaymentTerms | null, paymentDetails?: Types.PaymentDetails | null, lateFeeType?: Types.LateFeeType | null, lateFeeValue?: number | null, logoUrl?: string | null, status?: Types.InvoiceStatusEnum | null, invoiceURL?: string | null, noumId?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImage?: string | null, projectType?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null } | null, invoiceFrom?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, invoiceTo?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, lineItems?: Array<{ __typename?: 'InvoiceLineItem', id: string, description: string, quantity: number, unitPrice: number, taxRate?: number | null, taxLabel?: string | null, currency: Types.AllCurrencyEnum, amount: number } | null> | null, taxLine?: Array<{ __typename?: 'InvoiceTaxLine', id: string, description: string, taxCode: number, currency: Types.AllCurrencyEnum, amount: number } | null> | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null } | null, connection?: { __typename?: 'ConnectionByIdRef', _id: string, status?: Types.ConnectionRequestTypeEnum | null, message?: string | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null } | null } | null, paymentSub?: { __typename?: 'NotificationPaymentSubData', planName?: string | null, subscription_id?: number | null, noumName?: string | null, noumExpiryDays?: number | null } | null, contractId?: { __typename?: 'Contract', _id: string, contractNumber: number, title?: string | null, status: Types.ContractStatus, effectiveDate?: any | null, isCompleted: boolean, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string } | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null } | null, sowId?: { __typename?: 'SOW', _id: string, SOWNumber: number, status: Types.SowStatus, title?: string | null, effectiveDate?: any | null, isCompleted: boolean, createdBy?: { __typename?: 'UserOutput', _id: string } | null, linkedNoum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }, linkedContract?: { __typename?: 'Contract', status: Types.ContractStatus, contractNumber: number, isCompleted: boolean, _id: string, title?: string | null, effectiveDate?: any | null, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null } | null } | null, noumMember?: { __typename?: 'NoumMember', _id: string, noumId: string, status: Types.NoumMemberStatus, connectedAt?: any | null, updatedAt?: any | null, requestedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, noum?: { __typename?: 'SpaceOutput', _id?: string | null, type?: string | null } | null, role: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null }, previousRole?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, rolePromotionToApprove?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null } | null };

export type NotificationUserOutputFragment = { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null };

export type NotificationUserFragment = { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'Profile', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null };

export type NotificationGroupFragment = { __typename?: 'GroupRef', _id: string, name?: string | null };

export type NotificationEventFragment = { __typename?: 'EventNotificationDetails', time?: number | null, id?: { __typename?: 'Event', _id: string, status?: Types.EventsStatus | null, title: string, recurring?: boolean | null, totalAttendees?: number | null, eventDate?: any | null, duration?: number | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null, socialHall?: { __typename?: 'SocialHall', _id: string, chamberId?: string | null, eventId?: string | null, isActive: boolean } | null, invitations: Array<{ __typename?: 'Invitees', _id: string, status?: Types.InvitationStatus | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null }>, cohosts: Array<{ __typename?: 'Cohost', _id?: string | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null }>, currentUser?: { __typename?: 'CurrentUser', eventId: string, userId: string, userRole?: Types.UserRole | null, invitation?: { __typename?: 'Invitees', _id: string, status?: Types.InvitationStatus | null } | null } | null } | null, invitedBy?: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'Profile', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null };

export type NotificationSourceUserNoumFragment = { __typename?: 'NoumType', name?: string | null, profileImage?: string | null };

export const NotificationSourceUserNoumFragmentDoc = gql`
    fragment NotificationSourceUserNoum on NoumType {
  name
  profileImage
}
    `;
export const NotificationUserOutputFragmentDoc = gql`
    fragment NotificationUserOutput on UserOutput {
  _id
  firstName
  lastName
  userStatus
  profile {
    _id
    profilePicture
    profilePictureThumbnail
  }
  chamber {
    _id
    userId
  }
  userStatus
}
    `;
export const NotificationMetadataFragmentDoc = gql`
    fragment NotificationMetadata on NotificationAdditionalData {
  message
  count
  topUpdatedElement
  chamber {
    _id
    name
    profileImage
    uid {
      ...NotificationUserOutput
    }
  }
  invoiceId {
    ...InvoiceOutput
  }
  invoiceStatus
  connection {
    _id
    status
    requestTo {
      _id
      uid {
        ...NotificationUserOutput
      }
    }
    requestFrom {
      _id
      uid {
        ...NotificationUserOutput
      }
    }
    message
  }
  paymentSub {
    planName
    subscription_id
    noumName
    noumExpiryDays
  }
  contractId {
    ...ContractBasic
  }
  sowId {
    ...SOWBasic
  }
  noumMember {
    ...NoumMemberBasic
  }
}
    ${NotificationUserOutputFragmentDoc}
${InvoiceOutputFragmentDoc}
${ContractBasicFragmentDoc}
${SowBasicFragmentDoc}
${NoumMemberBasicFragmentDoc}`;
export const NotificationUserFragmentDoc = gql`
    fragment NotificationUser on User {
  _id
  firstName
  lastName
  userStatus
  profile {
    _id
    profilePicture
    profilePictureThumbnail
  }
  chamber {
    _id
    userId
  }
}
    `;
export const NotificationEventFragmentDoc = gql`
    fragment NotificationEvent on EventNotificationDetails {
  time
  id {
    _id
    status
    title
    recurring
    totalAttendees
    userId {
      ...NotificationUserOutput
    }
    socialHall {
      _id
      chamberId
      eventId
      isActive
    }
    invitations {
      _id
      status
      userId {
        ...NotificationUserOutput
      }
    }
    cohosts {
      _id
      userId {
        ...NotificationUserOutput
      }
    }
    eventDate
    duration
    currentUser {
      ...EventCurrentUser
    }
  }
  invitedBy {
    ...NotificationUser
  }
}
    ${NotificationUserOutputFragmentDoc}
${EventCurrentUserFragmentDoc}
${NotificationUserFragmentDoc}`;
export const NotificationGroupFragmentDoc = gql`
    fragment NotificationGroup on GroupRef {
  _id
  name
}
    `;
export const NotificationFragmentDoc = gql`
    fragment Notification on Notification {
  _id
  createdAt
  updatedAt
  type
  unread
  inviteId
  inviteStatus
  postId
  commentId
  sourceUserNoum {
    ...NotificationSourceUserNoum
  }
  adminUserId {
    ...NotificationUserOutput
  }
  data {
    ...NotificationMetadata
  }
  event {
    ...NotificationEvent
  }
  group {
    ...NotificationGroup
  }
  userId {
    ...NotificationUserOutput
  }
  users {
    ...NotificationUserOutput
  }
}
    ${NotificationSourceUserNoumFragmentDoc}
${NotificationUserOutputFragmentDoc}
${NotificationMetadataFragmentDoc}
${NotificationEventFragmentDoc}
${NotificationGroupFragmentDoc}`;