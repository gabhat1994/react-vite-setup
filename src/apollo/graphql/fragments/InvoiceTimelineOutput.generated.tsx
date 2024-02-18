/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type InvoiceTimelineOutputFragment = { __typename?: 'InvoiceTimelineOutput', _id: string, invoiceId: string, paidAmount?: number | null, amount?: number | null, remainingAmount?: number | null, previousPaidAmount?: number | null, activityType: Types.InvoiceActivityType, dueDateFrom?: any | null, dueDateTo?: any | null, duplicatedFrom?: string | null, fromStatus?: Types.InvoiceStatusEnum | null, toStatus?: Types.InvoiceStatusEnum | null, createdAt: any, userId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, userStatus?: string | null } | null };

export const InvoiceTimelineOutputFragmentDoc = gql`
    fragment InvoiceTimelineOutput on InvoiceTimelineOutput {
  _id
  invoiceId
  paidAmount
  amount
  remainingAmount
  previousPaidAmount
  activityType
  dueDateFrom
  dueDateTo
  duplicatedFrom
  fromStatus
  toStatus
  userId {
    _id
    firstName
    lastName
    middleName
    userStatus
  }
  createdAt
}
    `;