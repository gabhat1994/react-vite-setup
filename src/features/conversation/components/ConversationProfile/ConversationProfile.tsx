import ConversationHooks from '@/features/conversation/hooks/globalMessages';
import { useContext, type FC } from 'react';
import { ActiveConversationContext } from '../../contexts/ActiveConversationContext';
import { ConversationProfileView } from './ConversationProfileView';

export const ConversationProfile: FC = () => {
  const { activeConversationSid: sid } = useContext(ActiveConversationContext);
  const { title, users, isConversationBlocked } =
    ConversationHooks.useConversationDetails({
      sid,
    });

  return (
    <ConversationProfileView
      isConversationBlocked={isConversationBlocked}
      users={users}
      title={title}
    />
  );
};
