import { UserStatus } from '@/apollo/generated/types';
import { ConversationStub } from '@/test-utils/conversation';
import { useTranslation } from 'react-i18next';
import { type ConversationOutputFragment } from '@/apollo/graphql/fragments';
import { type UserData } from '../../types';

export const EXAMPLE_CONVERSATION_ID = 'example-cid';

export function useExampleConversation() {
  const { t } = useTranslation();

  const exampleConversation: ConversationOutputFragment | undefined = {
    __typename: 'ConversationOutput',
    _id: 'example-id',
    cid: EXAMPLE_CONVERSATION_ID,
  };

  const exampleUser: UserData = {
    _id: 'example-user-id',
    placeholder: true,
    title: t('noumena.chat.example_conversation.connected_members'),
    userStatus: UserStatus.Active,
  };

  const exampleMessages = [
    new ConversationStub(exampleConversation.cid ?? '', 1).buildMessage(
      t('noumena.chat.example_message'),
      0,
    ),
  ];

  return {
    exampleConversation,
    exampleMessages,
    exampleUser,
  };
}
