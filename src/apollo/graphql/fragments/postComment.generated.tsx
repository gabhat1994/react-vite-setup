/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { UserBasicOutputFragmentDoc } from './userBasicOutput.generated';
import { ThreadOutputFragmentDoc } from './threadOutput.generated';
export type PostCommentFragment = { __typename?: 'Comments', _id: string, content?: string | null, createdAt?: any | null, updatedAt?: any | null, replies?: { __typename?: 'ReplyOutput', total?: number | null, firstReply?: { __typename?: 'ThreadOutput', _id?: string | null, content?: string | null, createdAt?: any | null, tags?: Array<{ __typename?: 'TagsOutput', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, userIdList?: Array<{ __typename?: 'ThreadUser', _id?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, tags?: Array<{ __typename?: 'TagsOutput', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null };

export type CommentOutputFragment = { __typename?: 'CommentOutput', _id: string, content?: string | null, createdAt?: any | null, updatedAt?: any | null, replies?: { __typename?: 'ReplyOutput', total?: number | null, firstReply?: { __typename?: 'ThreadOutput', _id?: string | null, content?: string | null, createdAt?: any | null, tags?: Array<{ __typename?: 'TagsOutput', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, userIdList?: Array<{ __typename?: 'ThreadUser', _id?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null } | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, tags?: Array<{ __typename?: 'TagsOutput', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null };

export type ReplyOutputFragment = { __typename?: 'ReplyOutput', total?: number | null, firstReply?: { __typename?: 'ThreadOutput', _id?: string | null, content?: string | null, createdAt?: any | null, tags?: Array<{ __typename?: 'TagsOutput', uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null, uid?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null, userIdList?: Array<{ __typename?: 'ThreadUser', _id?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null };

export const ReplyOutputFragmentDoc = gql`
    fragment ReplyOutput on ReplyOutput {
  total
  firstReply {
    ...ThreadOutput
  }
  total
  userIdList {
    _id {
      ...UserBasicOutput
    }
  }
}
    ${ThreadOutputFragmentDoc}
${UserBasicOutputFragmentDoc}`;
export const PostCommentFragmentDoc = gql`
    fragment PostComment on Comments {
  _id
  content
  createdAt
  replies {
    ...ReplyOutput
  }
  uid {
    ...UserBasicOutput
  }
  updatedAt
  tags {
    uid {
      ...UserBasicOutput
    }
  }
}
    ${ReplyOutputFragmentDoc}
${UserBasicOutputFragmentDoc}`;
export const CommentOutputFragmentDoc = gql`
    fragment CommentOutput on CommentOutput {
  _id
  content
  createdAt
  replies {
    ...ReplyOutput
  }
  uid {
    ...UserBasicOutput
  }
  updatedAt
  tags {
    uid {
      ...UserBasicOutput
    }
  }
}
    ${ReplyOutputFragmentDoc}
${UserBasicOutputFragmentDoc}`;