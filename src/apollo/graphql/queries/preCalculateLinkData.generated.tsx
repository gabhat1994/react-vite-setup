/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type PreCalculateNoumLinkDataQueryVariables = Types.Exact<{
  linkedNoumIDs: Array<Types.Scalars['ID']> | Types.Scalars['ID'];
}>;


export type PreCalculateNoumLinkDataQuery = { __typename?: 'Query', preCalculateNoumLinkData?: { __typename?: 'PreCalculateNoumLinkData', connectionsCount: number, followersCount: number, membersCount: number } | null };


export const PreCalculateNoumLinkDataDocument = gql`
    query preCalculateNoumLinkData($linkedNoumIDs: [ID!]!) {
  preCalculateNoumLinkData(linkedNoumIDs: $linkedNoumIDs) {
    connectionsCount
    followersCount
    membersCount
  }
}
    `;

/**
 * __usePreCalculateNoumLinkDataQuery__
 *
 * To run a query within a React component, call `usePreCalculateNoumLinkDataQuery` and pass it any options that fit your needs.
 * When your component renders, `usePreCalculateNoumLinkDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePreCalculateNoumLinkDataQuery({
 *   variables: {
 *      linkedNoumIDs: // value for 'linkedNoumIDs'
 *   },
 * });
 */
export function usePreCalculateNoumLinkDataQuery(baseOptions: Apollo.QueryHookOptions<PreCalculateNoumLinkDataQuery, PreCalculateNoumLinkDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PreCalculateNoumLinkDataQuery, PreCalculateNoumLinkDataQueryVariables>(PreCalculateNoumLinkDataDocument, options);
      }
export function usePreCalculateNoumLinkDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreCalculateNoumLinkDataQuery, PreCalculateNoumLinkDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PreCalculateNoumLinkDataQuery, PreCalculateNoumLinkDataQueryVariables>(PreCalculateNoumLinkDataDocument, options);
        }
export type PreCalculateNoumLinkDataQueryHookResult = ReturnType<typeof usePreCalculateNoumLinkDataQuery>;
export type PreCalculateNoumLinkDataLazyQueryHookResult = ReturnType<typeof usePreCalculateNoumLinkDataLazyQuery>;
export type PreCalculateNoumLinkDataQueryResult = Apollo.QueryResult<PreCalculateNoumLinkDataQuery, PreCalculateNoumLinkDataQueryVariables>;