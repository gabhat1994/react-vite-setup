import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '@/features/auth/contexts';
import {
  MessageAlignment,
  MessageType,
  type SocialHallChat,
} from '@/screens/SocialHall/types';
import { type MessageBubbleType } from '@/features/conversation/components/MessageBubbles';
import { SocialHallUtils } from '@/utils/socialHall';
import { type GroupUserHashMap } from '../types';

export const useCreateMessage = () => {
  const { user } = useAuth();

  const getMessageDeliveryType = useCallback(
    (uid: string): MessageBubbleType =>
      uid === user?._id ? 'sent' : 'received',
    [user?._id],
  );

  const createMessage = (
    message: string | Blob,
    uid: string,
    groupUsersHashMap: GroupUserHashMap,
    messageType: MessageType = MessageType.TEXT,
    sent: boolean = false,
  ): SocialHallChat => {
    const isSameUser = uid === user?._id;
    const file = new File([message], 'noumena');
    const isMediaMessage = message && message instanceof Blob;

    const additionalMsgProps =
      messageType === MessageType.NOTIFICATION
        ? {
            align: MessageAlignment.Center,
          }
        : {
            pendingFile: isMediaMessage ? file : undefined,
            profileUrl: groupUsersHashMap[uid].profileUrl,
            media:
              !isSameUser && isMediaMessage
                ? SocialHallUtils.getMedia(URL.createObjectURL(message))
                : undefined,
          };

    return {
      uid,
      message,
      messageType,
      _id: uuidv4(),
      type: isSameUser ? 'sent' : 'received',
      messageDeliveryType: getMessageDeliveryType(uid),
      status: isSameUser ? (sent ? 'delivered' : 'sending') : 'read',
      ...additionalMsgProps,
    };
  };

  return {
    createMessage,
  };
};
