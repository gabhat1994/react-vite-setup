import {
  type FC,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { type MediaCategory, type UnsentMessage } from '@twilio/conversations';

import { useAuth } from '@/features/auth/contexts';
import { replaceItemAtIndex } from '@/utils/list';

import { type MessageAttributes, type PendingMessage } from '../types';
import ConversationHooks from '../hooks/globalMessages';
import { ActiveConversationContext } from './ActiveConversationContext';
import { ConversationUnreadStatusContext } from './ConversationUnreadStatusContext';

export const ActiveConversationProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();

  const [sid, setSid] = useState<string>('');
  const { conversation } = ConversationHooks.useConversation({ sid });

  const [pendingMessages, setPendingMessages] = useState<
    Record<string, PendingMessage[]>
  >({});

  const pendingMessagesRef = useRef(pendingMessages);
  useEffect(() => {
    pendingMessagesRef.current = pendingMessages;
  }, [pendingMessages]);

  const activeConversationPendingMessages = useMemo(
    () => pendingMessages[sid] || [],
    [pendingMessages, sid],
  );

  const { setMutedConversationId } = useContext(
    ConversationUnreadStatusContext,
  );

  useLayoutEffect(() => {
    setMutedConversationId(sid);

    return () => setMutedConversationId(null);
  }, [sid, setMutedConversationId]);

  const addPendingMessage = useCallback(
    (unsentMessage: UnsentMessage) => {
      if (!conversation) return;

      const pendingMessage: PendingMessage = {
        ...unsentMessage,
        send: unsentMessage.send,
        attributes: unsentMessage.attributes as MessageAttributes,
        mediaContent: unsentMessage.mediaContent as [MediaCategory, FormData][],
        author: user?._id || null,
        dateCreated: new Date(),
        index: -1,
        conversation,
        status: { status: 'sending' },
      };

      setPendingMessages((prev) => ({
        ...prev,
        [sid]: [...(prev[sid] || []), pendingMessage],
      }));
    },
    [conversation, sid, user?._id],
  );

  const updatePendingMessage = useCallback(
    (id: string, pendingMessage: Partial<PendingMessage>) => {
      const activePendingMessages = pendingMessagesRef.current[sid] || [];
      const index = activePendingMessages.findIndex(
        (message) => message.attributes.id === id,
      );

      if (index > -1) {
        const updatedPendingMessage = {
          ...activePendingMessages[index],
          ...pendingMessage,
        };
        const updatedPendingMessages = replaceItemAtIndex(
          activePendingMessages,
          index,
          updatedPendingMessage,
        );
        setPendingMessages((prev) => ({
          ...prev,
          [sid]: [...updatedPendingMessages],
        }));
      }
    },
    [sid],
  );

  const removePendingMessage = useCallback(
    (id: string) => {
      setPendingMessages((prev) => ({
        ...prev,
        [sid]: prev[sid]?.filter((message) => message.attributes.id !== id),
      }));
    },
    [sid],
  );

  const resendErrorMessage = useCallback(
    (id: string) => {
      const activePendingMessages = pendingMessagesRef.current[sid] || [];
      const index = activePendingMessages.findIndex(
        (message) => message.attributes.id === id,
      );

      if (index > -1) {
        const failedMessage = activePendingMessages[index];

        if (
          failedMessage.index > -1 ||
          failedMessage.status?.status === 'failed'
        ) {
          updatePendingMessage(id, {
            status: { status: 'sending' },
          });

          const promise = activePendingMessages[index].send();
          promise
            .then((resp) => {
              if (resp === null) return;
              updatePendingMessage(id, {
                status: { status: 'sent' },
                index: resp,
              });
            })
            .catch(() => {
              updatePendingMessage(id, {
                status: { status: 'failed' },
              });
            });
        } else {
          updatePendingMessage(id, {
            status: { status: 'sent' },
          });
        }
      }
    },
    [sid, updatePendingMessage],
  );

  const value = useMemo(
    () => ({
      activeConversationSid: sid,
      setActiveConversationSid: setSid,
      addPendingMessage,
      updatePendingMessage,
      removePendingMessage,
      resendErrorMessage,
      pendingMessages: activeConversationPendingMessages,
    }),
    [
      sid,
      activeConversationPendingMessages,
      addPendingMessage,
      removePendingMessage,
      resendErrorMessage,
      updatePendingMessage,
    ],
  );

  return (
    <ActiveConversationContext.Provider value={value}>
      {children}
    </ActiveConversationContext.Provider>
  );
};

