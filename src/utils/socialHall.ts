import { pick } from 'lodash';
import { addMilliseconds, differenceInMilliseconds } from 'date-fns';
import { type UID } from '@/facade/agora';
import {
  MainEventStartTimer,
  ScreenShareUidPostFix,
} from '@/screens/SocialHall/const';
import {
  type Knock,
  KnockType,
  type Maybe,
  type UserOutput,
} from '@/apollo/generated/types';
import { KnockStatusEnum } from '@/features/socialHall/components/SideBar/types';
import { type RtmMessage, type RtmTextMessage } from '@/facade/agoraRTM';
import { type SubscriptionContent } from '@/screens/SocialHall/types';

export const SocialHallUtils = {
  getScreenShareUid: (uid: string | UID) => `${uid}_${ScreenShareUidPostFix}`,

  cleanScreenSharingUid: (uid: string | UID): string =>
    uid.toString().split('_')[0],

  isScreenShareFeed: (uid: string | UID) =>
    uid.toString().includes(ScreenShareUidPostFix),

  updateUsers: (
    isAddUsers: boolean,
    uid: UID | string,
    users: Array<UID | string>,
  ): Array<UID | string> => {
    if (isAddUsers) {
      return [...(users.includes(uid) ? users : [...users, uid])];
    }
    return users.filter((userId) => userId !== uid);
  },

  isUserInGroupCall: (
    attendeeId: string,
    users: Array<UserOutput>,
  ): boolean => {
    if (users && users.length) {
      return !!users.find((user) => user._id === attendeeId);
    }
    return false;
  },

  getKnockDetails: (
    knocks: Maybe<Knock>[],
    attendeeId: string,
  ): { status: KnockStatusEnum; knock?: Knock | null } => {
    let status: KnockStatusEnum = KnockStatusEnum.Normal;
    let knock: Knock | null = null;

    if (knocks.length) {
      const isUserIdMatched = (user: Knock) =>
        [user?.knockerUserId, user?.receiverUserId].includes(attendeeId);
      knock = knocks?.find((user) => isUserIdMatched(user!))!;

      if (
        knock?.receiverUser?._id &&
        knock?.knockStatus === KnockType.Pending
      ) {
        status = KnockStatusEnum.IsKnocking;
      } else if (
        knock?.knockerUser?._id &&
        knock?.knockStatus === KnockType.Pending
      ) {
        status = KnockStatusEnum.IsKnocked;
      }
    }
    return {
      status: status as KnockStatusEnum,
      knock,
    };
  },

  getGroupKnockDetails: (
    knocks: Maybe<Knock>[],
    attendeeId: string,
  ): { status: KnockStatusEnum; knock?: Knock | null } => {
    let status: KnockStatusEnum = KnockStatusEnum.Normal;
    let knock: Knock | null = null;
    if (knocks.length) {
      knock = knocks?.find(
        (user) => user?.knockerUserId === attendeeId && !user?.receiverUserId,
      )!;
      if (knock?.knockStatus === KnockType.Pending) {
        status = KnockStatusEnum.IsKnocking;
      } else if (knock?.knockStatus === KnockType.Accepted) {
        status = KnockStatusEnum.Accepted;
      }
    }
    return {
      status: status as KnockStatusEnum,
      knock,
    };
  },

  getUniqueDeclinedKnocks: (
    allKnocks: Maybe<Knock>[],
    declinedKnocks: Knock[],
  ): Array<Knock> => {
    const knocks: Array<Knock> = [];
    // Incase when there is only declined knocks
    if (!allKnocks.length && declinedKnocks.length) {
      return declinedKnocks;
    }

    allKnocks.forEach((knock) => {
      const declinedKnock = declinedKnocks.find(
        (decKnock) =>
          decKnock?._id === knock?._id &&
          decKnock.knockStatus !== knock.knockStatus,
      );
      if (declinedKnock) {
        knocks.push({ ...declinedKnock });
      } else {
        knocks.push(knock!);
      }
    });
    return knocks;
  },

  getEventTimeDifference: (
    date1: Date | string,
    date2: Date | string = new Date(),
  ): number => {
    const diff = differenceInMilliseconds(new Date(date1), new Date(date2));
    return diff < 0 ? 0 : diff;
  },

  getRemainingTimeForMainEventOrEndEvent: (
    eventLastUpdatedTime: string,
  ): number => {
    // Checks that events was last update before event actual start time.
    const mainEventTime = addMilliseconds(
      new Date(eventLastUpdatedTime),
      MainEventStartTimer,
    );
    return SocialHallUtils.getEventTimeDifference(mainEventTime, new Date());
  },

  getMedia: (url: string) =>
    ({
      getContentTemporaryUrl: async () => url,
      contentType: 'image/png',
      // eslint-disable-next-line
    } as any),

  getUserOutput: (user: UserOutput) => {
    const userkeys: Array<keyof UserOutput> = [
      '_id',
      'chamber',
      'firstName',
      'lastName',
      'profile',
      'title',
      'userStatus',
    ];
    return pick(user, userkeys);
  },

  mergeUserData: (
    activeGroupUsers: UserOutput[],
    user: UserOutput,
  ): UserOutput[] => {
    const users = [...activeGroupUsers];
    const index = users?.findIndex((usr) => usr?._id === user._id);
    if (index !== -1) {
      users[index] = user;
      return users;
    }
    return [...(users as UserOutput[]), user];
  },

  // We are using Agora Channel text message to broadcast Noumena specific event.
  // Incase internal event, we don't want to print it in the chat window.
  processSubscriptionMessage: (
    message: RtmMessage,
  ): SubscriptionContent | null => {
    let data = null;
    try {
      if (message.messageType === 'TEXT') {
        const msg = message as RtmTextMessage;
        data = JSON.parse(msg.text) as SubscriptionContent;
      }
    } catch (err) {
      // nothing to handle here
    }
    return data;
  },
};
