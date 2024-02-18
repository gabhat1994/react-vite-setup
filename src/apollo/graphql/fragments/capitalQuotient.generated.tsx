/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type NoumenaScoreFragment = { __typename?: 'NoumenaScoreOutput', status?: string | null, visibility?: string | null, capitalQuotient?: string | null };

export type CqFormFragment = { __typename?: 'CQForm', details?: any | null, formId?: string | null, status?: string | null };

export type CqFormOutputFragment = { __typename?: 'CQFormOutput', updatedAt?: string | null, status?: string | null, forms?: Array<{ __typename?: 'CQForm', details?: any | null, formId?: string | null, status?: string | null } | null> | null };

export const NoumenaScoreFragmentDoc = gql`
    fragment NoumenaScore on NoumenaScoreOutput {
  status
  visibility
  capitalQuotient
}
    `;
export const CqFormFragmentDoc = gql`
    fragment CQForm on CQForm {
  details
  formId
  status
}
    `;
export const CqFormOutputFragmentDoc = gql`
    fragment CQFormOutput on CQFormOutput {
  updatedAt
  status
  forms {
    ...CQForm
  }
}
    ${CqFormFragmentDoc}`;