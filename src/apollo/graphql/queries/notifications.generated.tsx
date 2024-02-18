/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NotificationFragmentDoc } from '../fragments/notification.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NotificationsQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  filter?: Types.InputMaybe<Types.NotificationFilter>;
}>;


export type NotificationsQuery = { __typename?: 'Query', notifications?: { __typename?: 'Notifications', count?: number | null, unreadCount?: number | null, data?: Array<{ __typename?: 'Notification', _id: string, createdAt?: any | null, updatedAt?: any | null, type?: Types.NotificationType | null, unread?: boolean | null, inviteId?: string | null, inviteStatus?: Types.NotificationInviteStatus | null, postId?: string | null, commentId?: string | null, sourceUserNoum?: { __typename?: 'NoumType', name?: string | null, profileImage?: string | null } | null, adminUserId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null, data?: { __typename?: 'NotificationAdditionalData', message?: string | null, count?: number | null, topUpdatedElement?: string | null, invoiceStatus?: Types.NotificationInvoiceStatusEnum | null, chamber?: { __typename?: 'ChamberByIdRef', _id: string, name?: string | null, profileImage?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null } | null, invoiceId?: { __typename?: 'InvoiceOutput', id: string, invoiceNumber?: string | null, issueDate?: any | null, dueDate?: any | null, currency?: Types.AllCurrencyEnum | null, amount?: number | null, duplicatedFromInvoiceId?: string | null, duplicatedFromInvoiceNumber?: string | null, summary?: string | null, type?: string | null, notes?: string | null, paymentTerms?: Types.PaymentTerms | null, paymentDetails?: Types.PaymentDetails | null, lateFeeType?: Types.LateFeeType | null, lateFeeValue?: number | null, logoUrl?: string | null, status?: Types.InvoiceStatusEnum | null, invoiceURL?: string | null, noumId?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImage?: string | null, projectType?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null } | null, invoiceFrom?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, invoiceTo?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, lineItems?: Array<{ __typename?: 'InvoiceLineItem', id: string, description: string, quantity: number, unitPrice: number, taxRate?: number | null, taxLabel?: string | null, currency: Types.AllCurrencyEnum, amount: number } | null> | null, taxLine?: Array<{ __typename?: 'InvoiceTaxLine', id: string, description: string, taxCode: number, currency: Types.AllCurrencyEnum, amount: number } | null> | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null } | null, connection?: { __typename?: 'ConnectionByIdRef', _id: string, status?: Types.ConnectionRequestTypeEnum | null, message?: string | null, requestTo?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null } | null, requestFrom?: { __typename?: 'SpaceOutput', _id?: string | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null } | null } | null, paymentSub?: { __typename?: 'NotificationPaymentSubData', planName?: string | null, subscription_id?: number | null, noumName?: string | null, noumExpiryDays?: number | null } | null, contractId?: { __typename?: 'Contract', _id: string, contractNumber: number, title?: string | null, status: Types.ContractStatus, effectiveDate?: any | null, isCompleted: boolean, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string } | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null } | null, sowId?: { __typename?: 'SOW', _id: string, SOWNumber: number, status: Types.SowStatus, title?: string | null, effectiveDate?: any | null, isCompleted: boolean, createdBy?: { __typename?: 'UserOutput', _id: string } | null, linkedNoum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }, linkedContract?: { __typename?: 'Contract', status: Types.ContractStatus, contractNumber: number, isCompleted: boolean, _id: string, title?: string | null, effectiveDate?: any | null, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null } | null } | null, noumMember?: { __typename?: 'NoumMember', _id: string, noumId: string, status: Types.NoumMemberStatus, connectedAt?: any | null, updatedAt?: any | null, requestedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, noum?: { __typename?: 'SpaceOutput', _id?: string | null, type?: string | null } | null, role: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null }, previousRole?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, rolePromotionToApprove?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null } | null } | null, event?: { __typename?: 'EventNotificationDetails', time?: number | null, id?: { __typename?: 'Event', _id: string, status?: Types.EventsStatus | null, title: string, recurring?: boolean | null, totalAttendees?: number | null, eventDate?: any | null, duration?: number | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null, socialHall?: { __typename?: 'SocialHall', _id: string, chamberId?: string | null, eventId?: string | null, isActive: boolean } | null, invitations: Array<{ __typename?: 'Invitees', _id: string, status?: Types.InvitationStatus | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null }>, cohosts: Array<{ __typename?: 'Cohost', _id?: string | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null }>, currentUser?: { __typename?: 'CurrentUser', eventId: string, userId: string, userRole?: Types.UserRole | null, invitation?: { __typename?: 'Invitees', _id: string, status?: Types.InvitationStatus | null } | null } | null } | null, invitedBy?: { __typename?: 'User', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'Profile', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null } | null, group?: { __typename?: 'GroupRef', _id: string, name?: string | null } | null, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null, users?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null> | null } | null> | null } | null };

export type UnreadNotificationsCountQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  filter?: Types.InputMaybe<Types.NotificationFilter>;
}>;


export type UnreadNotificationsCountQuery = { __typename?: 'Query', unreadNotifications?: { __typename?: 'Notifications', unreadCount?: number | null, unviewedCount?: number | null } | null };


export const NotificationsDocument = gql`
    query notifications($limit: Int, $offset: Int, $filter: NotificationFilter) {
  notifications(limit: $limit, offset: $offset, filter: $filter) {
    count
    unreadCount
    data {
      ...Notification
    }
  }
}
    ${NotificationFragmentDoc}`;

/**
 * __useNotificationsQuery__
 *
 * To run a query within a React component, call `useNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useNotificationsQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
      }
export function useNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsQuery, NotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsQuery, NotificationsQueryVariables>(NotificationsDocument, options);
        }
export type NotificationsQueryHookResult = ReturnType<typeof useNotificationsQuery>;
export type NotificationsLazyQueryHookResult = ReturnType<typeof useNotificationsLazyQuery>;
export type NotificationsQueryResult = Apollo.QueryResult<NotificationsQuery, NotificationsQueryVariables>;
export const UnreadNotificationsCountDocument = gql`
    query unreadNotificationsCount($limit: Int, $offset: Int, $filter: NotificationFilter) {
  unreadNotifications: notifications(
    limit: $limit
    offset: $offset
    filter: $filter
  ) {
    unreadCount
    unviewedCount
  }
}
    `;

/**
 * __useUnreadNotificationsCountQuery__
 *
 * To run a query within a React component, call `useUnreadNotificationsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useUnreadNotificationsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUnreadNotificationsCountQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUnreadNotificationsCountQuery(baseOptions?: Apollo.QueryHookOptions<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>(UnreadNotificationsCountDocument, options);
      }
export function useUnreadNotificationsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>(UnreadNotificationsCountDocument, options);
        }
export type UnreadNotificationsCountQueryHookResult = ReturnType<typeof useUnreadNotificationsCountQuery>;
export type UnreadNotificationsCountLazyQueryHookResult = ReturnType<typeof useUnreadNotificationsCountLazyQuery>;
export type UnreadNotificationsCountQueryResult = Apollo.QueryResult<UnreadNotificationsCountQuery, UnreadNotificationsCountQueryVariables>;