/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { UserBasicOutputFragmentDoc } from '../fragments/userBasicOutput.generated';
import { NoumMemberBasicFragmentDoc } from '../fragments/noumMember.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumActivityLogQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
  filter?: Types.InputMaybe<Types.NoumActivityLogFilter>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetNoumActivityLogQuery = { __typename?: 'Query', getNoumActivityLog?: { __typename?: 'AppActivitiesOutput', count?: number | null, data?: Array<{ __typename?: 'AppActivity', _id?: string | null, type?: Types.AppActivityTypes | null, createdAt?: any | null, sourceUser?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, targetUsers?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null> | null, sourceNoum?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null } | null, targetNoum?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null } | null, payload?: { __typename?: 'AppActivityPayload', post?: { __typename?: 'PostActivity', _id?: string | null } | null, noumMember?: { __typename?: 'NoumMember', _id: string, noumId: string, status: Types.NoumMemberStatus, connectedAt?: any | null, updatedAt?: any | null, requestedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, noum?: { __typename?: 'SpaceOutput', _id?: string | null, type?: string | null } | null, role: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null }, previousRole?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, rolePromotionToApprove?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null } | null, event?: { __typename?: 'EventActivity', eventId?: string | null, startDate?: any | null, endDate?: any | null, title?: string | null, description?: string | null } | null, payment?: { __typename?: 'PaymentActivity', amount?: number | null, currency?: string | null, source?: string | null, destination?: string | null, invoice?: { __typename?: 'InvoiceOutput', id: string, invoiceNumber?: string | null } | null } | null, conversation?: { __typename?: 'ConversationActivity', _id?: string | null } | null } | null } | null> | null } | null };

export type AppActivityFragment = { __typename?: 'AppActivity', _id?: string | null, type?: Types.AppActivityTypes | null, createdAt?: any | null, sourceUser?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, targetUsers?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null> | null, sourceNoum?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null } | null, targetNoum?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null } | null, payload?: { __typename?: 'AppActivityPayload', post?: { __typename?: 'PostActivity', _id?: string | null } | null, noumMember?: { __typename?: 'NoumMember', _id: string, noumId: string, status: Types.NoumMemberStatus, connectedAt?: any | null, updatedAt?: any | null, requestedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, noum?: { __typename?: 'SpaceOutput', _id?: string | null, type?: string | null } | null, role: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null }, previousRole?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, rolePromotionToApprove?: { __typename?: 'NoumMemberRole', _id: string, name: string, isManager: boolean, rolePromotedBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null } | null, event?: { __typename?: 'EventActivity', eventId?: string | null, startDate?: any | null, endDate?: any | null, title?: string | null, description?: string | null } | null, payment?: { __typename?: 'PaymentActivity', amount?: number | null, currency?: string | null, source?: string | null, destination?: string | null, invoice?: { __typename?: 'InvoiceOutput', id: string, invoiceNumber?: string | null } | null } | null, conversation?: { __typename?: 'ConversationActivity', _id?: string | null } | null } | null };

export const AppActivityFragmentDoc = gql`
    fragment AppActivity on AppActivity {
  _id
  type
  sourceUser {
    ...UserBasicOutput
  }
  targetUsers {
    ...UserBasicOutput
  }
  sourceNoum {
    _id
    name
  }
  targetNoum {
    _id
    name
  }
  payload {
    post {
      _id
    }
    noumMember {
      ...NoumMemberBasic
    }
    event {
      eventId
      startDate
      endDate
      title
      description
    }
    payment {
      amount
      currency
      source
      destination
      invoice {
        id
        invoiceNumber
      }
    }
    conversation {
      _id
    }
  }
  createdAt
}
    ${UserBasicOutputFragmentDoc}
${NoumMemberBasicFragmentDoc}`;
export const GetNoumActivityLogDocument = gql`
    query getNoumActivityLog($noumId: ID!, $filter: NoumActivityLogFilter, $limit: Int, $offset: Int) {
  getNoumActivityLog(
    noumId: $noumId
    filter: $filter
    limit: $limit
    offset: $offset
  ) {
    count
    data {
      ...AppActivity
    }
  }
}
    ${AppActivityFragmentDoc}`;

/**
 * __useGetNoumActivityLogQuery__
 *
 * To run a query within a React component, call `useGetNoumActivityLogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumActivityLogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumActivityLogQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetNoumActivityLogQuery(baseOptions: Apollo.QueryHookOptions<GetNoumActivityLogQuery, GetNoumActivityLogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumActivityLogQuery, GetNoumActivityLogQueryVariables>(GetNoumActivityLogDocument, options);
      }
export function useGetNoumActivityLogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumActivityLogQuery, GetNoumActivityLogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumActivityLogQuery, GetNoumActivityLogQueryVariables>(GetNoumActivityLogDocument, options);
        }
export type GetNoumActivityLogQueryHookResult = ReturnType<typeof useGetNoumActivityLogQuery>;
export type GetNoumActivityLogLazyQueryHookResult = ReturnType<typeof useGetNoumActivityLogLazyQuery>;
export type GetNoumActivityLogQueryResult = Apollo.QueryResult<GetNoumActivityLogQuery, GetNoumActivityLogQueryVariables>;