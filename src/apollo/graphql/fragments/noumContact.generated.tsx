/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type NoumContactBasicFragment = { __typename?: 'NoumContactOutput', _id: string, displayName: string, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } };

export type NoumContactFragment = { __typename?: 'NoumContactOutput', createdAt: any, isConnectedWithNoum: boolean, status: Types.NoumContactStatus, title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, ownerId: { __typename?: 'UserOutput', _id: string }, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } };

export type NoumContactSummaryFragment = { __typename?: 'NoumContactOutput', title?: string | null, companyName?: string | null, street?: string | null, city?: string | null, country?: string | null, zipCode?: string | null, state?: string | null, apartmentNo?: string | null, _id: string, displayName: string, userId: { __typename?: 'UserOutput', _id: string, userStatus?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } };

export type SearchableNoumContactFragment = { __typename?: 'SearchableNoumContact', _id: string, fullName?: string | null, displayName: string, email?: string | null, title?: string | null, companyName?: string | null, street?: string | null, status: Types.NoumContactStatus, apartmentNo?: string | null, city?: string | null, zipCode?: string | null, state?: string | null, country?: string | null, createdAt: any, isConnectedWithNoum: boolean, user: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null } };

export type NoumContactUserFragment = { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, userStatus?: string | null, email?: string | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePictureThumbnail?: string | null } | null };

export const NoumContactBasicFragmentDoc = gql`
    fragment NoumContactBasic on NoumContactOutput {
  _id
  displayName
  userId {
    _id
    userStatus
    profile {
      _id
      profilePictureThumbnail
    }
  }
}
    `;
export const NoumContactUserFragmentDoc = gql`
    fragment NoumContactUser on UserOutput {
  _id
  firstName
  lastName
  userStatus
  email
  profile {
    _id
    profilePictureThumbnail
  }
}
    `;
export const NoumContactSummaryFragmentDoc = gql`
    fragment NoumContactSummary on NoumContactOutput {
  ...NoumContactBasic
  title
  companyName
  street
  city
  country
  zipCode
  state
  apartmentNo
  country
  userId {
    ...NoumContactUser
  }
}
    ${NoumContactBasicFragmentDoc}
${NoumContactUserFragmentDoc}`;
export const NoumContactFragmentDoc = gql`
    fragment NoumContact on NoumContactOutput {
  ...NoumContactSummary
  createdAt
  isConnectedWithNoum
  status
  ownerId {
    _id
  }
}
    ${NoumContactSummaryFragmentDoc}`;
export const SearchableNoumContactFragmentDoc = gql`
    fragment SearchableNoumContact on SearchableNoumContact {
  _id
  fullName
  displayName
  email
  title
  companyName
  street
  status
  apartmentNo
  city
  zipCode
  state
  country
  createdAt
  isConnectedWithNoum
  user {
    ...NoumContactUser
  }
}
    ${NoumContactUserFragmentDoc}`;