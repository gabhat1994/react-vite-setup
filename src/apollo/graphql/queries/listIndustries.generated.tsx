/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ListIndustriesQueryVariables = Types.Exact<{
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type ListIndustriesQuery = { __typename?: 'Query', listIndustries: { __typename: 'IndustryListOutput', count?: number | null, data?: Array<{ __typename?: 'IndustryList', name?: string | null, type?: string | null } | null> | null } };


export const ListIndustriesDocument = gql`
    query listIndustries($limit: Int, $offset: Int) {
  listIndustries(limit: $limit, offset: $offset) {
    data {
      name
      type
    }
    count
    __typename
  }
}
    `;

/**
 * __useListIndustriesQuery__
 *
 * To run a query within a React component, call `useListIndustriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListIndustriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListIndustriesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useListIndustriesQuery(baseOptions?: Apollo.QueryHookOptions<ListIndustriesQuery, ListIndustriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListIndustriesQuery, ListIndustriesQueryVariables>(ListIndustriesDocument, options);
      }
export function useListIndustriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListIndustriesQuery, ListIndustriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListIndustriesQuery, ListIndustriesQueryVariables>(ListIndustriesDocument, options);
        }
export type ListIndustriesQueryHookResult = ReturnType<typeof useListIndustriesQuery>;
export type ListIndustriesLazyQueryHookResult = ReturnType<typeof useListIndustriesLazyQuery>;
export type ListIndustriesQueryResult = Apollo.QueryResult<ListIndustriesQuery, ListIndustriesQueryVariables>;