import {
  type Conversation,
  type MediaCategory,
  type UnsentMessage,
} from '@twilio/conversations';
import {
  type GetConversationsQuery,
  type GetConversationsQueryVariables,
  type GetHomeSpaceConversationsQuery,
  type GetHomeSpaceConversationsQueryVariables,
  type GetSpaceConversationsAsAdminQueryQuery,
  type GetSpaceConversationsAsAdminQueryQueryVariables,
  type GetSpaceConversationsQuery,
  type GetSpaceConversationsQueryVariables,
} from '@/apollo/graphql';
import { type UserStatus } from '@/apollo/generated/types';
import {
  type UserBasicOutputFragment,
  type ConversationOutputFragment,
} from '@/apollo/graphql/fragments';
import { type MessageBubbleStatus } from './components/MessageBubbles';

export interface ChatConversation {
  conversation?: Conversation;
  participants: UserBasicOutputFragment[];
  conversationType?: ConversationOutputFragment['type'];
}

export type UserData = {
  _id: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  userStatus?: UserStatus;
  title?: string | null;
  source?: string | null;
  homeNoumId?: string | null;
  placeholder: boolean;
};

export interface PendingMessage
  extends Omit<UnsentMessage, 'attributes' | 'mediaContent' | 'emailOptions'> {
  index: number;
  attributes: MessageAttributes;
  mediaContent: [MediaCategory, FormData][];
  conversation: Conversation;
  author: string | null;
  dateCreated: Date | null;
  status?: MessageStatus;
}

export type MessageAttributes = {
  id: string;
  dateCreatedTimestamp: number;
  width?: number;
  height?: number;
};

export type MessageStatus = {
  status?: MessageBubbleStatus;
  readers?: string[];
  sender?: string | null;
};

export type ParticipantAttributes = {
  role?: 'owner' | 'participant';
  permission?: 'read-only' | 'read-write';
};

export enum ConversationType {
  GLOBAL_ALL = 'global.all',
  GLOBAL_DIRECT = 'global.direct',
  GLOBAL_NOUM = 'global.noum',
  HOME_OWNER = 'home.owner',
  HOME_USER = 'home.user',
  PROJECT_OWNER = 'project.owner',
  PROJECT_OWNER_OTHERS = 'project.owner.others',
  PROJECT_USER = 'project.user',
}

export enum ViewMode {
  DEFAULT = 'default',
  FULLCHAT = 'full-chat',
  FULLCONVERSATION = 'full-conversation',
}

/* For noum editor 2.0 */
export enum NoumLayoutViewMode {
  NOUMLAYOUTSMALL = 'noum-layout-small',
  NOUMLAYOUTCOMPACT = 'noum-layout-compact',
  NOUMLAYOUTBIG = 'noum-layout-big',
}

export type ConversationsListOptions =
  | {
      conversationType:
        | ConversationType.GLOBAL_ALL
        | ConversationType.GLOBAL_DIRECT
        | ConversationType.GLOBAL_NOUM;
      variables: GetConversationsQueryVariables;
    }
  | {
      conversationType:
        | ConversationType.HOME_OWNER
        | ConversationType.HOME_USER;
      variables: GetHomeSpaceConversationsQueryVariables;
    }
  | {
      conversationType:
        | ConversationType.PROJECT_OWNER
        | ConversationType.PROJECT_OWNER_OTHERS;
      variables: GetSpaceConversationsAsAdminQueryQueryVariables;
    }
  | {
      conversationType: ConversationType.PROJECT_USER;
      variables: GetSpaceConversationsQueryVariables;
    };

export type ConversationQueryType = {
  [ConversationType.GLOBAL_ALL]: GetConversationsQuery;
  [ConversationType.GLOBAL_DIRECT]: GetConversationsQuery;
  [ConversationType.GLOBAL_NOUM]: GetConversationsQuery;
  [ConversationType.HOME_OWNER]: GetHomeSpaceConversationsQuery;
  [ConversationType.HOME_USER]: GetHomeSpaceConversationsQuery;
  [ConversationType.PROJECT_OWNER]: GetSpaceConversationsAsAdminQueryQuery;
  [ConversationType.PROJECT_OWNER_OTHERS]: GetSpaceConversationsAsAdminQueryQuery;
  [ConversationType.PROJECT_USER]: GetSpaceConversationsQuery;
};

export type ConversationQuery =
  | GetConversationsQuery
  | GetHomeSpaceConversationsQuery
  | GetSpaceConversationsAsAdminQueryQuery
  | GetSpaceConversationsQuery;

export enum NoumConversationType {
  MINE = 'mine',
  OTHERS = 'others',
}

export type ConversationUserProps = {
  _id: string;
  firstName: string;
  lastName: string;
  title?: string;
  source?: string;
  homeNoumId?: string;
  placeholder: boolean;
  isUnregistered?: boolean;
};

export enum NoumParticipantRole {
  OWNER = 'owner',
  PARTICIPANT = 'participant',
}

export enum NoumParticipantPermission {
  READ_ONLY = 'read-only',
  READ_WRITE = 'read-write',
}

export interface NoumConversation {
  twilioConversation: Conversation;
  conversationData: ConversationOutputFragment;
}
