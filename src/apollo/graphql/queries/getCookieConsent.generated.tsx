/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCookieConsentQueryVariables = Types.Exact<{
  cookieConsentId: Types.Scalars['String'];
}>;


export type GetCookieConsentQuery = { __typename?: 'Query', getCookieConsent?: { __typename?: 'CookieConsentOutput', cookieConsentId?: string | null, cookieConsent?: boolean | null, createdAt?: any | null } | null };


export const GetCookieConsentDocument = gql`
    query GetCookieConsent($cookieConsentId: String!) {
  getCookieConsent(cookieConsentId: $cookieConsentId) {
    cookieConsentId
    cookieConsent
    createdAt
  }
}
    `;

/**
 * __useGetCookieConsentQuery__
 *
 * To run a query within a React component, call `useGetCookieConsentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCookieConsentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCookieConsentQuery({
 *   variables: {
 *      cookieConsentId: // value for 'cookieConsentId'
 *   },
 * });
 */
export function useGetCookieConsentQuery(baseOptions: Apollo.QueryHookOptions<GetCookieConsentQuery, GetCookieConsentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCookieConsentQuery, GetCookieConsentQueryVariables>(GetCookieConsentDocument, options);
      }
export function useGetCookieConsentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCookieConsentQuery, GetCookieConsentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCookieConsentQuery, GetCookieConsentQueryVariables>(GetCookieConsentDocument, options);
        }
export type GetCookieConsentQueryHookResult = ReturnType<typeof useGetCookieConsentQuery>;
export type GetCookieConsentLazyQueryHookResult = ReturnType<typeof useGetCookieConsentLazyQuery>;
export type GetCookieConsentQueryResult = Apollo.QueryResult<GetCookieConsentQuery, GetCookieConsentQueryVariables>;