import { formatMultipleUserNames } from '../utils';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type CommentProps } from './types';

const Comment = ({ users, ...basicProps }: CommentProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="Comment"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.comment.body"
        values={{
          usersList: formatMultipleUserNames(users),
        }}
      />
    }
  />
);

export default Comment;
