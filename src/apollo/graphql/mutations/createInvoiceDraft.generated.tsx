/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { InvoiceOutputFragmentDoc } from '../fragments/invoiceOutput.generated';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type CreateInvoiceDraftMutationVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.InvoiceDraftInput>;
}>;


export type CreateInvoiceDraftMutation = { __typename?: 'Mutation', createInvoiceDraft?: { __typename?: 'InvoiceOutput', id: string, invoiceNumber?: string | null, issueDate?: any | null, dueDate?: any | null, currency?: Types.AllCurrencyEnum | null, amount?: number | null, duplicatedFromInvoiceId?: string | null, duplicatedFromInvoiceNumber?: string | null, summary?: string | null, type?: string | null, notes?: string | null, paymentTerms?: Types.PaymentTerms | null, paymentDetails?: Types.PaymentDetails | null, lateFeeType?: Types.LateFeeType | null, lateFeeValue?: number | null, logoUrl?: string | null, status?: Types.InvoiceStatusEnum | null, invoiceURL?: string | null, noumId?: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImage?: string | null, projectType?: string | null, uid?: { __typename?: 'UserOutput', _id: string } | null } | null, invoiceFrom?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, invoiceTo?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, lineItems?: Array<{ __typename?: 'InvoiceLineItem', id: string, description: string, quantity: number, unitPrice: number, taxRate?: number | null, taxLabel?: string | null, currency: Types.AllCurrencyEnum, amount: number } | null> | null, taxLine?: Array<{ __typename?: 'InvoiceTaxLine', id: string, description: string, taxCode: number, currency: Types.AllCurrencyEnum, amount: number } | null> | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null } | null };


export const CreateInvoiceDraftDocument = gql`
    mutation createInvoiceDraft($input: InvoiceDraftInput) {
  createInvoiceDraft(input: $input) {
    ...InvoiceOutput
  }
}
    ${InvoiceOutputFragmentDoc}`;
export type CreateInvoiceDraftMutationFn = Apollo.MutationFunction<CreateInvoiceDraftMutation, CreateInvoiceDraftMutationVariables>;

/**
 * __useCreateInvoiceDraftMutation__
 *
 * To run a mutation, you first call `useCreateInvoiceDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInvoiceDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInvoiceDraftMutation, { data, loading, error }] = useCreateInvoiceDraftMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInvoiceDraftMutation(baseOptions?: Apollo.MutationHookOptions<CreateInvoiceDraftMutation, CreateInvoiceDraftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInvoiceDraftMutation, CreateInvoiceDraftMutationVariables>(CreateInvoiceDraftDocument, options);
      }
export type CreateInvoiceDraftMutationHookResult = ReturnType<typeof useCreateInvoiceDraftMutation>;
export type CreateInvoiceDraftMutationResult = Apollo.MutationResult<CreateInvoiceDraftMutation>;
export type CreateInvoiceDraftMutationOptions = Apollo.BaseMutationOptions<CreateInvoiceDraftMutation, CreateInvoiceDraftMutationVariables>;