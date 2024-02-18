import { isEqual, orderBy } from 'lodash';
import { type Message, type Participant } from '@twilio/conversations';
import { type DocumentNode } from 'graphql';
import { t } from 'i18next';
import { imageTypesArr, videoTypesArr } from '@/constants/fileTypes';
import {
  type BasicConversationItem,
  type NoumGroupConversationItem,
  type UserStatus,
} from '@/apollo/generated/types';
import {
  GetConversationsDocument,
  GetHomeSpaceConversationsDocument,
  GetSpaceConversationsAsAdminQueryDocument,
  GetSpaceConversationsDocument,
} from '@/apollo/graphql';
import { cleanList } from '@/utils/list';
import { type Maybe } from '@/common/types';
import { breakpoints } from '@/constants/devices';
import { TSpan } from '@/components/Typography';
import {
  CONVERSATION_PAGINATION_LIMIT_S,
  CREAT_CONVERSATION_WITH_HOME_OWNER,
} from '@/constants/conversation';
import { UserUtil } from '@/utils/user';
import { EXAMPLE_CONVERSATION_ID } from '@/features/conversation/hooks/noumMessages/useExampleConversation';
import {
  type ConversationOutputFragment,
  type UserBasicOutputFragment,
} from '@/apollo/graphql/fragments';
import {
  type MessageAttributes,
  type MessageStatus,
  type ParticipantAttributes,
  type PendingMessage,
  type ConversationQuery,
  ConversationType,
  type ConversationQueryType,
  type UserData,
} from './types';

export function isGlobalType(conversationType: ConversationType) {
  return conversationType.includes('global');
}

export function getMessageItemMaxLength(
  conversationType: ConversationType,
  containerWidth: number,
) {
  const isGlobal = isGlobalType(conversationType);
  if (!isGlobal || containerWidth < breakpoints.MOBILE_M) {
    return undefined;
  }

  const maxWidth = Math.ceil(containerWidth);
  return `${maxWidth < 100 ? maxWidth : 600}px`;
}

export function mapToUserData(user: UserBasicOutputFragment): UserData {
  const isUserInactive = UserUtil.isInactive(user);

  return {
    _id: user._id,
    firstName: isUserInactive ? t('noumena.inactive') : user.firstName,
    lastName: isUserInactive ? t('noumena.user') : user.lastName,
    username: isUserInactive ? null : UserUtil.renderUsername(user.username),
    userStatus: user.userStatus as UserStatus,
    title: isUserInactive ? null : user.title,
    source: isUserInactive ? null : UserUtil.getProfilePicture(user),
    homeNoumId: user.chamber?._id,
    placeholder: isUserInactive,
  };
}

export function getMessageDateCreated(message: Message | PendingMessage) {
  return (
    (message.attributes as MessageAttributes)?.dateCreatedTimestamp ||
    message.dateCreated
  );
}

export function getMediaType(contentType: string) {
  if (imageTypesArr.includes(contentType)) return 'image';
  if (videoTypesArr.includes(contentType)) return 'video';
  return 'unknown';
}

export function isPendingMessage(
  message: Message | PendingMessage,
): message is PendingMessage {
  return (message as PendingMessage)?.send !== undefined;
}

export function getFileFromPendingMessage(
  message: PendingMessage,
): File | undefined {
  const [, formData] = message.mediaContent?.[0] || [];
  return formData?.get('file') as File | undefined;
}

export async function loadImageFromFile(
  file: File,
): Promise<{ width: number; height: number }> {
  const img = new Image();
  const objectUrl = URL.createObjectURL(file);

  img.src = objectUrl;

  return new Promise((resolve) => {
    img.onload = async () => {
      resolve({ width: img.width, height: img.height });

      URL.revokeObjectURL(objectUrl);
    };
  });
}

export function getNextOrPrevMessage(
  messages: (Message | PendingMessage)[],
  index: number,
  direction: 'next' | 'prev',
): Message | undefined {
  const message =
    direction === 'next' ? messages[index + 1] : messages[index - 1];

  if (!message) return undefined;

  if (!isPendingMessage(message)) {
    return message;
  }
  return direction === 'next'
    ? getNextOrPrevMessage(messages, index + 1, direction)
    : getNextOrPrevMessage(messages, index - 1, direction);
}

