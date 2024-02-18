import { formatMultipleUserNames } from '../utils';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type PostMentionedProps } from './types';

const PostMentioned = ({ users, ...basicProps }: PostMentionedProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="PostMentioned"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.post_mentioned.body"
        values={{
          usersList: formatMultipleUserNames(users),
        }}
      />
    }
  />
);

export default PostMentioned;
