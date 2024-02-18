import * as fc from 'fast-check';
import generate from 'uniqid';

import {
  type Conversation,
  type Media,
  type Message,
  UnsentMessage,
} from '@twilio/conversations';
import { type UserBasicOutputFragment } from '@/apollo/graphql/fragments';
import { type PendingMessage } from './types';

export const mockUsers = (count = 15): UserBasicOutputFragment[] => {
  const optionsArbitary = fc
    .set(fc.lorem(), { minLength: 5, maxLength: 20 })
    .chain(() =>
      fc.record({
        _id: fc.constant(generate()),
        firstName: fc.lorem({ maxCount: 1 }),
        lastName: fc.lorem({ maxCount: 1 }),
        email: fc.emailAddress(),
        profileUrl: fc.constant(
          `https://picsum.photos/50/50?random=${Math.floor(
            Math.random() * 100,
          )}` as const,
        ),
        title: fc.lorem({ maxCount: 5 }),
      }),
    );

  return fc.sample(optionsArbitary, count);
};

export const mockedConversation = (
  params: Partial<Conversation> = {},
): Conversation => {
  const conversation = {
    sid: '',
    links: {
      self: '',
      messages: '',
      participants: '',
    },
    configuration: undefined,
    services: undefined,
    channelState: undefined,
    statusSource: undefined,
    entityPromise: undefined,
    entityName: undefined,
    entity: undefined,
    messagesEntity: undefined,
    participantsEntity: undefined,
    participants: undefined,
    uniqueName: null,
    status: 'notParticipating',
    friendlyName: null,
    dateUpdated: null,
    dateCreated: null,
    createdBy: '',
    attributes: null,
    lastReadMessageIndex: null,
    lastMessage: undefined,
    notificationLevel: 'default',
    bindings: {},
    limits: {
      mediaAttachmentsCountLimit: 0,
      mediaAttachmentSizeLimitInMb: 0,
      mediaAttachmentsTotalSizeLimitInMb: 0,
      emailHistoriesAllowedMimeTypes: [],
      emailBodiesAllowedMimeTypes: [],
    },
    state: undefined,
    _subscribe: vi.fn(),
    _subscribeStreams: vi.fn(),
    _unsubscribe: vi.fn(),
    _setStatus: vi.fn(),
    _statusSource: vi.fn(),
    _update: vi.fn(),
    _onMessageAdded: undefined,
    _setLastReadMessageIndex: undefined,
    add: vi.fn(),
    addNonChatParticipant: vi.fn(),
    advanceLastReadMessageIndex: vi.fn(),
    delete: vi.fn(),
    getAttributes: vi.fn(),
    getMessages: vi.fn(),
    getParticipants: vi.fn(),
    getParticipantsCount: vi.fn(),
    getParticipantBySid: vi.fn(),
    getParticipantByIdentity: vi.fn(),
    getMessagesCount: vi.fn(),
    getUnreadMessagesCount: vi.fn(),
    join: vi.fn(),
    leave: vi.fn(),
    removeParticipant: vi.fn(),
    sendMessage: vi.fn(),
    prepareMessage: vi.fn(),
    setAllMessagesRead: vi.fn(),
    setAllMessagesUnread: vi.fn(),
    setUserNotificationLevel: vi.fn(),
    typing: vi.fn(),
    updateAttributes: vi.fn(),
    updateFriendlyName: vi.fn(),
    updateLastReadMessageIndex: vi.fn(),
    updateUniqueName: vi.fn(),
    eventHistory: undefined,
    on: vi.fn(),
    once: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addListenerWithReplay: vi.fn(),
    onWithReplay: vi.fn(),
    removeAllListeners: vi.fn(),
    setMaxListeners: vi.fn(),
    getMaxListeners: vi.fn(),
    listeners: vi.fn(),
    rawListeners: vi.fn(),
    listenerCount: vi.fn(),
    prependListener: vi.fn(),
    prependOnceListener: vi.fn(),
    eventNames: vi.fn(),
    ...params,
  };

  return conversation as unknown as Conversation;
};

export const mockedMessage = (param: Partial<Message> = {}): Message => {
  const message = {
    body: '',
    conversation: mockedConversation(),
    links: undefined,
    configuration: undefined,
    services: undefined,
    state: undefined,
    sid: '',
    author: null,
    subject: null,
    dateUpdated: null,
    index: 0,
    lastUpdatedBy: null,
    dateCreated: null,
    attributes: {
      id: 'id',
      dateCreatedTimestamp: new Date('2022-08-10').getTime(),
    },
    type: 'text',
    media: null,
    attachedMedia: null,
    participantSid: null,
    aggregatedDeliveryReceipt: null,
    getMediaByCategory: vi.fn(),
    getEmailBody: vi.fn(),
    getEmailHistory: vi.fn(),
    _update: vi.fn(),
    getParticipant: vi.fn(),
    getDetailedDeliveryReceipts: vi.fn(),
    remove: vi.fn(),
    updateBody: vi.fn(),
    updateAttributes: vi.fn(),
    attachTemporaryUrlsFor: vi.fn(),
    _getDetailedDeliveryReceiptsPaginator: undefined,
    eventHistory: undefined,
    on: vi.fn(),
    once: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addListenerWithReplay: vi.fn(),
    onWithReplay: vi.fn(),
    removeAllListeners: vi.fn(),
    setMaxListeners: vi.fn(),
    getMaxListeners: vi.fn(),
    listeners: vi.fn(),
    rawListeners: vi.fn(),
    listenerCount: vi.fn(),
    prependListener: vi.fn(),
    prependOnceListener: vi.fn(),
    eventNames: vi.fn(),
    ...param,
  };

  return message as unknown as Message;
};

export const mockedUnsentMessage = (
  param: Partial<UnsentMessage> = {},
): UnsentMessage => {
  // @ts-ignore-next-line
  const message = new UnsentMessage(undefined);

  return { ...message, ...param } as unknown as UnsentMessage;
};

export const mockedPendingMessage = (
  param: Partial<PendingMessage> = {},
): PendingMessage => {
  const message: PendingMessage = {
    index: 0,
    text: '',
    attributes: {
      id: 'id',
      dateCreatedTimestamp: new Date('2022-08-10').getTime(),
    },
    mediaContent: [],
    conversation: mockedConversation(),
    author: null,
    dateCreated: null,
    send: vi.fn(),
    ...param,
  };

  return message as unknown as PendingMessage;
};

export const mockedMedia = (param: Partial<Media>): Media => {
  const media = {
    state: undefined,
    services: undefined,
    mcsMedia: undefined,
    sid: '',
    filename: null,
    contentType: '',
    size: 0,
    category: 'body',
    getContentTemporaryUrl: vi.fn(),
    _fetchMcsMedia: undefined,
    ...param,
  };

  return media as unknown as Media;
};