export function getNextSameTypeMessage(
  currentUserId: string,
  messages: (Message | PendingMessage)[],
  index: number,
  step: number = 1,
): Message | PendingMessage | undefined {
  const message = messages[index];
  const nextMessage = messages[index + step];
  if (!nextMessage) return undefined;

  if (
    (message.author === currentUserId &&
      nextMessage.author === currentUserId) ||
    (message.author !== currentUserId && nextMessage.author !== currentUserId)
  ) {
    return nextMessage;
  }

  return getNextSameTypeMessage(currentUserId, messages, index, step + 1);
}

export function isShowMessageStatus(
  currentStatus?: MessageStatus,
  nextStatus?: MessageStatus,
  sameTypeNextStatus?: MessageStatus,
) {
  if (currentStatus?.status !== 'sending' && currentStatus?.status !== 'failed')
    return (
      (currentStatus?.status !== nextStatus?.status ||
        !isEqual(
          currentStatus?.readers?.sort(),
          nextStatus?.readers?.sort(),
        )) &&
      (currentStatus?.status !== sameTypeNextStatus?.status ||
        !isEqual(
          currentStatus?.readers?.sort(),
          sameTypeNextStatus?.readers?.sort(),
        ))
    );
  return true;
}

export function isNoumParticipant(participant: Participant): boolean {
  const attributes = participant!.attributes as ParticipantAttributes;

  if (
    attributes &&
    attributes.role === 'owner' &&
    attributes.permission === 'read-only'
  ) {
    return false;
  }

  return true;
}

export const ConversationListDocuments: {
  [key in ConversationType]: DocumentNode;
} = {
  [ConversationType.GLOBAL_ALL]: GetConversationsDocument,
  [ConversationType.GLOBAL_DIRECT]: GetConversationsDocument,
  [ConversationType.GLOBAL_NOUM]: GetConversationsDocument,
  [ConversationType.HOME_OWNER]: GetHomeSpaceConversationsDocument,
  [ConversationType.HOME_USER]: GetHomeSpaceConversationsDocument,
  [ConversationType.PROJECT_OWNER]: GetSpaceConversationsAsAdminQueryDocument,
  [ConversationType.PROJECT_OWNER_OTHERS]:
    GetSpaceConversationsAsAdminQueryDocument,
  [ConversationType.PROJECT_USER]: GetSpaceConversationsDocument,
};

export const extractConversationOutputs = (
  conversationType: ConversationType,
  data?: ConversationQuery,
): {
  privateConversation?: ConversationOutputFragment | null;
  conversations:
    | ConversationOutputFragment[]
    | (BasicConversationItem | NoumGroupConversationItem)[];
  totalCount: number;
  unreadCount: number;
} => {
  let result;
  switch (conversationType) {
    case ConversationType.HOME_OWNER: {
      const homeSpaceConversations = (
        data as ConversationQueryType[typeof conversationType] | undefined
      )?.getHomeSpaceConversations;
      result = {
        conversations: orderBy(
          cleanList(homeSpaceConversations?.userConversations || []),
          'updatedAt',
          'desc',
        ),
        totalCount: homeSpaceConversations?.userConversationsCount || 0,
        unreadCount:
          homeSpaceConversations?.userAllConversationUnreadMessageCount || 0,
      };
      break;
    }
    case ConversationType.HOME_USER: {
      const homeSpaceConversations = (
        data as ConversationQueryType[typeof conversationType] | undefined
      )?.getHomeSpaceConversations;
      const privateConversations =
        homeSpaceConversations?.privateConversation || [];
      result = {
        privateConversation: privateConversations?.[0] || null,
        conversations: orderBy(
          cleanList(homeSpaceConversations?.groupConversations || []),
          'updatedAt',
          'desc',
        ),
        totalCount:
          (homeSpaceConversations?.groupConversationsCount || 0) +
          (homeSpaceConversations?.privateConversationCount || 0),
        unreadCount:
          homeSpaceConversations?.userAllConversationUnreadMessageCount || 0,
      };
      break;
    }
    case ConversationType.PROJECT_OWNER:
    case ConversationType.PROJECT_OWNER_OTHERS: {
      const ownerSpaceConversations = (
        data as ConversationQueryType[typeof conversationType] | undefined
      )?.getSpaceConversationsAsAdminQuery;
      result = {
        conversations: orderBy(
          cleanList(ownerSpaceConversations?.data || []),
          'updatedAt',
          'desc',
        ),
        totalCount: ownerSpaceConversations?.count || 0,
        unreadCount: ownerSpaceConversations?.unreadMessageCount || 0,
      };
      break;
    }
    case ConversationType.PROJECT_USER: {
      const userSpaceConversations = (
        data as ConversationQueryType[typeof conversationType] | undefined
      )?.getSpaceConversations;
      result = {
        conversations: orderBy(
          cleanList(userSpaceConversations?.data || []),
          'updatedAt',
          'desc',
        ),
        totalCount: userSpaceConversations?.count || 0,
        unreadCount: userSpaceConversations?.unreadMessageCount || 0,
      };
      break;
    }
    case ConversationType.GLOBAL_ALL:
    case ConversationType.GLOBAL_DIRECT:
    case ConversationType.GLOBAL_NOUM: {
      const conversationsData = (
        data as ConversationQueryType[typeof conversationType] | undefined
      )?.getConversations;
      const conversations = orderBy(
        cleanList(conversationsData?.data || []),
        'updatedAt',
        'desc',
      ) as (BasicConversationItem | NoumGroupConversationItem)[];
      result = {
        conversations,
        totalCount: conversationsData?.count || 0,
        unreadCount: conversationsData?.unreadCount || 0,
      };
      break;
    }
    default:
      result = { conversations: [], totalCount: 0, unreadCount: 0 };
  }
  return result;
};

