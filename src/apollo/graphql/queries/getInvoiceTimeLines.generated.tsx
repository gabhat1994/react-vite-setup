/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { InvoiceTimelineOutputFragmentDoc } from '../fragments/InvoiceTimelineOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetInvoiceTimeLinesQueryVariables = Types.Exact<{
  invoiceId: Types.Scalars['ID'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
  offset?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetInvoiceTimeLinesQuery = { __typename?: 'Query', getInvoiceTimeLines?: { __typename?: 'InvoiceTimelinePaginationOutput', count: number, data?: Array<{ __typename?: 'InvoiceTimelineOutput', _id: string, invoiceId: string, paidAmount?: number | null, amount?: number | null, remainingAmount?: number | null, previousPaidAmount?: number | null, activityType: Types.InvoiceActivityType, dueDateFrom?: any | null, dueDateTo?: any | null, duplicatedFrom?: string | null, fromStatus?: Types.InvoiceStatusEnum | null, toStatus?: Types.InvoiceStatusEnum | null, createdAt: any, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, userStatus?: string | null } | null } | null> | null } | null };


export const GetInvoiceTimeLinesDocument = gql`
    query getInvoiceTimeLines($invoiceId: ID!, $limit: Int, $offset: Int) {
  getInvoiceTimeLines(invoiceId: $invoiceId, limit: $limit, offset: $offset) {
    data {
      ...InvoiceTimelineOutput
    }
    count
  }
}
    ${InvoiceTimelineOutputFragmentDoc}`;

/**
 * __useGetInvoiceTimeLinesQuery__
 *
 * To run a query within a React component, call `useGetInvoiceTimeLinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceTimeLinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceTimeLinesQuery({
 *   variables: {
 *      invoiceId: // value for 'invoiceId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetInvoiceTimeLinesQuery(baseOptions: Apollo.QueryHookOptions<GetInvoiceTimeLinesQuery, GetInvoiceTimeLinesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoiceTimeLinesQuery, GetInvoiceTimeLinesQueryVariables>(GetInvoiceTimeLinesDocument, options);
      }
export function useGetInvoiceTimeLinesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoiceTimeLinesQuery, GetInvoiceTimeLinesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoiceTimeLinesQuery, GetInvoiceTimeLinesQueryVariables>(GetInvoiceTimeLinesDocument, options);
        }
export type GetInvoiceTimeLinesQueryHookResult = ReturnType<typeof useGetInvoiceTimeLinesQuery>;
export type GetInvoiceTimeLinesLazyQueryHookResult = ReturnType<typeof useGetInvoiceTimeLinesLazyQuery>;
export type GetInvoiceTimeLinesQueryResult = Apollo.QueryResult<GetInvoiceTimeLinesQuery, GetInvoiceTimeLinesQueryVariables>;