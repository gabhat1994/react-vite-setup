/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type LinkedNoumFragment = { __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, profileImage?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, connectionId?: string | null, projectType?: string | null, connectionsCount?: number | null, createdAt?: any | null, link?: { __typename?: 'NoumLink', _id: string, status: Types.NoumLinkStatus, linkedNoumsCount: number } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, members?: { __typename?: 'PaginatedNoumMembers', count: number } | null };

export type SpaceConnectedMembersCountFragment = { __typename?: 'SpaceOutput', members?: { __typename?: 'PaginatedNoumMembers', count: number } | null };

export const SpaceConnectedMembersCountFragmentDoc = gql`
    fragment SpaceConnectedMembersCount on SpaceOutput {
  members(input: {statuses: CONNECTED}) {
    count
  }
}
    `;
export const LinkedNoumFragmentDoc = gql`
    fragment LinkedNoum on SpaceOutput {
  _id
  name
  title
  profileImage
  type
  permission
  followersCount
  connectionId
  projectType
  link {
    _id
    status
    linkedNoumsCount
  }
  category {
    _id
    name
  }
  connectionsCount
  createdAt
  ...SpaceConnectedMembersCount
}
    ${SpaceConnectedMembersCountFragmentDoc}`;