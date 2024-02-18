/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type MenuPermissionsForActiveSubscriptionQueryVariables = Types.Exact<{
  homeNoumId: Types.Scalars['String'];
}>;


export type MenuPermissionsForActiveSubscriptionQuery = { __typename?: 'Query', getSubscriptionPermissionsAndHomeNoumCounters?: { __typename?: 'PermissionsHomeCountersOutput', data: { __typename?: 'PermissionsCountersSubOutput', permissions?: Array<string | null> | null } } | null };


export const MenuPermissionsForActiveSubscriptionDocument = gql`
    query menuPermissionsForActiveSubscription($homeNoumId: String!) {
  getSubscriptionPermissionsAndHomeNoumCounters(homeNoumId: $homeNoumId) {
    data {
      permissions
    }
  }
}
    `;

/**
 * __useMenuPermissionsForActiveSubscriptionQuery__
 *
 * To run a query within a React component, call `useMenuPermissionsForActiveSubscriptionQuery` and pass it any options that fit your needs.
 * When your component renders, `useMenuPermissionsForActiveSubscriptionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMenuPermissionsForActiveSubscriptionQuery({
 *   variables: {
 *      homeNoumId: // value for 'homeNoumId'
 *   },
 * });
 */
export function useMenuPermissionsForActiveSubscriptionQuery(baseOptions: Apollo.QueryHookOptions<MenuPermissionsForActiveSubscriptionQuery, MenuPermissionsForActiveSubscriptionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MenuPermissionsForActiveSubscriptionQuery, MenuPermissionsForActiveSubscriptionQueryVariables>(MenuPermissionsForActiveSubscriptionDocument, options);
      }
export function useMenuPermissionsForActiveSubscriptionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MenuPermissionsForActiveSubscriptionQuery, MenuPermissionsForActiveSubscriptionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MenuPermissionsForActiveSubscriptionQuery, MenuPermissionsForActiveSubscriptionQueryVariables>(MenuPermissionsForActiveSubscriptionDocument, options);
        }
export type MenuPermissionsForActiveSubscriptionQueryHookResult = ReturnType<typeof useMenuPermissionsForActiveSubscriptionQuery>;
export type MenuPermissionsForActiveSubscriptionLazyQueryHookResult = ReturnType<typeof useMenuPermissionsForActiveSubscriptionLazyQuery>;
export type MenuPermissionsForActiveSubscriptionQueryResult = Apollo.QueryResult<MenuPermissionsForActiveSubscriptionQuery, MenuPermissionsForActiveSubscriptionQueryVariables>;