import { TranslatedBody } from '../../NotificationLayout';
import AdminMessage from './AdminMessage';
import { type PostRejectedProps } from './types';

const PostRejected = ({ users, ...basicProps }: PostRejectedProps) => (
  <AdminMessage
    {...basicProps}
    data-testid="PostRejected"
    body={
      <TranslatedBody i18nKey="noumena.notification_type.post_rejected.body" />
    }
  />
);

export default PostRejected;
