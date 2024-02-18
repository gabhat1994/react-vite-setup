/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumenaScoreByNoumIdQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type GetNoumenaScoreByNoumIdQuery = { __typename?: 'Query', capitalquotient?: { __typename?: 'CapitalquotientQueries', getNoumenaScoreByNoumId?: { __typename?: 'NoumenaScoreOutputByNoumId', noumId?: string | null, capitalQuotient?: string | null } | null } | null };


export const GetNoumenaScoreByNoumIdDocument = gql`
    query getNoumenaScoreByNoumId($noumId: ID!) {
  capitalquotient {
    getNoumenaScoreByNoumId(noumId: $noumId) {
      noumId
      capitalQuotient
    }
  }
}
    `;

/**
 * __useGetNoumenaScoreByNoumIdQuery__
 *
 * To run a query within a React component, call `useGetNoumenaScoreByNoumIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumenaScoreByNoumIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumenaScoreByNoumIdQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useGetNoumenaScoreByNoumIdQuery(baseOptions: Apollo.QueryHookOptions<GetNoumenaScoreByNoumIdQuery, GetNoumenaScoreByNoumIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumenaScoreByNoumIdQuery, GetNoumenaScoreByNoumIdQueryVariables>(GetNoumenaScoreByNoumIdDocument, options);
      }
export function useGetNoumenaScoreByNoumIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumenaScoreByNoumIdQuery, GetNoumenaScoreByNoumIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumenaScoreByNoumIdQuery, GetNoumenaScoreByNoumIdQueryVariables>(GetNoumenaScoreByNoumIdDocument, options);
        }
export type GetNoumenaScoreByNoumIdQueryHookResult = ReturnType<typeof useGetNoumenaScoreByNoumIdQuery>;
export type GetNoumenaScoreByNoumIdLazyQueryHookResult = ReturnType<typeof useGetNoumenaScoreByNoumIdLazyQuery>;
export type GetNoumenaScoreByNoumIdQueryResult = Apollo.QueryResult<GetNoumenaScoreByNoumIdQuery, GetNoumenaScoreByNoumIdQueryVariables>;