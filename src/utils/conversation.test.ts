import { mockedConversation } from '@/features/conversation/mocks';
import { type NoumConversation } from '@/features/conversation/types';
import { sendMessage, setAllMessagesRead } from '@/utils/conversation';

describe('conversation', () => {
  const twilioConversation = mockedConversation();
  const conversationData = {};
  const conversation: NoumConversation = {
    twilioConversation,
    conversationData,
  };

  test('sendMessage', () => {
    sendMessage(conversation, 'message');
    expect(twilioConversation.sendMessage).toBeCalled();
  });

  test('setAllMessagesRead', () => {
    setAllMessagesRead(conversation);
    expect(twilioConversation.setAllMessagesRead).toBeCalled();
  });
});
