/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NotificationsUnreadCountQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type NotificationsUnreadCountQuery = { __typename?: 'Query', notificationsUnreadCount?: { __typename?: 'UnreadNotificationCount', total?: number | null, Noums?: number | null, Community?: number | null, Money?: number | null, Other?: number | null } | null };


export const NotificationsUnreadCountDocument = gql`
    query notificationsUnreadCount {
  notificationsUnreadCount {
    total
    Noums
    Community
    Money
    Other
  }
}
    `;

/**
 * __useNotificationsUnreadCountQuery__
 *
 * To run a query within a React component, call `useNotificationsUnreadCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useNotificationsUnreadCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationsUnreadCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useNotificationsUnreadCountQuery(baseOptions?: Apollo.QueryHookOptions<NotificationsUnreadCountQuery, NotificationsUnreadCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NotificationsUnreadCountQuery, NotificationsUnreadCountQueryVariables>(NotificationsUnreadCountDocument, options);
      }
export function useNotificationsUnreadCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NotificationsUnreadCountQuery, NotificationsUnreadCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NotificationsUnreadCountQuery, NotificationsUnreadCountQueryVariables>(NotificationsUnreadCountDocument, options);
        }
export type NotificationsUnreadCountQueryHookResult = ReturnType<typeof useNotificationsUnreadCountQuery>;
export type NotificationsUnreadCountLazyQueryHookResult = ReturnType<typeof useNotificationsUnreadCountLazyQuery>;
export type NotificationsUnreadCountQueryResult = Apollo.QueryResult<NotificationsUnreadCountQuery, NotificationsUnreadCountQueryVariables>;