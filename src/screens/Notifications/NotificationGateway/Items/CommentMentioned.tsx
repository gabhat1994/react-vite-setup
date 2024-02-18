import { formatMultipleUserNames } from '../utils';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type CommentMentionedProps } from './types';

const CommentMentioned = ({ users, ...basicProps }: CommentMentionedProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="CommentMentioned"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.comment_mentioned.body"
        values={{
          usersList: formatMultipleUserNames(users),
        }}
      />
    }
  />
);

export default CommentMentioned;
