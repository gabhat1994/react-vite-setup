/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { NoumContactFragmentDoc } from './noumContact.generated';
import { ContractSowTimelineFragmentDoc } from './contractSowTimeline.generated';
export type ContractFragment = { __typename?: 'Contract', _id: string, contractNumber: number, title?: string | null, status: Types.ContractStatus, templateName?: string | null, effectiveDate?: any | null, terminationNoticeInDays?: number | null, logo?: string | null, isCompleted: boolean, linkedNoum: { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null }, buyer?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, seller?: { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } } | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null, legalJurisdiction?: { __typename?: 'Jurisdiction', country?: string | null, state?: string | null, region?: string | null } | null, arbitrationJurisdiction?: { __typename?: 'Jurisdiction', country?: string | null, state?: string | null, region?: string | null } | null, timeline?: Array<{ __typename?: 'ContractSowTimeLine', timestamp: any, userId?: string | null, fromStatus?: string | null, toStatus: string }> | null };

export type ContractBasicFragment = { __typename?: 'Contract', _id: string, contractNumber: number, title?: string | null, status: Types.ContractStatus, effectiveDate?: any | null, isCompleted: boolean, buyer?: { __typename?: 'NoumContactOutput', _id: string, displayName: string } | null, seller?: { __typename?: 'NoumContactOutput', _id: string, displayName: string } | null, createdBy?: { __typename?: 'UserOutput', _id: string } | null };

export type NoumContractLinkedNoumBasicFragment = { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, profileImageThumbnail?: string | null };

export const NoumContractLinkedNoumBasicFragmentDoc = gql`
    fragment NoumContractLinkedNoumBasic on SpaceOutput {
  _id
  name
  profileImageThumbnail
}
    `;
export const ContractFragmentDoc = gql`
    fragment Contract on Contract {
  _id
  contractNumber
  title
  status
  linkedNoum {
    ...NoumContractLinkedNoumBasic
  }
  buyer {
    ...NoumContact
  }
  seller {
    ...NoumContact
  }
  createdBy {
    _id
  }
  templateName
  effectiveDate
  terminationNoticeInDays
  legalJurisdiction {
    country
    state
    region
  }
  arbitrationJurisdiction {
    country
    state
    region
  }
  logo
  timeline {
    ...ContractSowTimeline
  }
  isCompleted
}
    ${NoumContractLinkedNoumBasicFragmentDoc}
${NoumContactFragmentDoc}
${ContractSowTimelineFragmentDoc}`;
export const ContractBasicFragmentDoc = gql`
    fragment ContractBasic on Contract {
  _id
  contractNumber
  title
  status
  effectiveDate
  buyer {
    _id
    displayName
  }
  seller {
    _id
    displayName
  }
  createdBy {
    _id
  }
  isCompleted
}
    `;