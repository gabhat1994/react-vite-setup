/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { TimezoneFragmentDoc } from '../fragments/timeZone.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type TimezonesQueryVariables = Types.Exact<{
  search?: Types.InputMaybe<Types.Scalars['String']>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type TimezonesQuery = { __typename?: 'Query', timezones?: { __typename?: 'PaginatedTimezoneData', count?: number | null, data?: Array<{ __typename?: 'Timezone', _id: string, offset?: string | null, text?: string | null, value?: string | null, abbr?: string | null, utcOffset?: string | null, timezone?: string | null } | null> | null } | null };


export const TimezonesDocument = gql`
    query timezones($search: String, $limit: Int, $offset: Int) {
  timezones(search: $search, limit: $limit, offset: $offset) {
    count
    data {
      ...Timezone
    }
  }
}
    ${TimezoneFragmentDoc}`;

/**
 * __useTimezonesQuery__
 *
 * To run a query within a React component, call `useTimezonesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTimezonesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTimezonesQuery({
 *   variables: {
 *      search: // value for 'search'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useTimezonesQuery(baseOptions?: Apollo.QueryHookOptions<TimezonesQuery, TimezonesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TimezonesQuery, TimezonesQueryVariables>(TimezonesDocument, options);
      }
export function useTimezonesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TimezonesQuery, TimezonesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TimezonesQuery, TimezonesQueryVariables>(TimezonesDocument, options);
        }
export type TimezonesQueryHookResult = ReturnType<typeof useTimezonesQuery>;
export type TimezonesLazyQueryHookResult = ReturnType<typeof useTimezonesLazyQuery>;
export type TimezonesQueryResult = Apollo.QueryResult<TimezonesQuery, TimezonesQueryVariables>;