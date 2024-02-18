import { UserUtil } from '@/utils/user';
import { formatMultipleUserNames } from '../utils';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type CommentReplyThreadProps } from './types';

const CommentReplyThread = ({
  users,
  postAuthor,
  ...basicProps
}: CommentReplyThreadProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="CommentReplyThread"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.comment_reply_thread.body"
        values={{
          usersList: formatMultipleUserNames(users),
          postAuthor: UserUtil.renderFullName(postAuthor),
        }}
      />
    }
  />
);

export default CommentReplyThread;
