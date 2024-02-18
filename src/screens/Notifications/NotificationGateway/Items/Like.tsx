import { formatMultipleUserNames } from '../utils';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type LikeProps } from './types';

const Like = ({ users, ...basicProps }: LikeProps) => (
  <NotificationItem
    {...basicProps}
    data-testid="Like"
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.like.body"
        values={{
          usersList: formatMultipleUserNames(users),
        }}
      />
    }
  />
);

export default Like;
