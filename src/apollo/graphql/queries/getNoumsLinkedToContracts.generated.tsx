/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumContractLinkedNoumBasicFragmentDoc } from '../fragments/contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumsLinkedToContractsQueryVariables = Types.Exact<{
  pov: Types.ContractListingPov;
}>;


export type GetNoumsLinkedToContractsQuery = { __typename?: 'Query', getNoumsLinkedToContracts?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }> | null };


export const GetNoumsLinkedToContractsDocument = gql`
    query GetNoumsLinkedToContracts($pov: ContractListingPOV!) {
  getNoumsLinkedToContracts(pov: $pov) {
    ...NoumContractLinkedNoumBasic
  }
}
    ${NoumContractLinkedNoumBasicFragmentDoc}`;

/**
 * __useGetNoumsLinkedToContractsQuery__
 *
 * To run a query within a React component, call `useGetNoumsLinkedToContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumsLinkedToContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumsLinkedToContractsQuery({
 *   variables: {
 *      pov: // value for 'pov'
 *   },
 * });
 */
export function useGetNoumsLinkedToContractsQuery(baseOptions: Apollo.QueryHookOptions<GetNoumsLinkedToContractsQuery, GetNoumsLinkedToContractsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumsLinkedToContractsQuery, GetNoumsLinkedToContractsQueryVariables>(GetNoumsLinkedToContractsDocument, options);
      }
export function useGetNoumsLinkedToContractsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumsLinkedToContractsQuery, GetNoumsLinkedToContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumsLinkedToContractsQuery, GetNoumsLinkedToContractsQueryVariables>(GetNoumsLinkedToContractsDocument, options);
        }
export type GetNoumsLinkedToContractsQueryHookResult = ReturnType<typeof useGetNoumsLinkedToContractsQuery>;
export type GetNoumsLinkedToContractsLazyQueryHookResult = ReturnType<typeof useGetNoumsLinkedToContractsLazyQuery>;
export type GetNoumsLinkedToContractsQueryResult = Apollo.QueryResult<GetNoumsLinkedToContractsQuery, GetNoumsLinkedToContractsQueryVariables>;