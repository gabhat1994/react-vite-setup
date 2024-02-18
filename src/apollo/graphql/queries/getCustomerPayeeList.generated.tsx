/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { CustomerPayeeListFragmentDoc } from '../fragments/customerPayeeList.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCustomerPayeeListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCustomerPayeeListQuery = { __typename?: 'Query', getCustomerPayeeList?: Array<{ __typename?: 'CustomerPayeeList', id: string, customerName: string, maskAccountNumber?: string | null, accountType?: Types.AccountType | null, subAccountType?: Types.SubAccountType | null, walletName?: string | null, accountId: string, chamberId?: string | null, userId?: { __typename?: 'UserOutput', _id: string, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null } | null } | null } | null> | null };


export const GetCustomerPayeeListDocument = gql`
    query getCustomerPayeeList {
  getCustomerPayeeList {
    ...CustomerPayeeList
  }
}
    ${CustomerPayeeListFragmentDoc}`;

/**
 * __useGetCustomerPayeeListQuery__
 *
 * To run a query within a React component, call `useGetCustomerPayeeListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerPayeeListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerPayeeListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCustomerPayeeListQuery(baseOptions?: Apollo.QueryHookOptions<GetCustomerPayeeListQuery, GetCustomerPayeeListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerPayeeListQuery, GetCustomerPayeeListQueryVariables>(GetCustomerPayeeListDocument, options);
      }
export function useGetCustomerPayeeListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerPayeeListQuery, GetCustomerPayeeListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerPayeeListQuery, GetCustomerPayeeListQueryVariables>(GetCustomerPayeeListDocument, options);
        }
export type GetCustomerPayeeListQueryHookResult = ReturnType<typeof useGetCustomerPayeeListQuery>;
export type GetCustomerPayeeListLazyQueryHookResult = ReturnType<typeof useGetCustomerPayeeListLazyQuery>;
export type GetCustomerPayeeListQueryResult = Apollo.QueryResult<GetCustomerPayeeListQuery, GetCustomerPayeeListQueryVariables>;