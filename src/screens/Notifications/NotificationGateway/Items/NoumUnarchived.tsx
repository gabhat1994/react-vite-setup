import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type NoumUnarchivedProps } from './types';

const NoumUnarchived = ({ noumName, ...basicProps }: NoumUnarchivedProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.noum_unarchived.body"
        values={{
          noumName,
        }}
      />
    }
  />
);

export default NoumUnarchived;
