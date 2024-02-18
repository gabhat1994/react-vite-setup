import { useCallback, useContext, useLayoutEffect } from 'react';
import { useParams } from 'react-router';
import { breakpoints } from '@/constants/devices';
import { useWindowDimensions } from '@/hooks';
import { ConversationViewContext } from '@/features/conversation/contexts/ConversationViewContext';
import { ActiveConversationContext } from '@/features/conversation/contexts/ActiveConversationContext';
import EmptyScreen from '../EmptyScreen/EmptyScreen';
import GlobalConversationHeader from './GlobalConversationHeader';
import GlobalConversationBody from './GlobalConversationBody';

type RouteParams = {
  id: string;
};

const MessageContent = () => {
  const { width } = useWindowDimensions();
  const isMobile = width <= breakpoints.MOBILE_MAX;
  const { id } = useParams<RouteParams>();
  const { isNewConversation, setIsNewConversation } = useContext(
    ConversationViewContext,
  );
  const { activeConversationSid, setActiveConversationSid } = useContext(
    ActiveConversationContext,
  );

  const handleCreateNewConv = useCallback(() => {
    setIsNewConversation(true);
    setActiveConversationSid('');
  }, [setActiveConversationSid, setIsNewConversation]);

  useLayoutEffect(() => {
    if (id) {
      setActiveConversationSid(id);
    }
  }, [id, setActiveConversationSid]);

  if (!isMobile && !isNewConversation && !activeConversationSid)
    return <EmptyScreen onCreateNew={handleCreateNewConv} />;
  return (
    <>
      <GlobalConversationHeader />
      <GlobalConversationBody />
    </>
  );
};
export default MessageContent;
