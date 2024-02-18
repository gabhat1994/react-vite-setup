import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { formatMultipleUserNames } from '../utils';
import { type SpaceConversationProps } from './types';

const SpaceConversation = ({
  noumName,
  users,
  ...basicProps
}: SpaceConversationProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.space_conversation.body"
        values={{
          usersList: formatMultipleUserNames(users),
          noumName,
        }}
      />
    }
  />
);

export default SpaceConversation;
