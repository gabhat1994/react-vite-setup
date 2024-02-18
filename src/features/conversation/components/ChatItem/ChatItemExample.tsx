import { useContext, useEffect } from 'react';
import { ActiveConversationContext } from '../../contexts/ActiveConversationContext';
import { useExampleConversation } from '../../hooks/noumMessages/useExampleConversation';
import { type NoumLayoutViewMode } from '../../types';
import { ChatItemView } from './ChatItemView';

interface ChatItemExampleProps {
  isMobile: boolean;
  noumLayoutViewMode?: NoumLayoutViewMode;
}

export const ChatItemExample = ({
  isMobile,
  noumLayoutViewMode,
}: ChatItemExampleProps) => {
  const { exampleConversation, exampleMessages } = useExampleConversation();

  const { setActiveConversationSid } = useContext(ActiveConversationContext);

  useEffect(() => {
    if (exampleConversation?.cid) {
      setActiveConversationSid(exampleConversation.cid);
    }
  }, [exampleConversation, exampleConversation.cid, setActiveConversationSid]);

  return (
    <ChatItemView
      index={0}
      sid={exampleConversation.cid ?? ''}
      isActive={true}
      isMarginRight={false}
      onClick={() => {}}
      size={isMobile ? 'L' : 'S'}
      author="author"
      lastMessage={exampleMessages[0]}
      messages={exampleMessages}
      title="General"
      unread={0}
      users={[{ _id: 'example-user-id', placeholder: false }]}
      noumLayoutViewMode={noumLayoutViewMode}
    />
  );
};
