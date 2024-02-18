/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CleverTapUserPropertyQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CleverTapUserPropertyQuery = { __typename?: 'Query', cq?: { __typename?: 'CapitalquotientQueries', getNoumenaScore?: { __typename?: 'NoumenaScoreOutput', capitalQuotient?: string | null } | null } | null, space?: Array<{ __typename?: 'SpaceOutput', percentCompleted?: number | null } | null> | null };


export const CleverTapUserPropertyDocument = gql`
    query cleverTapUserProperty {
  cq: capitalquotient {
    getNoumenaScore {
      capitalQuotient
    }
  }
  space: getSpaceByType(type: HOME) {
    percentCompleted
  }
}
    `;

/**
 * __useCleverTapUserPropertyQuery__
 *
 * To run a query within a React component, call `useCleverTapUserPropertyQuery` and pass it any options that fit your needs.
 * When your component renders, `useCleverTapUserPropertyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCleverTapUserPropertyQuery({
 *   variables: {
 *   },
 * });
 */
export function useCleverTapUserPropertyQuery(baseOptions?: Apollo.QueryHookOptions<CleverTapUserPropertyQuery, CleverTapUserPropertyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CleverTapUserPropertyQuery, CleverTapUserPropertyQueryVariables>(CleverTapUserPropertyDocument, options);
      }
export function useCleverTapUserPropertyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CleverTapUserPropertyQuery, CleverTapUserPropertyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CleverTapUserPropertyQuery, CleverTapUserPropertyQueryVariables>(CleverTapUserPropertyDocument, options);
        }
export type CleverTapUserPropertyQueryHookResult = ReturnType<typeof useCleverTapUserPropertyQuery>;
export type CleverTapUserPropertyLazyQueryHookResult = ReturnType<typeof useCleverTapUserPropertyLazyQuery>;
export type CleverTapUserPropertyQueryResult = Apollo.QueryResult<CleverTapUserPropertyQuery, CleverTapUserPropertyQueryVariables>;