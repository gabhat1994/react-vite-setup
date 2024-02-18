/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumContactBasicFragmentDoc } from '../fragments/noumContact.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetConsignorsQueryVariables = Types.Exact<{
  pov: Types.ContractListingPov;
}>;


export type GetConsignorsQuery = { __typename?: 'Query', getConsignors?: Array<{ __typename?: 'NoumContactOutput', _id: string, displayName: string, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } }> | null };


export const GetConsignorsDocument = gql`
    query GetConsignors($pov: ContractListingPOV!) {
  getConsignors(pov: $pov) {
    ...NoumContactBasic
  }
}
    ${NoumContactBasicFragmentDoc}`;

/**
 * __useGetConsignorsQuery__
 *
 * To run a query within a React component, call `useGetConsignorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConsignorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConsignorsQuery({
 *   variables: {
 *      pov: // value for 'pov'
 *   },
 * });
 */
export function useGetConsignorsQuery(baseOptions: Apollo.QueryHookOptions<GetConsignorsQuery, GetConsignorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConsignorsQuery, GetConsignorsQueryVariables>(GetConsignorsDocument, options);
      }
export function useGetConsignorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConsignorsQuery, GetConsignorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConsignorsQuery, GetConsignorsQueryVariables>(GetConsignorsDocument, options);
        }
export type GetConsignorsQueryHookResult = ReturnType<typeof useGetConsignorsQuery>;
export type GetConsignorsLazyQueryHookResult = ReturnType<typeof useGetConsignorsLazyQuery>;
export type GetConsignorsQueryResult = Apollo.QueryResult<GetConsignorsQuery, GetConsignorsQueryVariables>;