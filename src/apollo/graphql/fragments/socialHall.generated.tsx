/* eslint-disable */
import * as Types from '../../generated/types';

import { gql } from '@apollo/client';
import { UserBasicOutputFragmentDoc } from './userBasicOutput.generated';
import { SkillFragmentDoc } from './skill.generated';
export type SocialHallFragment = { __typename?: 'SocialHall', _id: string, name?: string | null, type?: Types.SocialHallType | null, startTime?: any | null, endTime?: any | null, eventId?: string | null, chamberId?: string | null, isActive: boolean, ownerUserId?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, hosts?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null> | null, attendees?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null> | null };

export type SocialHallAttendeeFragment = { __typename?: 'SocialHallAttendee', _id: string, socialHallId: string, isHost?: boolean | null, hallGroupId?: string | null, rtmToken?: string | null, waitingRoomChannelName?: string | null, eventRole?: { __typename?: 'CurrentUser', userRole?: Types.UserRole | null } | null, attendeeId?: { __typename?: 'UserOutput', bio?: string | null, _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, skills?: Array<{ __typename?: 'Skill', _id: string, name: string, icon: string } | null> | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null };

export type SocialHallGroupFragment = { __typename?: 'SocialGroup', _id: string, token?: string | null, name?: string | null, channelName?: string | null, topic?: Array<string | null> | null, startTime?: any | null, socialHallId?: string | null, raiseHands?: Array<string | null> | null, hosts?: Array<string | null> | null, rtmToken?: string | null, speakers?: Array<string | null> | null, users?: Array<{ __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null> | null, invitedAsSpeakers?: Array<{ __typename?: 'SpeakerInvitation', invitee?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null, inviter?: { __typename?: 'UserOutput', _id: string, firstName?: string | null, lastName?: string | null, middleName?: string | null, username?: string | null, title?: string | null, phone?: string | null, email?: string | null, userStatus?: string | null, status?: string | null, userType?: Types.NoumenaUserType | null, profile?: { __typename?: 'ProfileOutput', _id?: string | null, profilePicture?: string | null, profilePictureThumbnail?: string | null, socialLinks?: Array<{ __typename?: 'SocialLink', name?: string | null, link?: string | null } | null> | null } | null, chamber?: { __typename?: 'ChamberByUserIdRef', userId?: string | null, _id?: string | null } | null } | null } | null> | null };

export const SocialHallFragmentDoc = gql`
    fragment SocialHall on SocialHall {
  _id
  ownerUserId {
    ...UserBasicOutput
  }
  name
  type
  startTime
  endTime
  hosts {
    ...UserBasicOutput
  }
  attendees {
    ...UserBasicOutput
  }
  eventId
  chamberId
  isActive
}
    ${UserBasicOutputFragmentDoc}`;
export const SocialHallAttendeeFragmentDoc = gql`
    fragment SocialHallAttendee on SocialHallAttendee {
  _id
  socialHallId
  isHost
  hallGroupId
  eventRole {
    userRole
  }
  attendeeId {
    ...UserBasicOutput
    skills {
      ...Skill
    }
    bio
  }
  rtmToken
  waitingRoomChannelName
}
    ${UserBasicOutputFragmentDoc}
${SkillFragmentDoc}`;
export const SocialHallGroupFragmentDoc = gql`
    fragment SocialHallGroup on SocialGroup {
  _id
  token
  name
  channelName
  topic
  startTime
  socialHallId
  raiseHands
  hosts
  rtmToken
  users {
    ...UserBasicOutput
  }
  invitedAsSpeakers {
    invitee {
      ...UserBasicOutput
    }
    inviter {
      ...UserBasicOutput
    }
  }
  speakers
}
    ${UserBasicOutputFragmentDoc}`;