/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumenaScoreFragmentDoc } from '../fragments/capitalQuotient.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CapitalquotientQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CapitalquotientQuery = { __typename?: 'Query', getSpaceByType?: Array<{ __typename?: 'SpaceOutput', _id?: string | null } | null> | null, capitalquotient?: { __typename?: 'CapitalquotientQueries', getNoumenaScore?: { __typename?: 'NoumenaScoreOutput', status?: string | null, visibility?: string | null, capitalQuotient?: string | null } | null } | null };


export const CapitalquotientDocument = gql`
    query capitalquotient {
  getSpaceByType(type: HOME) {
    _id
  }
  capitalquotient {
    getNoumenaScore {
      ...NoumenaScore
    }
  }
}
    ${NoumenaScoreFragmentDoc}`;

/**
 * __useCapitalquotientQuery__
 *
 * To run a query within a React component, call `useCapitalquotientQuery` and pass it any options that fit your needs.
 * When your component renders, `useCapitalquotientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCapitalquotientQuery({
 *   variables: {
 *   },
 * });
 */
export function useCapitalquotientQuery(baseOptions?: Apollo.QueryHookOptions<CapitalquotientQuery, CapitalquotientQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CapitalquotientQuery, CapitalquotientQueryVariables>(CapitalquotientDocument, options);
      }
export function useCapitalquotientLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CapitalquotientQuery, CapitalquotientQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CapitalquotientQuery, CapitalquotientQueryVariables>(CapitalquotientDocument, options);
        }
export type CapitalquotientQueryHookResult = ReturnType<typeof useCapitalquotientQuery>;
export type CapitalquotientLazyQueryHookResult = ReturnType<typeof useCapitalquotientLazyQuery>;
export type CapitalquotientQueryResult = Apollo.QueryResult<CapitalquotientQuery, CapitalquotientQueryVariables>;