/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type NoumFileFragment = { __typename?: 'NoumFile', _id: string, name: string, description?: string | null, extension?: string | null, fileUrl?: string | null, downloadsCount: number, viewsCount: number, uploadedAt: any, updatedAt?: any | null, visibilityRoles: Array<string>, status: Types.NoumFileStatus, fileSize: number, owner?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, userStatus?: string | null } | null };

export const NoumFileFragmentDoc = gql`
    fragment NoumFile on NoumFile {
  _id
  owner {
    _id
    firstName
    lastName
    middleName
    userStatus
  }
  name
  description
  extension
  fileUrl
  downloadsCount
  viewsCount
  uploadedAt
  updatedAt
  visibilityRoles
  status
  fileSize
}
    `;