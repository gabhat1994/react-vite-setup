/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { SowFragmentDoc } from '../fragments/sow.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetSingleSowQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetSingleSowQuery = { __typename?: 'Query', getSingleSOW?: { __typename?: 'SOW', _id: string, SOWNumber: number, status: Types.SowStatus, title?: string | null, scopeOfWork?: string | null, effectiveDate?: any | null, logo?: string | null, isCompleted: boolean, deliverables?: Array<{ __typename?: 'DeliverablesAndMilestones', title?: string | null, description?: string | null, dueDate?: any | null } | null> | null, milestones?: Array<{ __typename?: 'DeliverablesAndMilestones', title?: string | null, description?: string | null, dueDate?: any | null } | null> | null, commission?: Array<{ __typename?: 'CommissionAndReimbursement', description?: string | null, amount?: number | null } | null> | null, expenseReimbursement?: Array<{ __typename?: 'CommissionAndReimbursement', description?: string | null, amount?: number | null } | null> | null, fees?: { __typename?: 'FeesCategory', type?: Types.FeesCategoryTypes | null, feesData?: Array<{ __typename?: 'FeesInfo', description?: string | null, amount?: number | null, dueDate?: any | null } | null> | null } | null, linkedNoum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }, linkedContract?: { __typename?: 'Contract', status: Types.ContractStatus, contractNumber: number, isCompleted: boolean, _id: string, title?: string | null, effectiveDate?: any | null, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string, title?: string | null, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null } | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null, timeline?: Array<{ __typename?: 'ContractSowTimeLine', timestamp: any, userId?: string | null, fromStatus?: string | null, toStatus: string }> | null } | null };


export const GetSingleSowDocument = gql`
    query GetSingleSOW($id: ID!) {
  getSingleSOW(_id: $id) {
    ...SOW
  }
}
    ${SowFragmentDoc}`;

/**
 * __useGetSingleSowQuery__
 *
 * To run a query within a React component, call `useGetSingleSowQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleSowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleSowQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSingleSowQuery(baseOptions: Apollo.QueryHookOptions<GetSingleSowQuery, GetSingleSowQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSingleSowQuery, GetSingleSowQueryVariables>(GetSingleSowDocument, options);
      }
export function useGetSingleSowLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleSowQuery, GetSingleSowQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSingleSowQuery, GetSingleSowQueryVariables>(GetSingleSowDocument, options);
        }
export type GetSingleSowQueryHookResult = ReturnType<typeof useGetSingleSowQuery>;
export type GetSingleSowLazyQueryHookResult = ReturnType<typeof useGetSingleSowLazyQuery>;
export type GetSingleSowQueryResult = Apollo.QueryResult<GetSingleSowQuery, GetSingleSowQueryVariables>;