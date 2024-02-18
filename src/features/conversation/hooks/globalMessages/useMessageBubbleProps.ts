import { useMemo, useContext } from 'react';

import { type Message } from '@twilio/conversations';
import { isSameDay } from 'date-fns';
import { UserUtil } from '@/utils/user';
import {
  type MessageBubbleStatus,
  type MessageBubbleType,
} from '@/features/conversation/components/MessageBubbles';
import { getMessageCreateDate } from '@/features/conversation/components/MessageBubbles/shared/helpers';

import { useAuth } from '@/features/auth/contexts';

import { ActiveConversationContext } from '../../contexts/ActiveConversationContext';
import { type MessageAttributes, type PendingMessage } from '../../types';
import { isPendingMessage, isShowMessageStatus } from '../../helpers';

import { useConversationDetails } from './useConversationDetails';
import { useMessageStatus } from './useMessageStatus';

type BubbleProps = {
  message: string;
  userAvatar?: string;
  type: MessageBubbleType;
  sendDate?: Date | null;
  showSendDate?: boolean;
  showAvatar: boolean;
  status?: MessageBubbleStatus;
  attributes?: MessageAttributes;
};

type Props = {
  message: Message | PendingMessage;
  next?: Message | PendingMessage;
  prev?: Message | PendingMessage;
  sameTypeNext?: Message | PendingMessage;
  myMessageIndexs?: number[];
  isPending?: boolean;
};

export function useMessageBubbleProps({
  message,
  next,
  prev,
  sameTypeNext = undefined,
}: Props) {
  const { user } = useAuth();
  const { activeConversationSid } = useContext(ActiveConversationContext);
  const { getParticipantById } = useConversationDetails({
    sid: activeConversationSid,
  });
  const status = useMessageStatus({ message });
  const nextStatus = useMessageStatus({
    message: next,
  });
  const sameTypeNextStatus = useMessageStatus({
    message: sameTypeNext,
  });

  const showStatus = useMemo(
    () => isShowMessageStatus(status, nextStatus, sameTypeNextStatus),
    [status, nextStatus, sameTypeNextStatus],
  );
  const showSender = prev?.author !== message.author;

  const dateCreated = useMemo(() => getMessageCreateDate(message), [message]);
  const prevDateCreated = useMemo(() => getMessageCreateDate(prev), [prev]);

  const showSendDate =
    !prevDateCreated ||
    (prevDateCreated &&
      dateCreated &&
      !isSameDay(dateCreated, prevDateCreated));

  const pendingMessageBubbleProps: BubbleProps | undefined = useMemo(
    () =>
      isPendingMessage(message)
        ? {
            message: '',
            userAvatar: undefined,
            type: 'sent',
            showSendDate: false,
            sendDate: dateCreated,
            showAvatar: false,
            status: status?.status,
            showStatus,
            attributes: message.attributes,
            isPending: true,
          }
        : undefined,
    [message, dateCreated, status, showStatus],
  );

  const messageBubbleProps: BubbleProps | undefined = useMemo(
    () =>
      !isPendingMessage(message)
        ? {
            message: message.body ?? '',
            userAvatar:
              UserUtil.getProfilePicture(
                getParticipantById(message.author ?? ''),
              ) || undefined,
            type: message.author === user?._id ? 'sent' : 'received',
            showSendDate,
            sendDate: message.dateCreated,
            showAvatar: message?.author !== (next as Message)?.author,
            status: status?.status,
            readers: status?.readers,
            showStatus,
            sender: status?.sender,
            showSender,
            attributes: message.attributes as MessageAttributes,
          }
        : undefined,
    [
      message,
      getParticipantById,
      user?._id,
      showSendDate,
      next,
      status,
      showStatus,
      showSender,
    ],
  );

  return {
    pendingMessageBubbleProps,
    messageBubbleProps,
  };
}
