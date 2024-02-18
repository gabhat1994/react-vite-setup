import { type Message } from '@twilio/conversations';
import { cleanList } from '@/utils/list';
import { useAuth } from '@/features/auth/contexts';
import { useConversationDetails } from './useConversationDetails';
import { useConversationParticipants } from './useConversationParticipants';
import { type MessageStatus, type PendingMessage } from '../../types';
import { isPendingMessage } from '../../helpers';

export function useMessageStatus({
  message,
}: {
  message: Message | PendingMessage | undefined;
}) {
  const { user } = useAuth();
  const { isGroupConversation, users, getParticipantById } =
    useConversationDetails({
      sid: message?.conversation.sid || '',
    });
  const { participants } = useConversationParticipants({
    sid: message?.conversation.sid || '',
  });

  if (!message) return undefined;

  const status: MessageStatus = {};
  const isMyMessage = message.author === user?._id;
  const messageCreatedDateTimestamp = message.dateCreated?.getTime() || 0;
  if (isGroupConversation) {
    if (isMyMessage) {
      if (isPendingMessage(message)) {
        status.status = message.status?.status || 'sending';
        if (status.status !== 'sent') {
          return status;
        }
      } else {
        status.status = 'sent';
      }
    }

    const sender = getParticipantById(message.author || '');
    status.sender = sender?.firstName;

    const readers = cleanList(
      participants.map((participant) => {
        const lastReadMessageTimestamp =
          participant.lastReadTimestamp?.getTime() || 0;
        if (
          participant.identity !== message.author &&
          participant.identity !== user?._id &&
          messageCreatedDateTimestamp <= lastReadMessageTimestamp
        ) {
          const participantUser = getParticipantById(
            participant.identity || '',
          );
          return participantUser?.firstName;
        }
        return null;
      }),
    );

    if (readers.length) {
      status.status = 'read';
      status.readers =
        (isMyMessage && readers.length === users.length - 1) ||
        (!isMyMessage && readers.length === users.length - 2)
          ? ['everyone']
          : readers;
    }
  } else if (isMyMessage) {
    if (isPendingMessage(message)) {
      status.status = message.status?.status || 'sending';
      if (status.status !== 'sent') {
        return status;
      }
    } else {
      status.status = 'sent';
    }
    participants.forEach((participant) => {
      const lastReadMessageTimestamp =
        participant.lastReadTimestamp?.getTime() || 0;
      if (
        participant.identity !== user?._id &&
        messageCreatedDateTimestamp <= lastReadMessageTimestamp
      ) {
        status.status = 'read';
      }
    });
  } else {
    participants.forEach((participant) => {
      const lastReadMessageTimestamp = participant.lastReadTimestamp?.getTime();
      if (
        participant.identity === user?._id &&
        lastReadMessageTimestamp &&
        messageCreatedDateTimestamp <= lastReadMessageTimestamp
      ) {
        status.status = 'read';
      }
    });
  }

  return status;
}
