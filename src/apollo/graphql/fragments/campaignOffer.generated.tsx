/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type CampaignOfferFragment = { __typename?: 'AdCampaignOffer', _id: string, startAt?: any | null, costTotal?: number | null, costWeekly?: number | null, clicksWeekly?: number | null, cpc?: number | null, reachTotal?: number | null, status: Types.EnumAdCampaignOfferStatus, createdAt: any, message?: string | null, updatedAt: any, endAt?: any | null, oid: number, createdBy?: { __typename?: 'UserOutput', firstName?: string | null, lastName?: string | null, profile?: { __typename?: 'ProfileOutput', profilePicture?: string | null } | null } | null, goalNoumVisibility?: { __typename?: 'AdCampaignOfferGoalsNoumVisibility', currentViews?: number | null, predictedViews?: number | null } | null, goalConnectedUsers?: { __typename?: 'AdCampaignOfferGoalsConnectedUsers', currentUsers?: number | null, predictedUsers?: number | null, currentFollowers?: number | null, predictedFollowers?: number | null } | null };

export const CampaignOfferFragmentDoc = gql`
    fragment CampaignOffer on AdCampaignOffer {
  _id
  startAt
  costTotal
  costWeekly
  clicksWeekly
  cpc
  reachTotal
  status
  createdAt
  message
  updatedAt
  startAt
  endAt
  oid
  createdBy {
    firstName
    lastName
    profile {
      profilePicture
    }
  }
  goalNoumVisibility {
    currentViews
    predictedViews
  }
  goalConnectedUsers {
    currentUsers
    predictedUsers
    currentFollowers
    predictedFollowers
  }
}
    `;