export const extractConversationUpdatingLimit = (
  conversationType: ConversationType,
  data?: Maybe<ConversationQuery>,
): number | undefined => {
  let limit;
  switch (conversationType) {
    case ConversationType.HOME_OWNER: {
      const spaceConversations = (
        data as ConversationQueryType[typeof conversationType] | undefined
      )?.getHomeSpaceConversations;
      limit = spaceConversations?.userConversations?.length;
      break;
    }
    case ConversationType.HOME_USER: {
      const spaceConversations = (
        data as ConversationQueryType[typeof conversationType] | undefined
      )?.getHomeSpaceConversations;
      limit = spaceConversations?.groupConversations?.length;
      break;
    }
    case ConversationType.PROJECT_OWNER:
    case ConversationType.PROJECT_OWNER_OTHERS: {
      const spaceConversations = (
        data as ConversationQueryType[typeof conversationType] | undefined
      )?.getSpaceConversationsAsAdminQuery;
      limit = spaceConversations?.data?.length;
      break;
    }
    case ConversationType.PROJECT_USER: {
      const spaceConversations = (
        data as ConversationQueryType[typeof conversationType] | undefined
      )?.getSpaceConversations;
      limit = spaceConversations?.data?.length;
      break;
    }
    case ConversationType.GLOBAL_ALL:
    case ConversationType.GLOBAL_DIRECT:
    case ConversationType.GLOBAL_NOUM: {
      const conversations = (
        data as ConversationQueryType[typeof conversationType] | undefined
      )?.getConversations;
      limit = conversations?.data?.length;
      break;
    }
  }

  return (limit || 0) > CONVERSATION_PAGINATION_LIMIT_S
    ? limit
    : CONVERSATION_PAGINATION_LIMIT_S;
};

export const getLinkTextMessage = (message: string) => {
  const urlRegex = /(\bhttps?:\/\/\S+)/gi;
  const matches = message.match(/\bhttps?:\/\/\S+/gi);
  const urls = matches?.length ? matches.map((url) => url) : [];
  const parts = message.split(urlRegex);

  const styledMessage = parts.map((part) => {
    if (part.match(urlRegex)) {
      return (
        <TSpan
          onClick={() => window.open(part, '_blank')}
          style={{
            color: 'inherit',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {part}
        </TSpan>
      );
    }
    return part;
  });

  return {
    firstUrl: urls[0],
    styledMessage,
  };
};

export const isValidConversationSid = (cid?: string): boolean =>
  !!cid &&
  !(
    cid === '' ||
    cid === EXAMPLE_CONVERSATION_ID ||
    cid === CREAT_CONVERSATION_WITH_HOME_OWNER
  );
