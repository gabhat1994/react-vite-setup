/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SowBasicFragmentDoc } from '../fragments/sow.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUnlinkedSoWsQueryVariables = Types.Exact<{
  noumId: Types.Scalars['ID'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetUnlinkedSoWsQuery = { __typename?: 'Query', getAllSOW: { __typename?: 'SOWOutput', count?: number | null, data?: Array<{ __typename?: 'SOW', _id: string, SOWNumber: number, status: Types.SowStatus, title?: string | null, effectiveDate?: any | null, isCompleted: boolean, createdBy?: { __typename?: 'UserOutput', _id: string } | null, linkedNoum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }, linkedContract?: { __typename?: 'Contract', status: Types.ContractStatus, contractNumber: number, isCompleted: boolean, _id: string, title?: string | null, effectiveDate?: any | null, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null } | null }> | null } };


export const GetUnlinkedSoWsDocument = gql`
    query GetUnlinkedSOWs($noumId: ID!, $limit: Int = 100, $offset: Int = 0) {
  getAllSOW(
    viewingAs: OWNER
    filter: {unlinked: true, noumIds: [$noumId]}
    limit: $limit
    offset: $offset
  ) {
    count
    data {
      ...SOWBasic
    }
  }
}
    ${SowBasicFragmentDoc}`;

/**
 * __useGetUnlinkedSoWsQuery__
 *
 * To run a query within a React component, call `useGetUnlinkedSoWsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnlinkedSoWsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnlinkedSoWsQuery({
 *   variables: {
 *      noumId: // value for 'noumId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUnlinkedSoWsQuery(baseOptions: Apollo.QueryHookOptions<GetUnlinkedSoWsQuery, GetUnlinkedSoWsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnlinkedSoWsQuery, GetUnlinkedSoWsQueryVariables>(GetUnlinkedSoWsDocument, options);
      }
export function useGetUnlinkedSoWsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnlinkedSoWsQuery, GetUnlinkedSoWsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnlinkedSoWsQuery, GetUnlinkedSoWsQueryVariables>(GetUnlinkedSoWsDocument, options);
        }
export type GetUnlinkedSoWsQueryHookResult = ReturnType<typeof useGetUnlinkedSoWsQuery>;
export type GetUnlinkedSoWsLazyQueryHookResult = ReturnType<typeof useGetUnlinkedSoWsLazyQuery>;
export type GetUnlinkedSoWsQueryResult = Apollo.QueryResult<GetUnlinkedSoWsQuery, GetUnlinkedSoWsQueryVariables>;