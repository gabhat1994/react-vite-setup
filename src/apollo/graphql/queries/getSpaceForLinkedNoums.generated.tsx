/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { LinkedNoumFragmentDoc } from '../fragments/linkedNoum.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSpaceForLinkedNoumsQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
}>;


export type GetSpaceForLinkedNoumsQuery = { __typename?: 'Query', getSpaceById?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, profileImage?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, connectionId?: string | null, projectType?: string | null, connectionsCount?: number | null, createdAt?: any | null, link?: { __typename?: 'NoumLink', _id: string, status: Types.NoumLinkStatus, linkedNoumsCount: number } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, members?: { __typename?: 'PaginatedNoumMembers', count: number } | null } | null };


export const GetSpaceForLinkedNoumsDocument = gql`
    query getSpaceForLinkedNoums($noumId: ID!) {
  getSpaceById(id: $noumId) {
    ...LinkedNoum
  }
}
    ${LinkedNoumFragmentDoc}`;

/**
 * __useGetSpaceForLinkedNoumsQuery__
 *
 * To run a query within a React component, call `useGetSpaceForLinkedNoumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpaceForLinkedNoumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpaceForLinkedNoumsQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *   },
 * });
 */
export function useGetSpaceForLinkedNoumsQuery(baseOptions: Apollo.QueryHookOptions<GetSpaceForLinkedNoumsQuery, GetSpaceForLinkedNoumsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpaceForLinkedNoumsQuery, GetSpaceForLinkedNoumsQueryVariables>(GetSpaceForLinkedNoumsDocument, options);
      }
export function useGetSpaceForLinkedNoumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpaceForLinkedNoumsQuery, GetSpaceForLinkedNoumsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpaceForLinkedNoumsQuery, GetSpaceForLinkedNoumsQueryVariables>(GetSpaceForLinkedNoumsDocument, options);
        }
export type GetSpaceForLinkedNoumsQueryHookResult = ReturnType<typeof useGetSpaceForLinkedNoumsQuery>;
export type GetSpaceForLinkedNoumsLazyQueryHookResult = ReturnType<typeof useGetSpaceForLinkedNoumsLazyQuery>;
export type GetSpaceForLinkedNoumsQueryResult = Apollo.QueryResult<GetSpaceForLinkedNoumsQuery, GetSpaceForLinkedNoumsQueryVariables>;