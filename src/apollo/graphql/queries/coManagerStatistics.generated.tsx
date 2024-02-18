/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CoManagerStatisticsQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
  userId: Types.Scalars['ID'];
  filter?: Types.InputMaybe<Types.NoumActivityStatsFilter>;
}>;


export type CoManagerStatisticsQuery = { __typename?: 'Query', getNoumActivityStats?: { __typename?: 'NoumActivityStats', postsPosted: number, messagesSent: number, membersInvited: number, transactions: number, eventsHosted: number } | null };


export const CoManagerStatisticsDocument = gql`
    query coManagerStatistics($noumId: ID!, $userId: ID!, $filter: NoumActivityStatsFilter) {
  getNoumActivityStats(noumId: $noumId, userId: $userId, filter: $filter) {
    postsPosted
    messagesSent
    membersInvited
    transactions
    eventsHosted
  }
}
    `;

/**
 * __useCoManagerStatisticsQuery__
 *
 * To run a query within a React component, call `useCoManagerStatisticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCoManagerStatisticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCoManagerStatisticsQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *      userId: // value for 'userId'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCoManagerStatisticsQuery(baseOptions: Apollo.QueryHookOptions<CoManagerStatisticsQuery, CoManagerStatisticsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CoManagerStatisticsQuery, CoManagerStatisticsQueryVariables>(CoManagerStatisticsDocument, options);
      }
export function useCoManagerStatisticsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CoManagerStatisticsQuery, CoManagerStatisticsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CoManagerStatisticsQuery, CoManagerStatisticsQueryVariables>(CoManagerStatisticsDocument, options);
        }
export type CoManagerStatisticsQueryHookResult = ReturnType<typeof useCoManagerStatisticsQuery>;
export type CoManagerStatisticsLazyQueryHookResult = ReturnType<typeof useCoManagerStatisticsLazyQuery>;
export type CoManagerStatisticsQueryResult = Apollo.QueryResult<CoManagerStatisticsQuery, CoManagerStatisticsQueryVariables>;