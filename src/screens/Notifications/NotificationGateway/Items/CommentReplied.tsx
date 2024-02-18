import { formatMultipleUserNames } from '../utils';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type CommentRepliedProps } from './types';

const CommentReplied = ({ users, ...basicProps }: CommentRepliedProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="CommentReplied"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.comment_replied.body"
        values={{
          usersList: formatMultipleUserNames(users),
        }}
      />
    }
  />
);

export default CommentReplied;
