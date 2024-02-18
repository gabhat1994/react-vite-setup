import { formatMultipleUserNames } from '../utils';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type CommentRepliedMentionedProps } from './types';

const CommentRepliedMentioned = ({
  users,
  ...basicProps
}: CommentRepliedMentionedProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="CommentRepliedMentioned"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.comment_replied_mentioned.body"
        values={{
          usersList: formatMultipleUserNames(users),
        }}
      />
    }
  />
);

export default CommentRepliedMentioned;
