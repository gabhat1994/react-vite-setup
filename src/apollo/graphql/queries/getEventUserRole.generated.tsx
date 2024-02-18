/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetEventUserRoleQueryVariables = Types.Exact<{
  eventId: Types.Scalars['ID'];
}>;


export type GetEventUserRoleQuery = { __typename?: 'Query', getEventUserRole?: { __typename?: 'CurrentUser', userRole?: Types.UserRole | null } | null };


export const GetEventUserRoleDocument = gql`
    query GetEventUserRole($eventId: ID!) {
  getEventUserRole(eventId: $eventId) {
    userRole
  }
}
    `;

/**
 * __useGetEventUserRoleQuery__
 *
 * To run a query within a React component, call `useGetEventUserRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventUserRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventUserRoleQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useGetEventUserRoleQuery(baseOptions: Apollo.QueryHookOptions<GetEventUserRoleQuery, GetEventUserRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEventUserRoleQuery, GetEventUserRoleQueryVariables>(GetEventUserRoleDocument, options);
      }
export function useGetEventUserRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEventUserRoleQuery, GetEventUserRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEventUserRoleQuery, GetEventUserRoleQueryVariables>(GetEventUserRoleDocument, options);
        }
export type GetEventUserRoleQueryHookResult = ReturnType<typeof useGetEventUserRoleQuery>;
export type GetEventUserRoleLazyQueryHookResult = ReturnType<typeof useGetEventUserRoleLazyQuery>;
export type GetEventUserRoleQueryResult = Apollo.QueryResult<GetEventUserRoleQuery, GetEventUserRoleQueryVariables>;