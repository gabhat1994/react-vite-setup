import NotificationItem, { TranslatedBody } from '../../NotificationLayout';
import { type NoumArchivedProps } from './types';

const NoumArchived = ({ noumName, ...basicProps }: NoumArchivedProps) => (
  <NotificationItem
    {...basicProps}
    body={
      <TranslatedBody
        i18nKey="noumena.notification_type.noum_archived.body"
        values={{
          noumName,
        }}
      />
    }
  />
);

export default NoumArchived;
