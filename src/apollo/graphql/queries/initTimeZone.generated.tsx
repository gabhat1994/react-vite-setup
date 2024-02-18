/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { TimezoneFragmentDoc } from '../fragments/timeZone.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type InitTimezoneQueryVariables = Types.Exact<{
  timezone: Types.Scalars['String'];
}>;


export type InitTimezoneQuery = { __typename?: 'Query', initTimezone?: { __typename?: 'Timezone', _id: string, offset?: string | null, text?: string | null, value?: string | null, abbr?: string | null, utcOffset?: string | null, timezone?: string | null } | null };


export const InitTimezoneDocument = gql`
    query initTimezone($timezone: String!) {
  initTimezone(timezone: $timezone) {
    ...Timezone
  }
}
    ${TimezoneFragmentDoc}`;

/**
 * __useInitTimezoneQuery__
 *
 * To run a query within a React component, call `useInitTimezoneQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitTimezoneQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitTimezoneQuery({
 *   variables: {
 *      timezone: // value for 'timezone'
 *   },
 * });
 */
export function useInitTimezoneQuery(baseOptions: Apollo.QueryHookOptions<InitTimezoneQuery, InitTimezoneQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InitTimezoneQuery, InitTimezoneQueryVariables>(InitTimezoneDocument, options);
      }
export function useInitTimezoneLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InitTimezoneQuery, InitTimezoneQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InitTimezoneQuery, InitTimezoneQueryVariables>(InitTimezoneDocument, options);
        }
export type InitTimezoneQueryHookResult = ReturnType<typeof useInitTimezoneQuery>;
export type InitTimezoneLazyQueryHookResult = ReturnType<typeof useInitTimezoneLazyQuery>;
export type InitTimezoneQueryResult = Apollo.QueryResult<InitTimezoneQuery, InitTimezoneQueryVariables>;