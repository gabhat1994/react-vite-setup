/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListBlockedCountriesQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListBlockedCountriesQuery = { __typename?: 'Query', listBlockedCountries?: { __typename?: 'BlockedCountryOutput', count?: number | null, data?: Array<{ __typename?: 'BlockedCountry', name?: string | null, code?: string | null } | null> | null } | null };


export const ListBlockedCountriesDocument = gql`
    query listBlockedCountries($limit: Int, $offset: Int) {
  listBlockedCountries(limit: $limit, offset: $offset) {
    count
    data {
      name
      code
    }
  }
}
    `;

/**
 * __useListBlockedCountriesQuery__
 *
 * To run a query within a React component, call `useListBlockedCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListBlockedCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListBlockedCountriesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useListBlockedCountriesQuery(baseOptions?: Apollo.QueryHookOptions<ListBlockedCountriesQuery, ListBlockedCountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListBlockedCountriesQuery, ListBlockedCountriesQueryVariables>(ListBlockedCountriesDocument, options);
      }
export function useListBlockedCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListBlockedCountriesQuery, ListBlockedCountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListBlockedCountriesQuery, ListBlockedCountriesQueryVariables>(ListBlockedCountriesDocument, options);
        }
export type ListBlockedCountriesQueryHookResult = ReturnType<typeof useListBlockedCountriesQuery>;
export type ListBlockedCountriesLazyQueryHookResult = ReturnType<typeof useListBlockedCountriesLazyQuery>;
export type ListBlockedCountriesQueryResult = Apollo.QueryResult<ListBlockedCountriesQuery, ListBlockedCountriesQueryVariables>;