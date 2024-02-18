import { type Message } from '@twilio/conversations';
import { useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useAuth } from '@/features/auth/contexts';
import ConversationHooks from '@/features/conversation/hooks/globalMessages';

import { MessageElementContext } from '@/screens/Chamber/components/elements/MessageElementV2/contexts/MessageElementProvider';
import { ChatItemView } from './ChatItemView';
import { type ChatItemProps } from './types';

export const ChatItem = ({ sid, onRead, ...props }: ChatItemProps) => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { conversation } = ConversationHooks.useConversation({ sid });
  const { messages } = ConversationHooks.useConversationMessages({ sid });
  const { users, title, getParticipantById } =
    ConversationHooks.useConversationDetails({ sid });
  const { noumLayoutViewMode } = useContext(MessageElementContext);

  const lastMessage = useMemo(
    () => messages[messages.length - 1] as Message | undefined,
    [messages],
  );

  const unread = ConversationHooks.useConversationUnreadMessageCount({ sid });

  const { author, lastMessageHasAsset } = useMemo(() => {
    let tempAuthor = '';
    let lastMessageHasAssetTmp;

    if (conversation) {
      lastMessageHasAssetTmp = lastMessage?.attachedMedia?.[0];

      if (lastMessage?.author && user?._id) {
        if (lastMessage.author === user._id) {
          tempAuthor = t('noumena.chat.you');
        } else {
          tempAuthor = `${
            getParticipantById(lastMessage.author)?.firstName ?? ''
          }`;
        }
      }
    }
    return {
      author: tempAuthor,
      lastMessageHasAsset: lastMessageHasAssetTmp,
    };
  }, [conversation, getParticipantById, lastMessage, t, user]);

  useEffect(() => {
    if (conversation && lastMessage?.author === user?._id) {
      conversation.setAllMessagesRead();
    }
  }, [conversation, lastMessage?.author, user?._id]);

  useEffect(() => {
    if (!unread) {
      onRead?.();
    }
  }, [onRead, unread]);

  return (
    <ChatItemView
      noumLayoutViewMode={noumLayoutViewMode}
      author={author}
      lastMessageHasAsset={lastMessageHasAsset}
      users={users}
      title={title}
      messages={messages}
      unread={unread}
      lastMessage={lastMessage}
      sid={sid}
      {...props}
    />
  );
};
