import { Infinite } from '@/components/Infinite';
import { Spinner } from '@/components/Spinner';
import ChatItem from '@/features/conversation/components/ChatItem';
import { ChatItemExample } from '@/features/conversation/components/ChatItem/ChatItemExample';
import { HomeOwnerChatItem } from '@/features/conversation/components/ChatItem/HomeOwnerChatItem';
import NewChatItem from '@/features/conversation/components/ChatItem/NewChatItem';
import { NoumLayoutViewMode } from '@/features/conversation/types';
import { DeviceTypeEnum, useDeviceType } from '@/hooks';
import { Stack } from '@/layout';
import { type FC } from 'react';
import { ConversationEmptyState } from '../ConversationEmptyState';
import { ChatListWrapper, SpinnerContainer } from './styles';
import { type ChatListProps } from './types';
import useChatList from './useChatList';

const ChatList: FC<ChatListProps> = () => {
  const deviceType = useDeviceType();
  const isMobile = Boolean(deviceType === DeviceTypeEnum.MOBILE);

  const {
    loading,
    cids,
    isNewConversation,
    isHomeUserConversation,
    showExampleConversation,
    activeConversationSid,
    noumLayoutViewMode,
    handleItemClick,
    showSlicedConversations,
    infiniteStatus,
    onFetchMore,
    cidsToRender,
    hasPrivateConversation,
  } = useChatList();

  if (loading && cids.length === 0) {
    return (
      <Stack justify="center" align="center" vertical grow>
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      </Stack>
    );
  }

  if (showExampleConversation) {
    return (
      <ChatItemExample
        noumLayoutViewMode={noumLayoutViewMode}
        isMobile={isMobile}
      />
    );
  }

  if (
    !isNewConversation &&
    cids.length === 0 &&
    noumLayoutViewMode !== NoumLayoutViewMode.NOUMLAYOUTCOMPACT &&
    !isHomeUserConversation
  ) {
    return <ConversationEmptyState />;
  }

  return (
    <ChatListWrapper data-testid="chatlist-wrapper">
      {showSlicedConversations ? (
        <Stack vertical fullWidth align="center" overflow="initial">
          {cidsToRender.map((cid, index) => (
            <ChatItem
              index={index}
              key={cid}
              sid={cid}
              isActive={cid === activeConversationSid && !isMobile}
              isMarginRight={index !== cidsToRender.length - 1}
              onClick={handleItemClick}
              size={isMobile ? 'L' : 'S'}
            />
          ))}
        </Stack>
      ) : (
        <Infinite
          onFetchMore={onFetchMore}
          status={infiniteStatus}
          width="100%"
          scrollbarWidth={0}
          isSpinnerRelative
        >
          {!activeConversationSid && isNewConversation && <NewChatItem />}
          {isHomeUserConversation && !hasPrivateConversation && (
            <HomeOwnerChatItem />
          )}
          {cidsToRender.map((cid, index) => (
            <ChatItem
              index={index}
              key={cid}
              sid={cid}
              isActive={cid === activeConversationSid && !isMobile}
              isMarginRight={index !== cidsToRender.length - 1}
              onClick={handleItemClick}
              size={isMobile ? 'L' : 'S'}
            />
          ))}
        </Infinite>
      )}
    </ChatListWrapper>
  );
};

export default ChatList;
