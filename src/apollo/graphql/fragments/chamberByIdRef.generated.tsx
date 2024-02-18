/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { ThemeOutputFragmentDoc } from './themeOutput.generated';
import { UserBasicOutputFragmentDoc } from './userBasicOutput.generated';
export type ChamberByIdRefFragment = { __typename?: 'ChamberByIdRef', _id: string, name?: string | null, fonts?: any | null, theme?: { __typename?: 'ThemeOutput', _id: string, name: string, colors?: { __typename?: 'ThemeColors', secondary?: any | null, primary?: any | null, gray?: any | null, success?: any | null, error?: any | null, miscColors?: any | null, noums?: { __typename?: 'NoumColors', investment?: any | null, project?: any | null, social?: any | null, special?: any | null, member?: any | null, story?: any | null } | null } | null } | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null };

export const ChamberByIdRefFragmentDoc = gql`
    fragment ChamberByIdRef on ChamberByIdRef {
  _id
  name
  theme {
    ...ThemeOutput
  }
  fonts
  uid {
    ...UserBasicOutput
  }
}
    ${ThemeOutputFragmentDoc}
${UserBasicOutputFragmentDoc}`;