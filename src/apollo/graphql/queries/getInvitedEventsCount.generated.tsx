/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetInvitedEventsCountQueryVariables = Types.Exact<{
  chamberId: Types.Scalars['ID'];
}>;


export type GetInvitedEventsCountQuery = { __typename?: 'Query', getEvents?: { __typename?: 'PaginatedEventsData', count?: number | null } | null };


export const GetInvitedEventsCountDocument = gql`
    query GetInvitedEventsCount($chamberId: ID!) {
  getEvents(chamberId: $chamberId, filter: {eventFilter: INVITATION}) {
    count
  }
}
    `;

/**
 * __useGetInvitedEventsCountQuery__
 *
 * To run a query within a React component, call `useGetInvitedEventsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvitedEventsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvitedEventsCountQuery({
 *   variables: {
 *      chamberId: // value for 'chamberId'
 *   },
 * });
 */
export function useGetInvitedEventsCountQuery(baseOptions: Apollo.QueryHookOptions<GetInvitedEventsCountQuery, GetInvitedEventsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvitedEventsCountQuery, GetInvitedEventsCountQueryVariables>(GetInvitedEventsCountDocument, options);
      }
export function useGetInvitedEventsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvitedEventsCountQuery, GetInvitedEventsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvitedEventsCountQuery, GetInvitedEventsCountQueryVariables>(GetInvitedEventsCountDocument, options);
        }
export type GetInvitedEventsCountQueryHookResult = ReturnType<typeof useGetInvitedEventsCountQuery>;
export type GetInvitedEventsCountLazyQueryHookResult = ReturnType<typeof useGetInvitedEventsCountLazyQuery>;
export type GetInvitedEventsCountQueryResult = Apollo.QueryResult<GetInvitedEventsCountQuery, GetInvitedEventsCountQueryVariables>;