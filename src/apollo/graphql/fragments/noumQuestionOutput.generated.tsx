/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
export type QuestionAnswerUserFragment = { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null };

export type TipOutputFragment = { __typename?: 'TipOutput', amount?: number | null, tipBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null };

export type AnswerOutputFragment = { __typename?: 'AnswerOutput', _id?: string | null, body?: string | null, spaceId?: string | null, createdAt?: any | null, updatedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null, tipDetails?: Array<{ __typename?: 'TipOutput', amount?: number | null, tipBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null }> | null };

export type NoumQuestionOutputFragment = { __typename?: 'NoumQuestionOutput', _id?: string | null, body?: string | null, questionImage?: string | null, expiryDate?: any | null, createdAt?: any | null, updatedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null, spaceId?: { __typename?: 'SpaceOutput', _id?: string | null } | null, answers?: Array<{ __typename?: 'AnswerOutput', _id?: string | null, body?: string | null, spaceId?: string | null, createdAt?: any | null, updatedAt?: any | null, user?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null, tipDetails?: Array<{ __typename?: 'TipOutput', amount?: number | null, tipBy?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, middleName?: string | null, lastName?: string | null, userStatus?: string | null, profile?: { __typename?: 'ProfileOutput', profilePictureThumbnail?: string | null, profilePicture?: string | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', _id?: string | null, userId?: string | null } | null } | null }> | null } | null> | null };

export const QuestionAnswerUserFragmentDoc = gql`
    fragment QuestionAnswerUser on UserOutput {
  _id
  firstName
  middleName
  lastName
  profile {
    profilePictureThumbnail
    profilePicture
  }
  chamber {
    _id
    userId
  }
  userStatus
}
    `;
export const TipOutputFragmentDoc = gql`
    fragment TipOutput on TipOutput {
  amount
  tipBy {
    ...QuestionAnswerUser
  }
}
    ${QuestionAnswerUserFragmentDoc}`;
export const AnswerOutputFragmentDoc = gql`
    fragment AnswerOutput on AnswerOutput {
  _id
  user {
    ...QuestionAnswerUser
  }
  body
  spaceId
  tipDetails {
    ...TipOutput
  }
  createdAt
  updatedAt
}
    ${QuestionAnswerUserFragmentDoc}
${TipOutputFragmentDoc}`;
export const NoumQuestionOutputFragmentDoc = gql`
    fragment NoumQuestionOutput on NoumQuestionOutput {
  _id
  body
  questionImage
  expiryDate
  user {
    ...QuestionAnswerUser
  }
  spaceId {
    _id
  }
  createdAt
  updatedAt
  answers {
    ...AnswerOutput
  }
}
    ${QuestionAnswerUserFragmentDoc}
${AnswerOutputFragmentDoc}`;