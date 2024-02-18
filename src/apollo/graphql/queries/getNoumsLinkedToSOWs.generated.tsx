/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SowLinkedNoumBasicFragmentDoc } from '../fragments/sow.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetNoumsLinkedToSoWsQueryVariables = Types.Exact<{
  pov: Types.ContractListingPov;
}>;


export type GetNoumsLinkedToSoWsQuery = { __typename?: 'Query', getNoumsLinkedToSOWs?: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }> | null };


export const GetNoumsLinkedToSoWsDocument = gql`
    query GetNoumsLinkedToSOWs($pov: ContractListingPOV!) {
  getNoumsLinkedToSOWs(pov: $pov) {
    ...SOWLinkedNoumBasic
  }
}
    ${SowLinkedNoumBasicFragmentDoc}`;

/**
 * __useGetNoumsLinkedToSoWsQuery__
 *
 * To run a query within a React component, call `useGetNoumsLinkedToSoWsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNoumsLinkedToSoWsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNoumsLinkedToSoWsQuery({
 *   variables: {
 *      pov: // value for 'pov'
 *   },
 * });
 */
export function useGetNoumsLinkedToSoWsQuery(baseOptions: Apollo.QueryHookOptions<GetNoumsLinkedToSoWsQuery, GetNoumsLinkedToSoWsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNoumsLinkedToSoWsQuery, GetNoumsLinkedToSoWsQueryVariables>(GetNoumsLinkedToSoWsDocument, options);
      }
export function useGetNoumsLinkedToSoWsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNoumsLinkedToSoWsQuery, GetNoumsLinkedToSoWsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNoumsLinkedToSoWsQuery, GetNoumsLinkedToSoWsQueryVariables>(GetNoumsLinkedToSoWsDocument, options);
        }
export type GetNoumsLinkedToSoWsQueryHookResult = ReturnType<typeof useGetNoumsLinkedToSoWsQuery>;
export type GetNoumsLinkedToSoWsLazyQueryHookResult = ReturnType<typeof useGetNoumsLinkedToSoWsLazyQuery>;
export type GetNoumsLinkedToSoWsQueryResult = Apollo.QueryResult<GetNoumsLinkedToSoWsQuery, GetNoumsLinkedToSoWsQueryVariables>;