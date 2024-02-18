/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CheckIfSlugExistsQueryVariables = Types.Exact<{
  slug: Types.Scalars['String'];
}>;


export type CheckIfSlugExistsQuery = { __typename?: 'Query', checkIfSlugExists?: boolean | null };


export const CheckIfSlugExistsDocument = gql`
    query checkIfSlugExists($slug: String!) {
  checkIfSlugExists(slug: $slug)
}
    `;

/**
 * __useCheckIfSlugExistsQuery__
 *
 * To run a query within a React component, call `useCheckIfSlugExistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIfSlugExistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIfSlugExistsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useCheckIfSlugExistsQuery(baseOptions: Apollo.QueryHookOptions<CheckIfSlugExistsQuery, CheckIfSlugExistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIfSlugExistsQuery, CheckIfSlugExistsQueryVariables>(CheckIfSlugExistsDocument, options);
      }
export function useCheckIfSlugExistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckIfSlugExistsQuery, CheckIfSlugExistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIfSlugExistsQuery, CheckIfSlugExistsQueryVariables>(CheckIfSlugExistsDocument, options);
        }
export type CheckIfSlugExistsQueryHookResult = ReturnType<typeof useCheckIfSlugExistsQuery>;
export type CheckIfSlugExistsLazyQueryHookResult = ReturnType<typeof useCheckIfSlugExistsLazyQuery>;
export type CheckIfSlugExistsQueryResult = Apollo.QueryResult<CheckIfSlugExistsQuery, CheckIfSlugExistsQueryVariables>;