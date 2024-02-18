/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { InvoiceOutputFragmentDoc } from '../fragments/invoiceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetInvoiceListQueryVariables = Types.Exact<{
  filter: Types.InvoiceQueryInput;
}>;


export type GetInvoiceListQuery = { __typename?: 'Query', getInvoiceList?: { __typename?: 'InvoiceList', count: number, data?: Array<{ __typename?: 'InvoiceOutput', id: string, invoiceNumber?: string | null, issueDate?: any | null, dueDate?: any | null, currency?: Types.AllCurrencyEnum | null, amount?: number | null, duplicatedFromInvoiceId?: string | null, duplicatedFromInvoiceNumber?: string | null, summary?: string | null, type?: string | null, notes?: string | null, paymentTerms?: Types.PaymentTerms | null, paymentDetails?: Types.PaymentDetails | null, lateFeeType?: Types.LateFeeType | null, lateFeeValue?: number | null, logoUrl?: string | null, status?: Types.InvoiceStatusEnum | null, invoiceURL?: string | null, noumId?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImage?: string | null, projectType?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null } | null, invoiceFrom?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, invoiceTo?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, lineItems?: Array<{ __typename?: 'InvoiceLineItem', id: string, description: string, quantity: number, unitPrice: number, taxRate?: number | null, taxLabel?: string | null, currency: Types.AllCurrencyEnum, amount: number } | null> | null, taxLine?: Array<{ __typename?: 'InvoiceTaxLine', id: string, description: string, taxCode: number, currency: Types.AllCurrencyEnum, amount: number } | null> | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null } | null> | null } | null };


export const GetInvoiceListDocument = gql`
    query getInvoiceList($filter: InvoiceQueryInput!) {
  getInvoiceList(filter: $filter) {
    data {
      ...InvoiceOutput
    }
    count
  }
}
    ${InvoiceOutputFragmentDoc}`;

/**
 * __useGetInvoiceListQuery__
 *
 * To run a query within a React component, call `useGetInvoiceListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetInvoiceListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetInvoiceListQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetInvoiceListQuery(baseOptions: Apollo.QueryHookOptions<GetInvoiceListQuery, GetInvoiceListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetInvoiceListQuery, GetInvoiceListQueryVariables>(GetInvoiceListDocument, options);
      }
export function useGetInvoiceListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetInvoiceListQuery, GetInvoiceListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetInvoiceListQuery, GetInvoiceListQueryVariables>(GetInvoiceListDocument, options);
        }
export type GetInvoiceListQueryHookResult = ReturnType<typeof useGetInvoiceListQuery>;
export type GetInvoiceListLazyQueryHookResult = ReturnType<typeof useGetInvoiceListLazyQuery>;
export type GetInvoiceListQueryResult = Apollo.QueryResult<GetInvoiceListQuery, GetInvoiceListQueryVariables>;