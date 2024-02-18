/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumConnectionsKpIsQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
  from?: Types.InputMaybe<Types.Scalars['ISODate']>;
  to?: Types.InputMaybe<Types.Scalars['ISODate']>;
  granularity?: Types.InputMaybe<Types.NoumKpiGranularity>;
}>;


export type GetNoumConnectionsKpIsQuery = { __typename?: 'Query', getNoumConnectionsKPIs?: { __typename?: 'NoumConnectionsKPI', kpi?: { __typename?: 'NoumSingleConnectionKPI', connected: number, disconnected: number, currentConnections: number } | null, series?: Array<{ __typename?: 'NoumConnectionKPIDatePoint', date?: any | null, values?: { __typename?: 'NoumSingleConnectionKPI', connected: number, disconnected: number, currentConnections: number } | null } | null> | null } | null };


export const GetNoumConnectionsKpIsDocument = gql`
    query getNoumConnectionsKPIs($noumId: ID!, $from: ISODate, $to: ISODate, $granularity: NoumKPIGranularity) {
  getNoumConnectionsKPIs(
    noumId: $noumId
    from: $from
    to: $to
    granularity: $granularity
  ) {
    kpi {
      connected
      disconnected
      currentConnections
    }
    series {
      date
      values {
        connected
        disconnected
        currentConnections
      }
    }
  }
}
    `;

/**
 * __useGetNoumConnectionsKpIsQuery__
 *
 * To run a query within a React component, call `useGetNoumConnectionsKpIsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumConnectionsKpIsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumConnectionsKpIsQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *      from: // value for 'from'
 *      to: // value for 'to'
 *      granularity: // value for 'granularity'
 *   },
 * });
 */
export function useGetNoumConnectionsKpIsQuery(baseOptions: Apollo.QueryHookOptions<GetNoumConnectionsKpIsQuery, GetNoumConnectionsKpIsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumConnectionsKpIsQuery, GetNoumConnectionsKpIsQueryVariables>(GetNoumConnectionsKpIsDocument, options);
      }
export function useGetNoumConnectionsKpIsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumConnectionsKpIsQuery, GetNoumConnectionsKpIsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumConnectionsKpIsQuery, GetNoumConnectionsKpIsQueryVariables>(GetNoumConnectionsKpIsDocument, options);
        }
export type GetNoumConnectionsKpIsQueryHookResult = ReturnType<typeof useGetNoumConnectionsKpIsQuery>;
export type GetNoumConnectionsKpIsLazyQueryHookResult = ReturnType<typeof useGetNoumConnectionsKpIsLazyQuery>;
export type GetNoumConnectionsKpIsQueryResult = Apollo.QueryResult<GetNoumConnectionsKpIsQuery, GetNoumConnectionsKpIsQueryVariables>;