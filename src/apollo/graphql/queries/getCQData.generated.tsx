/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CqFormOutputFragmentDoc } from '../fragments/capitalQuotient.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCqDataQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCqDataQuery = { __typename?: 'Query', capitalquotient?: { __typename?: 'CapitalquotientQueries', getCQDetails?: { __typename?: 'CQFormOutput', updatedAt?: string | null, status?: string | null, forms?: Array<{ __typename?: 'CQForm', details?: any | null, formId?: string | null, status?: string | null } | null> | null } | null } | null };


export const GetCqDataDocument = gql`
    query getCQData {
  capitalquotient {
    getCQDetails {
      ...CQFormOutput
    }
  }
}
    ${CqFormOutputFragmentDoc}`;

/**
 * __useGetCqDataQuery__
 *
 * To run a query within a React component, call `useGetCqDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCqDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCqDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCqDataQuery(baseOptions?: Apollo.QueryHookOptions<GetCqDataQuery, GetCqDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCqDataQuery, GetCqDataQueryVariables>(GetCqDataDocument, options);
      }
export function useGetCqDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCqDataQuery, GetCqDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCqDataQuery, GetCqDataQueryVariables>(GetCqDataDocument, options);
        }
export type GetCqDataQueryHookResult = ReturnType<typeof useGetCqDataQuery>;
export type GetCqDataLazyQueryHookResult = ReturnType<typeof useGetCqDataLazyQuery>;
export type GetCqDataQueryResult = Apollo.QueryResult<GetCqDataQuery, GetCqDataQueryVariables>;