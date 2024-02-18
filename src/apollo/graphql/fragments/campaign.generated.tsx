/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type NoumCardFragment = { __typename?: 'SpaceOutput', profileImage?: string | null, name?: string | null, projectType?: string | null };

export type NoumDropDownListFragment = { __typename?: 'SpaceOutput', _id?: string | null, profileImage?: string | null, name?: string | null, projectType?: string | null };

export type CampaignOfferBasicFragment = { __typename?: 'AdCampaignOutput', title?: string | null, adId?: string | null, startDate?: any | null, audience?: { __typename?: 'AdCampaignAudienceOutput', category?: Array<string | null> | null, targetLocation?: Array<string | null> | null, targetLanguage?: Array<string | null> | null } | null, noumId?: { __typename?: 'SpaceOutput', profileImage?: string | null, name?: string | null, projectType?: string | null } | null };

export type CampaignBasicFragment = { __typename?: 'AdCampaignOutput', _id?: string | null, title?: string | null, status?: string | null, startDate?: any | null, endDate?: any | null, noumId?: { __typename?: 'SpaceOutput', _id?: string | null, profileImage?: string | null, name?: string | null, projectType?: string | null } | null };

export type CampaignSummaryFragment = { __typename?: 'AdCampaignOutput', adId?: string | null, goals?: Array<string | null> | null, otherGoals?: string | null, budgetType?: string | null, budgetAmount?: number | null, _id?: string | null, title?: string | null, status?: string | null, startDate?: any | null, endDate?: any | null, audience?: { __typename?: 'AdCampaignAudienceOutput', targetLocation?: Array<string | null> | null, targetLanguage?: Array<string | null> | null, category?: Array<string | null> | null } | null, noumId?: { __typename?: 'SpaceOutput', _id?: string | null, profileImage?: string | null, name?: string | null, projectType?: string | null } | null };

export type CampaignReportForCampaignSummaryFragment = { __typename?: 'AdCampaignReportOutput', _id?: string | null, reportId?: string | null, createdAt?: any | null, reportDate?: any | null };

export type MetricsFragment = { __typename?: 'AdCampaignReportMetricsOutput', clicks?: number | null, impressions?: number | null, ctr?: number | null, avgCPC?: number | null, cost?: number | null };

export type CampaignReportFragment = { __typename?: 'AdCampaignReportOutput', clientMessage?: string | null, _id?: string | null, reportId?: string | null, createdAt?: any | null, reportDate?: any | null, metrics?: { __typename?: 'AdCampaignReportMetricsOutput', clicks?: number | null, impressions?: number | null, ctr?: number | null, avgCPC?: number | null, cost?: number | null } | null, createdBy?: { __typename?: 'UserOutput', firstName?: string | null, lastName?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null } | null } | null };

export type CampaignAccountFragment = { __typename?: 'CampaignAccountOutput', id: string, accountName?: string | null, customerName?: string | null, walletName?: string | null, accountType?: Types.AccountType | null, maskAccountNumber?: string | null, primary?: boolean | null };

export type SpaceForNoumAdsFragment = { __typename?: 'SpaceOutput', name?: string | null, description?: string | null, slug?: string | null, enableAds?: boolean | null, keywords?: Array<string | null> | null };

export const NoumCardFragmentDoc = gql`
    fragment NoumCard on SpaceOutput {
  profileImage
  name
  projectType
}
    `;
export const CampaignOfferBasicFragmentDoc = gql`
    fragment CampaignOfferBasic on AdCampaignOutput {
  title
  adId
  audience {
    category
    targetLocation
    targetLanguage
  }
  startDate
  noumId {
    ...NoumCard
  }
}
    ${NoumCardFragmentDoc}`;
export const NoumDropDownListFragmentDoc = gql`
    fragment NoumDropDownList on SpaceOutput {
  _id
  ...NoumCard
}
    ${NoumCardFragmentDoc}`;
export const CampaignBasicFragmentDoc = gql`
    fragment CampaignBasic on AdCampaignOutput {
  _id
  title
  status
  startDate
  endDate
  noumId {
    ...NoumDropDownList
  }
}
    ${NoumDropDownListFragmentDoc}`;
export const CampaignSummaryFragmentDoc = gql`
    fragment CampaignSummary on AdCampaignOutput {
  ...CampaignBasic
  adId
  goals
  otherGoals
  audience {
    targetLocation
    targetLanguage
    category
  }
  budgetType
  budgetAmount
}
    ${CampaignBasicFragmentDoc}`;
export const CampaignReportForCampaignSummaryFragmentDoc = gql`
    fragment CampaignReportForCampaignSummary on AdCampaignReportOutput {
  _id
  reportId
  createdAt
  reportDate
}
    `;
export const MetricsFragmentDoc = gql`
    fragment Metrics on AdCampaignReportMetricsOutput {
  clicks
  impressions
  ctr
  avgCPC
  cost
}
    `;
export const CampaignReportFragmentDoc = gql`
    fragment CampaignReport on AdCampaignReportOutput {
  ...CampaignReportForCampaignSummary
  clientMessage
  metrics {
    ...Metrics
  }
  createdBy {
    firstName
    lastName
    profile {
      profilePicture
    }
  }
}
    ${CampaignReportForCampaignSummaryFragmentDoc}
${MetricsFragmentDoc}`;
export const CampaignAccountFragmentDoc = gql`
    fragment CampaignAccount on CampaignAccountOutput {
  id
  accountName
  customerName
  walletName
  accountType
  maskAccountNumber
  primary
}
    `;
export const SpaceForNoumAdsFragmentDoc = gql`
    fragment SpaceForNoumAds on SpaceOutput {
  name
  description
  slug
  enableAds
  keywords
}
    `;