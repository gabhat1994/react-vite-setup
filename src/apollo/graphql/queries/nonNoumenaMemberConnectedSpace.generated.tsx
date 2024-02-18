/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type NonNoumenaMemberConnectedSpaceQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type NonNoumenaMemberConnectedSpaceQuery = { __typename?: 'Query', getSpaceById?: { __typename?: 'SpaceOutput', isConnected?: boolean | null } | null };


export const NonNoumenaMemberConnectedSpaceDocument = gql`
    query nonNoumenaMemberConnectedSpace($id: ID!) {
  getSpaceById(id: $id) {
    isConnected
  }
}
    `;

/**
 * __useNonNoumenaMemberConnectedSpaceQuery__
 *
 * To run a query within a React component, call `useNonNoumenaMemberConnectedSpaceQuery` and pass it any options that fit your needs.
 * When your component renders, `useNonNoumenaMemberConnectedSpaceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNonNoumenaMemberConnectedSpaceQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useNonNoumenaMemberConnectedSpaceQuery(baseOptions: Apollo.QueryHookOptions<NonNoumenaMemberConnectedSpaceQuery, NonNoumenaMemberConnectedSpaceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NonNoumenaMemberConnectedSpaceQuery, NonNoumenaMemberConnectedSpaceQueryVariables>(NonNoumenaMemberConnectedSpaceDocument, options);
      }
export function useNonNoumenaMemberConnectedSpaceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NonNoumenaMemberConnectedSpaceQuery, NonNoumenaMemberConnectedSpaceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NonNoumenaMemberConnectedSpaceQuery, NonNoumenaMemberConnectedSpaceQueryVariables>(NonNoumenaMemberConnectedSpaceDocument, options);
        }
export type NonNoumenaMemberConnectedSpaceQueryHookResult = ReturnType<typeof useNonNoumenaMemberConnectedSpaceQuery>;
export type NonNoumenaMemberConnectedSpaceLazyQueryHookResult = ReturnType<typeof useNonNoumenaMemberConnectedSpaceLazyQuery>;
export type NonNoumenaMemberConnectedSpaceQueryResult = Apollo.QueryResult<NonNoumenaMemberConnectedSpaceQuery, NonNoumenaMemberConnectedSpaceQueryVariables>;