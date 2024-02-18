import { type FC } from 'react';

import { MessageItem } from '@/features/conversation/components/MessageItem';
import { useExampleConversation } from '@/features/conversation/hooks/noumMessages/useExampleConversation';
import { Infinite } from '@/components/Infinite';
import { MessageListWrapper, Wrapper } from './styles';

type ConversationBodyProps = {
  isNoumLayoutSmallViewMode?: boolean;
};

export const ConversationExampleBody: FC<ConversationBodyProps> = ({
  isNoumLayoutSmallViewMode,
}) => {
  const { exampleMessages } = useExampleConversation();

  return (
    <Wrapper
      data-testid="conversionbody-wrapper"
      isNoumLayoutSmallViewMode={isNoumLayoutSmallViewMode}
    >
      <MessageListWrapper>
        <Infinite
          scrollbarWidth={0}
          reverse
          grow
          style={{
            height: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <MessageItem message={exampleMessages[0]} />
        </Infinite>
      </MessageListWrapper>
    </Wrapper>
  );
};
