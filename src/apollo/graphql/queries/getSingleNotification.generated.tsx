/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSingleNotificationQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetSingleNotificationQuery = { __typename?: 'Query', notificationV2?: { __typename?: 'Notification', _id: string, unread?: boolean | null, type?: Types.NotificationType | null, data?: { __typename?: 'NotificationAdditionalData', chamberId?: string | null, message?: string | null } | null } | null };


export const GetSingleNotificationDocument = gql`
    query getSingleNotification($id: ID!) {
  notificationV2(_id: $id) {
    _id
    unread
    type
    data {
      chamberId
      message
    }
  }
}
    `;

/**
 * __useGetSingleNotificationQuery__
 *
 * To run a query within a React component, call `useGetSingleNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleNotificationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSingleNotificationQuery(baseOptions: Apollo.QueryHookOptions<GetSingleNotificationQuery, GetSingleNotificationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSingleNotificationQuery, GetSingleNotificationQueryVariables>(GetSingleNotificationDocument, options);
      }
export function useGetSingleNotificationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleNotificationQuery, GetSingleNotificationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSingleNotificationQuery, GetSingleNotificationQueryVariables>(GetSingleNotificationDocument, options);
        }
export type GetSingleNotificationQueryHookResult = ReturnType<typeof useGetSingleNotificationQuery>;
export type GetSingleNotificationLazyQueryHookResult = ReturnType<typeof useGetSingleNotificationLazyQuery>;
export type GetSingleNotificationQueryResult = Apollo.QueryResult<GetSingleNotificationQuery, GetSingleNotificationQueryVariables>;