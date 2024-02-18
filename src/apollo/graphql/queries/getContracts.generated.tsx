/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ContractBasicFragmentDoc } from '../fragments/contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetContractsQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.ContractFilter>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  viewingAs: Types.ContractListingPov;
}>;


export type GetContractsQuery = { __typename?: 'Query', getContractList: { __typename?: 'NoumContractOutput', count?: number | null, data?: Array<{ __typename?: 'Contract', _id: string, contractNumber: number, title?: string | null, status: Types.ContractStatus, effectiveDate?: any | null, isCompleted: boolean, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string } | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null }> | null } };

export type GetContractsForSelectorQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.ContractFilter>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetContractsForSelectorQuery = { __typename?: 'Query', getContractList: { __typename?: 'NoumContractOutput', count?: number | null, data?: Array<{ __typename?: 'Contract', _id: string, contractNumber: number, title?: string | null, status: Types.ContractStatus, effectiveDate?: any | null, isCompleted: boolean, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string } | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null }> | null } };


export const GetContractsDocument = gql`
    query GetContracts($filter: ContractFilter, $limit: Int, $offset: Int, $viewingAs: ContractListingPOV!) {
  getContractList(
    filter: $filter
    limit: $limit
    offset: $offset
    viewingAs: $viewingAs
  ) {
    count
    data {
      ...ContractBasic
    }
  }
}
    ${ContractBasicFragmentDoc}`;

/**
 * __useGetContractsQuery__
 *
 * To run a query within a React component, call `useGetContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      viewingAs: // value for 'viewingAs'
 *   },
 * });
 */
export function useGetContractsQuery(baseOptions: Apollo.QueryHookOptions<GetContractsQuery, GetContractsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
      }
export function useGetContractsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContractsQuery, GetContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
        }
export type GetContractsQueryHookResult = ReturnType<typeof useGetContractsQuery>;
export type GetContractsLazyQueryHookResult = ReturnType<typeof useGetContractsLazyQuery>;
export type GetContractsQueryResult = Apollo.QueryResult<GetContractsQuery, GetContractsQueryVariables>;
export const GetContractsForSelectorDocument = gql`
    query GetContractsForSelector($filter: ContractFilter, $limit: Int, $offset: Int) {
  getContractList(filter: $filter, limit: $limit, offset: $offset) {
    count
    data {
      ...ContractBasic
    }
  }
}
    ${ContractBasicFragmentDoc}`;

/**
 * __useGetContractsForSelectorQuery__
 *
 * To run a query within a React component, call `useGetContractsForSelectorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractsForSelectorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractsForSelectorQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetContractsForSelectorQuery(baseOptions?: Apollo.QueryHookOptions<GetContractsForSelectorQuery, GetContractsForSelectorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContractsForSelectorQuery, GetContractsForSelectorQueryVariables>(GetContractsForSelectorDocument, options);
      }
export function useGetContractsForSelectorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContractsForSelectorQuery, GetContractsForSelectorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContractsForSelectorQuery, GetContractsForSelectorQueryVariables>(GetContractsForSelectorDocument, options);
        }
export type GetContractsForSelectorQueryHookResult = ReturnType<typeof useGetContractsForSelectorQuery>;
export type GetContractsForSelectorLazyQueryHookResult = ReturnType<typeof useGetContractsForSelectorLazyQuery>;
export type GetContractsForSelectorQueryResult = Apollo.QueryResult<GetContractsForSelectorQuery, GetContractsForSelectorQueryVariables>;