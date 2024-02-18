/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserCustomerDetailsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserCustomerDetailsQuery = { __typename?: 'Query', getUserCustomerDetails: { __typename?: 'Customer', first_name?: string | null, last_name?: string | null, email?: string | null, uid: string, external_customer_id: string, created_at?: string | null, updated_at?: string | null, status?: string | null } };


export const GetUserCustomerDetailsDocument = gql`
    query getUserCustomerDetails {
  getUserCustomerDetails {
    first_name
    last_name
    email
    uid
    external_customer_id
    created_at
    updated_at
    status
  }
}
    `;

/**
 * __useGetUserCustomerDetailsQuery__
 *
 * To run a query within a React component, call `useGetUserCustomerDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCustomerDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCustomerDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserCustomerDetailsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserCustomerDetailsQuery, GetUserCustomerDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserCustomerDetailsQuery, GetUserCustomerDetailsQueryVariables>(GetUserCustomerDetailsDocument, options);
      }
export function useGetUserCustomerDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserCustomerDetailsQuery, GetUserCustomerDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserCustomerDetailsQuery, GetUserCustomerDetailsQueryVariables>(GetUserCustomerDetailsDocument, options);
        }
export type GetUserCustomerDetailsQueryHookResult = ReturnType<typeof useGetUserCustomerDetailsQuery>;
export type GetUserCustomerDetailsLazyQueryHookResult = ReturnType<typeof useGetUserCustomerDetailsLazyQuery>;
export type GetUserCustomerDetailsQueryResult = Apollo.QueryResult<GetUserCustomerDetailsQuery, GetUserCustomerDetailsQueryVariables>;