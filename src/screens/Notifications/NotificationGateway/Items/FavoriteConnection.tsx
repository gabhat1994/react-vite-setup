import { UserUtil } from '@/utils/user';
import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type FavoriteConnectionProps } from './types';

const favoriteConnection = ({
  noumName,
  noumOwner,
  ...basicProps
}: FavoriteConnectionProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.favorite_connection.body"
        values={{
          noumOwner: UserUtil.renderFullName(noumOwner),
          noumName,
        }}
      />
    }
  />
);

export default favoriteConnection;
