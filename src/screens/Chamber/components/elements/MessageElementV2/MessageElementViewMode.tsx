import { forwardRef, type Ref } from 'react';
import { ChatFooter } from './ChatFooter/ChatFooter';
import ChatHeader from './ChatHeader';
import ChatList from './ChatList';
import ConversationBody from './ConversationBody';
import ConversationHeader from './ConversationHeader';
import { type MessageElementProps } from './types';
import { ViewModeLayout } from './ViewModeLayout';

export const MessageElementViewMode = forwardRef(
  (props: MessageElementProps, ref: Ref<HTMLDivElement>) => {
    const { currentTitle } = props;

    return (
      <ViewModeLayout
        id={props.element._id || ''}
        ref={ref}
        ElementHeader={<ChatHeader currentTitle={currentTitle} />}
        ChatList={<ChatList />}
        ChatFooter={<ChatFooter />}
        ConversationHeader={<ConversationHeader />}
        ConversationBody={<ConversationBody />}
      />
    );
  },
);
