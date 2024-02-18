import {
  type FC,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PushNotificationTypes } from '@/apollo/generated/types';
import { useAudio } from '@/hooks';
import { useAuth } from '@/features/auth/contexts';
import {
  useGetConversationByCidLazyQuery,
  useGetUnreadMessageCountQuery,
} from '@/apollo/graphql';
import EventEndAudio from '@/assets/media/chat-new-message.wav';
import { type MessagePayload } from '@/services/rest/firebase';
import { UserUtil } from '@/utils/user';
import { usePushNotification } from '@/features/push-notifications/contexts/PushNotification';
import { ConversationUnreadStatusContext } from './ConversationUnreadStatusContext';
import { isValidConversationSid } from '../helpers';

export const ConversationUnreadStatusProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const { onAnyMessage } = usePushNotification();
  const [unreadConversationsCount, setUnreadConversationsCount] =
    useState<number>(0);

  const [getConversationByCid, { data }] = useGetConversationByCidLazyQuery({
    fetchPolicy: 'network-only',
  });

  const { data: getUnreadMessageCountData } = useGetUnreadMessageCountQuery({
    fetchPolicy: 'network-only',
    skip: !user || UserUtil.isUnauthenticated(user),
  });
  const [mutedConversationId, setMutedConversationId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    setUnreadConversationsCount(
      getUnreadMessageCountData?.getUnreadMessageCount ?? 0,
    );
  }, [getUnreadMessageCountData]);

  useEffect(() => {
    const totalUnreadConversationCount =
      data?.getConversationByCid?.metaData?.totalUnreadConversationCount;

    // Temporary solution for bypassing to update conversation list with null for unread count
    if (typeof totalUnreadConversationCount === 'number') {
      setUnreadConversationsCount(totalUnreadConversationCount);
    }
  }, [data]);

  const [playEventEndAudio] = useAudio(EventEndAudio);

  useEffect(() => {
    const handler = (message: MessagePayload) => {
      if (
        PushNotificationTypes.Conversation === message?.data?.pnId &&
        user?._id &&
        message?.data?.receiverUserId === user._id
      ) {
        if (
          !mutedConversationId ||
          message?.data?.conversationId !== mutedConversationId
        ) {
          playEventEndAudio();
        }
        setUnreadConversationsCount(
          Number(message.data?.unreadConversationCount),
        );
      }
    };

    const unsubscribe = onAnyMessage(handler);

    return unsubscribe;
  }, [onAnyMessage, user?._id, mutedConversationId, playEventEndAudio]);

  const readConversation = useCallback(
    async (cid: string) => {
      if (!user || !isValidConversationSid(cid)) return;
      await getConversationByCid({
        variables: { cid },
      });
    },
    [getConversationByCid, user],
  );

  const value = useMemo(
    () => ({
      unreadConversationsCount,
      readConversation,
      setMutedConversationId,
    }),
    [unreadConversationsCount, readConversation],
  );

  return (
    <ConversationUnreadStatusContext.Provider value={value}>
      {children}
    </ConversationUnreadStatusContext.Provider>
  );
};
