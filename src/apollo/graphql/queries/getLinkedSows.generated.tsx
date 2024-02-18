/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SowBasicFragmentDoc } from '../fragments/sow.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetLinkedSoWsQueryVariables = Types.Exact<{
  contractId: Types.Scalars['ID'];
  filter?: Types.InputMaybe<Types.GetLinkedSoWsFilter>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetLinkedSoWsQuery = { __typename?: 'Query', getLinkedSOWs: { __typename?: 'SOWOutput', count?: number | null, data?: Array<{ __typename?: 'SOW', _id: string, SOWNumber: number, status: Types.SowStatus, title?: string | null, effectiveDate?: any | null, isCompleted: boolean, createdBy?: { __typename?: 'UserOutput', _id: string } | null, linkedNoum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }, linkedContract?: { __typename?: 'Contract', status: Types.ContractStatus, contractNumber: number, isCompleted: boolean, _id: string, title?: string | null, effectiveDate?: any | null, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null } | null }> | null } };


export const GetLinkedSoWsDocument = gql`
    query GetLinkedSOWs($contractId: ID!, $filter: GetLinkedSOWsFilter, $limit: Int = 100, $offset: Int = 0) {
  getLinkedSOWs(
    contractId: $contractId
    filter: $filter
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
 * __useGetLinkedSoWsQuery__
 *
 * To run a query within a React component, call `useGetLinkedSoWsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLinkedSoWsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLinkedSoWsQuery({
 *   variables: {
 *      contractId: // value for 'contractId'
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetLinkedSoWsQuery(baseOptions: Apollo.QueryHookOptions<GetLinkedSoWsQuery, GetLinkedSoWsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLinkedSoWsQuery, GetLinkedSoWsQueryVariables>(GetLinkedSoWsDocument, options);
      }
export function useGetLinkedSoWsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLinkedSoWsQuery, GetLinkedSoWsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLinkedSoWsQuery, GetLinkedSoWsQueryVariables>(GetLinkedSoWsDocument, options);
        }
export type GetLinkedSoWsQueryHookResult = ReturnType<typeof useGetLinkedSoWsQuery>;
export type GetLinkedSoWsLazyQueryHookResult = ReturnType<typeof useGetLinkedSoWsLazyQuery>;
export type GetLinkedSoWsQueryResult = Apollo.QueryResult<GetLinkedSoWsQuery, GetLinkedSoWsQueryVariables>;