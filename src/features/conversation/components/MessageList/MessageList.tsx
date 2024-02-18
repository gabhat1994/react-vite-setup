import {
  type FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { orderBy, last, first } from 'lodash';
import { Infinite } from '@/components/Infinite';
import { Spinner } from '@/components/Spinner';
import { useAuth } from '@/features/auth/contexts';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import ConversationHooks from '@/features/conversation/hooks/globalMessages';
import { MessageItem, PendingMessageItem } from '../MessageItem';
import {
  getMessageDateCreated,
  getNextOrPrevMessage,
  getNextSameTypeMessage,
  isPendingMessage,
} from '../../helpers';
import { SpinnerContainer } from './styles';

export const MessageList: FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { activeConversationSid } = useContext(ActiveConversationContext);
  const { isGroupConversation } = ConversationHooks.useConversationDetails({
    sid: activeConversationSid,
  });
  const {
    messages,
    pendingMessages,
    isFetched,
    isLoading,
    status: messageStatus,
    hasPreviousPage,
    fetchPreviousMessages,
  } = ConversationHooks.useConversationMessages({
    sid: activeConversationSid,
  });
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  const infiniteStatus =
    messageStatus === 'loading'
      ? 'loading'
      : hasPreviousPage
      ? 'hasNextPage'
      : 'end';

  const mergedMessages = useMemo(
    () =>
      orderBy(
        [...messages, ...pendingMessages].filter(Boolean),
        (message) => getMessageDateCreated(message),
        'asc',
      ),
    [pendingMessages, messages],
  );

  const firstMessage = first(mergedMessages);
  const lastMessage = last(mergedMessages);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (
      scrollContainer &&
      hasPreviousPage &&
      scrollContainer.scrollHeight > prevScrollHeight
    ) {
      scrollContainer.scrollTop =
        scrollContainer.scrollHeight - prevScrollHeight;
      setPrevScrollHeight(scrollContainer.scrollHeight);
    }
  }, [firstMessage, hasPreviousPage, prevScrollHeight]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer)
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
  }, [activeConversationSid, isFetched]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer?.scrollTo)
      scrollContainer.scrollTo({
        behavior: 'smooth',
        top: scrollContainer.scrollHeight,
      });
  }, [lastMessage]);

  if (isLoading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  return (
    <Infinite
      ref={scrollContainerRef}
      onFetchMore={fetchPreviousMessages}
      status={infiniteStatus}
      paddingTop={infiniteStatus === 'hasNextPage' ? '30px' : '0px'}
      scrollbarWidth={0}
      reverse
      grow
    >
      {mergedMessages.map((message, i) =>
        isPendingMessage(message) ? (
          <PendingMessageItem
            key={message.attributes.id}
            message={message}
            prev={mergedMessages[i - 1]}
            next={mergedMessages[i + 1]}
            sameTypeNext={
              isGroupConversation
                ? mergedMessages[i + 1]
                : getNextSameTypeMessage(user?._id || '', mergedMessages, i)
            }
          />
        ) : (
          <MessageItem
            key={message.sid}
            message={message}
            prev={getNextOrPrevMessage(mergedMessages, i, 'prev')}
            next={getNextOrPrevMessage(mergedMessages, i, 'next')}
            sameTypeNext={getNextSameTypeMessage(
              user?._id || '',
              mergedMessages,
              i,
            )}
          />
        ),
      )}
    </Infinite>
  );
};
