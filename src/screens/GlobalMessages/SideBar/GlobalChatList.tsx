import { NetworkStatus } from '@apollo/client';
import { useCallback, useContext, useEffect, useLayoutEffect } from 'react';
import { t } from 'i18next';
import { useNavigate } from 'react-router';
import { Infinite } from '@/components/Infinite';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import ConversationHooks from '@/features/conversation/hooks/globalMessages';
import { ConversationType, ViewMode } from '@/features/conversation/types';
import ChatItem from '@/features/conversation/components/ChatItem';
import NewChatItem from '@/features/conversation/components/ChatItem/NewChatItem';
import { ConversationViewContext } from '@/features/conversation/contexts/ConversationViewContext';
import { SpinnerContainer } from '@/common/globalStyles';
import { Spinner } from '@/components/Spinner';
import { useWindowDimensions } from '@/hooks';
import { breakpoints } from '@/constants/devices';
import routes from '@/constants/routes';
import EmptyScreen from '../EmptyScreen/EmptyScreen';
import { ExpandableChatItem } from './ExpandableChatItem';
import { GlobalMessageContext } from '../contexts/GlobalMessageProvider';
import { ListWrapper, StyledNoNoumConvoNote } from './styles';

export const GlobalChatList = ({
  selectedTabId,
  handleCreateNewConv,
}: {
  selectedTabId: number;
  handleCreateNewConv: () => void;
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width <= breakpoints.MOBILE_MAX;
  const navigate = useNavigate();
  const {
    setViewMode,
    isNewConversation,
    setIsNewConversation,
    conversationType,
  } = useContext(ConversationViewContext);
  const { setNotExistsConversation } = useContext(GlobalMessageContext);
  const { activeConversationSid, setActiveConversationSid } = useContext(
    ActiveConversationContext,
  );

  const { conversations, networkStatus, count, totalCount, onFetchMore } =
    ConversationHooks.useConversationsList(conversationType);

  useEffect(() => {
    setNotExistsConversation(
      conversationType === ConversationType.GLOBAL_ALL && !totalCount,
    );
  }, [conversationType, setNotExistsConversation, totalCount]);

  useLayoutEffect(() => {
    if (
      !isNewConversation &&
      !activeConversationSid &&
      conversations.length > 0
    ) {
      const firstConversationItem = conversations[0];
      const cid =
        firstConversationItem.__typename === 'BasicConversationItem'
          ? firstConversationItem.conversation?.cid || ''
          : firstConversationItem.__typename === 'NoumGroupConversationItem'
          ? firstConversationItem.conversations?.[0]?.conversation?.cid || ''
          : '';
      setActiveConversationSid(cid);
    }
  }, [
    activeConversationSid,
    conversations,
    isNewConversation,
    setActiveConversationSid,
  ]);

  const handleClickItem = useCallback(
    (sid: string) => {
      setIsNewConversation(false);
      setViewMode(ViewMode.FULLCONVERSATION);
      navigate(`${routes.MESSAGES}/${sid}`);
    },
    [navigate, setIsNewConversation, setViewMode],
  );

  const showNewConversationItem =
    !activeConversationSid &&
    isNewConversation &&
    [0, 1].includes(selectedTabId);
  const paginating = networkStatus === NetworkStatus.fetchMore;
  const hasMore = count < totalCount;
  const infiniteStatus = paginating
    ? 'loading'
    : hasMore
    ? 'hasNextPage'
    : 'end';
  const loading = networkStatus === NetworkStatus.loading;

  if (
    (loading || networkStatus === NetworkStatus.setVariables) &&
    conversations.length === 0
  ) {
    return (
      <ListWrapper flex data-testid="chatlist-wrapper" justifyContent="center">
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      </ListWrapper>
    );
  }

  if (!totalCount) {
    if (showNewConversationItem) {
      return (
        <ListWrapper flex flexDirection="column" data-testid="list_wrapper">
          <NewChatItem size="L" />
        </ListWrapper>
      );
    }
    return selectedTabId === 2 ? (
      <StyledNoNoumConvoNote
        colorToken="--text-placeholder-neutral-default"
        font="body-m"
      >
        {t('noumena.global_messages.no_noum_conversation_note')}
      </StyledNoNoumConvoNote>
    ) : isMobile ? (
      <EmptyScreen onCreateNew={handleCreateNewConv} />
    ) : selectedTabId === 1 ? (
      <StyledNoNoumConvoNote
        colorToken="--text-placeholder-neutral-default"
        font="body-m"
      >
        {t('noumena.global_messages.no_direct_conversation_note')}
      </StyledNoNoumConvoNote>
    ) : null;
  }
  return (
    <ListWrapper flex flexDirection="column" data-testid="list_wrapper">
      <Infinite
        onFetchMore={onFetchMore}
        status={infiniteStatus}
        width="100%"
        isSpinnerRelative
      >
        {showNewConversationItem && <NewChatItem size="L" />}
        {conversations.map((conversationItem, index) =>
          conversationItem.__typename === 'ConversationOutput' ? (
            <ChatItem
              key={conversationItem._id}
              index={index}
              sid={conversationItem.cid!}
              size="L"
              isActive={conversationItem.cid === activeConversationSid}
              onClick={handleClickItem}
            />
          ) : conversationItem.__typename === 'BasicConversationItem' ? (
            <ChatItem
              key={conversationItem.conversation?._id}
              index={index}
              sid={conversationItem.conversation?.cid!}
              size="L"
              isActive={
                conversationItem.conversation?.cid === activeConversationSid
              }
              onClick={handleClickItem}
            />
          ) : (
            conversationItem.__typename === 'NoumGroupConversationItem' && (
              <ExpandableChatItem
                key={conversationItem.noum?._id}
                conversationItem={conversationItem}
                activeConversationSid={activeConversationSid}
                isNewConversation={isNewConversation}
                handleClickItem={handleClickItem}
              />
            )
          ),
        )}
      </Infinite>
    </ListWrapper>
  );
};
