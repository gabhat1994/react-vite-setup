/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SowBasicFragmentDoc } from '../fragments/sow.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetStatementsOfWorkQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.GetAllSowFilter>;
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
  viewingAs: Types.ContractListingPov;
}>;


export type GetStatementsOfWorkQuery = { __typename?: 'Query', getAllSOW: { __typename?: 'SOWOutput', count?: number | null, data?: Array<{ __typename?: 'SOW', _id: string, SOWNumber: number, status: Types.SowStatus, title?: string | null, effectiveDate?: any | null, isCompleted: boolean, createdBy?: { __typename?: 'UserOutput', _id: string } | null, linkedNoum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }, linkedContract?: { __typename?: 'Contract', status: Types.ContractStatus, contractNumber: number, isCompleted: boolean, _id: string, title?: string | null, effectiveDate?: any | null, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null } | null }> | null } };


export const GetStatementsOfWorkDocument = gql`
    query GetStatementsOfWork($filter: GetAllSOWFilter, $limit: Int, $offset: Int, $viewingAs: ContractListingPOV!) {
  getAllSOW(
    filter: $filter
    limit: $limit
    offset: $offset
    viewingAs: $viewingAs
  ) {
    count
    data {
      ...SOWBasic
    }
  }
}
    ${SowBasicFragmentDoc}`;

/**
 * __useGetStatementsOfWorkQuery__
 *
 * To run a query within a React component, call `useGetStatementsOfWorkQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatementsOfWorkQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatementsOfWorkQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      viewingAs: // value for 'viewingAs'
 *   },
 * });
 */
export function useGetStatementsOfWorkQuery(baseOptions: Apollo.QueryHookOptions<GetStatementsOfWorkQuery, GetStatementsOfWorkQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatementsOfWorkQuery, GetStatementsOfWorkQueryVariables>(GetStatementsOfWorkDocument, options);
      }
export function useGetStatementsOfWorkLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatementsOfWorkQuery, GetStatementsOfWorkQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatementsOfWorkQuery, GetStatementsOfWorkQueryVariables>(GetStatementsOfWorkDocument, options);
        }
export type GetStatementsOfWorkQueryHookResult = ReturnType<typeof useGetStatementsOfWorkQuery>;
export type GetStatementsOfWorkLazyQueryHookResult = ReturnType<typeof useGetStatementsOfWorkLazyQuery>;
export type GetStatementsOfWorkQueryResult = Apollo.QueryResult<GetStatementsOfWorkQuery, GetStatementsOfWorkQueryVariables>;