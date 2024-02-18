/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ContractFragmentDoc } from '../fragments/contract.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSingleContractQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetSingleContractQuery = { __typename?: 'Query', getSingleContract?: { __typename?: 'Contract', _id: string, contractNumber: number, title?: string | null, status: Types.ContractStatus, templateName?: string | null, effectiveDate?: any | null, terminationNoticeInDays?: number | null, logo?: string | null, isCompleted: boolean, linkedNoum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }, buyer?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null, legalJurisdiction?: { __typename?: 'Jurisdiction', country?: string | null, state?: string | null, region?: string | null } | null, arbitrationJurisdiction?: { __typename?: 'Jurisdiction', country?: string | null, state?: string | null, region?: string | null } | null, timeline?: Array<{ __typename?: 'ContractSowTimeLine', timestamp: any, userId?: string | null, fromStatus?: string | null, toStatus: string }> | null } | null };


export const GetSingleContractDocument = gql`
    query GetSingleContract($id: ID!) {
  getSingleContract(_id: $id) {
    ...Contract
  }
}
    ${ContractFragmentDoc}`;

/**
 * __useGetSingleContractQuery__
 *
 * To run a query within a React component, call `useGetSingleContractQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleContractQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleContractQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSingleContractQuery(baseOptions: Apollo.QueryHookOptions<GetSingleContractQuery, GetSingleContractQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSingleContractQuery, GetSingleContractQueryVariables>(GetSingleContractDocument, options);
      }
export function useGetSingleContractLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleContractQuery, GetSingleContractQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSingleContractQuery, GetSingleContractQueryVariables>(GetSingleContractDocument, options);
        }
export type GetSingleContractQueryHookResult = ReturnType<typeof useGetSingleContractQuery>;
export type GetSingleContractLazyQueryHookResult = ReturnType<typeof useGetSingleContractLazyQuery>;
export type GetSingleContractQueryResult = Apollo.QueryResult<GetSingleContractQuery, GetSingleContractQueryVariables>;