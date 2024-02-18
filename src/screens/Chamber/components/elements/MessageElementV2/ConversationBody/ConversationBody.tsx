import { TSpan } from '@/components/Typography';
import { useNoumContext } from '@/screens/Chamber/ViewChamber/ChamberProvider';
import { UserUtil } from '@/utils/user';
import { useContext, useMemo, type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { CREAT_CONVERSATION_WITH_HOME_OWNER } from '@/constants/conversation';
import { useAuth } from '@/features/auth/contexts';
import { MessageInput } from '@/features/conversation/components/MessageInput';
import MessageList from '@/features/conversation/components/MessageList';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import { ConversationViewContext } from '@/features/conversation/contexts/ConversationViewContext';
import { NewConversationContext } from '@/features/conversation/contexts/NewConversationContext';
import ConversationHooks from '@/features/conversation/hooks/globalMessages';
import { NoumLayoutViewMode } from '@/features/conversation/types';
import { useNoumElement } from '@/features/noums/contexts/NoumElementContext';
import { chunkStringWithoutWordBreaking } from '@/utils/strings';
import { SpaceUtils } from '@/utils/space';
import useChatList from '../ChatList/useChatList';
import { ConversationEmptyState } from '../ConversationEmptyState';
import { MessageElementContext } from '../contexts/MessageElementProvider';
import { ConversationExampleBody } from './ConversationExampleBody';
import {
  MessageInputWrapper,
  MessageListWrapper,
  StartConversationMessage,
  Wrapper,
} from './styles';

export const ConversationBody: FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { isOwner, space } = useNoumContext();
  const { isOthersConversations, isNoumLayoutSmallViewMode } = useContext(
    MessageElementContext,
  );
  const { isEditing } = useNoumElement();

  const { activeConversationSid } = useContext(ActiveConversationContext);
  const {
    ecLoading,
    selectedUsers,
    isConversationCreatable,
    createNewConversation,
    createHomeNoumNewConversation,
  } = useContext(NewConversationContext);
  const { setIsNewConversation } = useContext(ConversationViewContext);
  const { conversation } = ConversationHooks.useConversation({
    sid: activeConversationSid,
  });

  const { users } = ConversationHooks.useConversationDetails({
    sid: activeConversationSid,
  });

  const { cids, noumLayoutViewMode } = useChatList();

  const { sendMessage, sendFile, messages, isLoading } =
    ConversationHooks.useConversationMessages({
      sid: activeConversationSid,
    });

  const showExampleConversation =
    isEditing && messages.length === 0 && !isLoading && !ecLoading;

  const isShowMessageList = !ecLoading;

  const isShowMessageStartLabel =
    !ecLoading && !activeConversationSid && isConversationCreatable;

  const isShownMessageInput = useMemo(
    () =>
      !isOthersConversations &&
      (activeConversationSid || isConversationCreatable) &&
      !UserUtil.isInactive(user) &&
      (users.length === 1 ? users[0].source !== null : true),
    [
      activeConversationSid,
      isConversationCreatable,
      isOthersConversations,
      user,
      users,
    ],
  );

  const handleSendMessage = async (message: string, files: File[]) => {
    let convo = conversation;
    if (isConversationCreatable) {
      if (convo) {
        setIsNewConversation(false);
      } else {
        convo = SpaceUtils.isMasterNoum(space)
          ? await createHomeNoumNewConversation()
          : await createNewConversation();
      }
    }

    const splittedMessages = chunkStringWithoutWordBreaking(message, 4000);
    splittedMessages.forEach((msg) => sendMessage(msg, convo));

    // sending each media file as a separate message.
    files.forEach((file) => sendFile(file, convo));
  };

  if (showExampleConversation) {
    return (
      <ConversationExampleBody
        isNoumLayoutSmallViewMode={isNoumLayoutSmallViewMode}
      />
    );
  }

  if (
    cids.length === 0 &&
    noumLayoutViewMode === NoumLayoutViewMode.NOUMLAYOUTCOMPACT &&
    !isShownMessageInput
  ) {
    return <ConversationEmptyState />;
  }

  return (
    <Wrapper
      data-testid="conversionbody-wrapper"
      isNoumLayoutSmallViewMode={isNoumLayoutSmallViewMode}
    >
      <MessageListWrapper>
        {isShowMessageList && <MessageList />}
      </MessageListWrapper>
      <MessageInputWrapper>
        {isShowMessageStartLabel && (
          <StartConversationMessage>
            <TSpan
              font="body-s"
              colorToken="--text-placeholder-neutral-default"
            >
              {activeConversationSid === CREAT_CONVERSATION_WITH_HOME_OWNER
                ? t('noumena.message.start_home_owner_conversation')
                : selectedUsers.length === 1
                ? t('noumena.message.start_single_conversation', {
                    name: `${selectedUsers[0].firstName} ${selectedUsers[0].lastName}`,
                  })
                : t('noumena.message.start_group_conversation')}
            </TSpan>
            <TSpan
              font="body-s"
              colorToken="--text-placeholder-neutral-default"
            >
              {!SpaceUtils.isMasterNoum(space) &&
                !isOwner &&
                t('noumena.message.start_disclaimer_to_connected_user')}
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
