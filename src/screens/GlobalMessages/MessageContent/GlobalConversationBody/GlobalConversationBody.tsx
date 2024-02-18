import { type FC, useContext, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TSpan } from '@/components/Typography';
import { UserUtil } from '@/utils/user';
import { useAuth } from '@/features/auth/contexts';
import ConversationHooks from '@/features/conversation/hooks/globalMessages';
import { NewConversationContext } from '@/features/conversation/contexts/NewConversationContext';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import { ConversationViewContext } from '@/features/conversation/contexts/ConversationViewContext';
import { MessageList } from '@/features/conversation/components/MessageList/MessageList';
import { MessageInput } from '@/features/conversation/components/MessageInput';
import { chunkStringWithoutWordBreaking } from '@/utils/strings';
import {
  MessageInputWrapper,
  MessageListWrapper,
  StartConversationMessage,
  Wrapper,
} from './styles';

export const GlobalConversationBody: FC<{}> = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();
  const { user } = useAuth();
  const { activeConversationSid } = useContext(ActiveConversationContext);
  const { setConversationWrapperWidth } = useContext(ConversationViewContext);
  const {
    ecLoading,
    selectedUsers,
    isConversationCreatable,
    createHomeNoumNewConversation,
  } = useContext(NewConversationContext);
  const { conversation } = ConversationHooks.useConversation({
    sid: activeConversationSid,
  });
  const { setIsNewConversation } = useContext(ConversationViewContext);
  const { sendMessage, sendFile } = ConversationHooks.useConversationMessages({
    sid: activeConversationSid,
  });

  const { users } = ConversationHooks.useConversationDetails({
    sid: activeConversationSid!,
  });

  const isShowMessageList = !ecLoading;

  const isShowMessageStartLabel =
    !ecLoading && !activeConversationSid && isConversationCreatable;

  const isShownMessageInput = useMemo(
    () =>
      (activeConversationSid || isConversationCreatable) &&
      !UserUtil.isInactive(user) &&
      (users.length === 1 ? users[0].source !== null : true),
    [activeConversationSid, isConversationCreatable, user, users],
  );

  useEffect(() => {
    setConversationWrapperWidth(ref.current?.scrollWidth || 0);
  }, [ref.current?.scrollWidth, setConversationWrapperWidth]);

  const handleSendMessage = async (message: string, files: File[]) => {
    let convo = conversation;
    if (isConversationCreatable) {
      if (convo) {
        setIsNewConversation(false);
      } else {
        convo = await createHomeNoumNewConversation();
      }
    }

    const splittedMessages = chunkStringWithoutWordBreaking(message, 4000);
    splittedMessages.forEach((msg) => sendMessage(msg, convo));

    // sending each media file as a separate message.
    files.forEach((file) => sendFile(file, convo));
  };

  return (
    <Wrapper ref={ref} data-testid="conversionbody-wrapper">
      <MessageListWrapper>
        {isShowMessageList && <MessageList />}
      </MessageListWrapper>
      <MessageInputWrapper>
        {isShowMessageStartLabel && (
          <StartConversationMessage>
            <TSpan
              font="footnote"
              colorToken="--text-message-status-neutral-default"
            >
              {selectedUsers.length === 1
                ? t('noumena.message.start_single_conversation', {
                    name: `${selectedUsers[0].firstName} ${selectedUsers[0].lastName}`,
                  })
                : t('noumena.message.start_group_conversation')}
            </TSpan>
          </StartConversationMessage>
        )}
        {isShownMessageInput && (
          <MessageInput onSendMessage={handleSendMessage} />
        )}
      </MessageInputWrapper>
    </Wrapper>
  );
};
