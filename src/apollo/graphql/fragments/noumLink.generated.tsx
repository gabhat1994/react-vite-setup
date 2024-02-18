/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { LinkedNoumFragmentDoc } from './linkedNoum.generated';
export type NoumLinkFragment = { __typename?: 'NoumLink', _id: string, linkedNoumsCount: number, status: Types.NoumLinkStatus, followersCount: number, projectType: Types.ProjectChamberType, linkedAt: any, connectionsCount: number, linkedNoums: Array<{ __typename?: 'SpaceOutput', _id?: string | null, name?: string | null, title?: string | null, profileImage?: string | null, type?: string | null, permission?: string | null, followersCount?: number | null, connectionId?: string | null, projectType?: string | null, connectionsCount?: number | null, createdAt?: any | null, link?: { __typename?: 'NoumLink', _id: string, status: Types.NoumLinkStatus, linkedNoumsCount: number } | null, category?: { __typename?: 'ProjectChamberCategory', _id: string, name: string } | null, members?: { __typename?: 'PaginatedNoumMembers', count: number } | null } | null> };

export const NoumLinkFragmentDoc = gql`
    fragment NoumLink on NoumLink {
  _id
  linkedNoums {
    ...LinkedNoum
  }
  linkedNoumsCount
  status
  followersCount
  projectType
  linkedAt
  connectionsCount
}
    ${LinkedNoumFragmentDoc}`;